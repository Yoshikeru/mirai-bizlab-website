import { NextResponse } from "next/server";
import { Resend } from "resend";

import { clientKey, isAllowedOrigin, rateLimited } from "@/lib/api/security";

export const runtime = "nodejs";

// Best-effort per-IP rate limit: a genuine visitor submits once, so a low cap
// is plenty and blunts spam / Resend cost abuse.
const RATE = { windowMs: 60_000, max: 5 };

// Field length caps to reject oversized / abusive payloads.
const LIMITS = {
  name: 100,
  company: 200,
  email: 200,
  phone: 50,
  message: 5000,
  categories: 12,
  categoryItem: 60,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  categories: string[];
  message: string;
};

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL =
  process.env.CONTACT_NOTIFY_EMAIL ?? "yoshida@miraibizlab.co.th";
// Resend requires a verified sender domain. Until miraibizlab.co.th is verified
// inside Resend, fall back to Resend's sandbox sender. Override with
// CONTACT_FROM_EMAIL once the domain is verified.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "MIRAI BizLab <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHtml(p: ContactPayload): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 14px 6px 0; color:#6B6B6B; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; vertical-align:top; white-space:nowrap;">${escapeHtml(label)}</td>
      <td style="padding:6px 0; color:#1A1A1A; font-size:14px; line-height:1.7; vertical-align:top;">${value}</td>
    </tr>`;

  return `
<!doctype html>
<html><body style="margin:0; padding:24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; background:#FAFAFA;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px; margin:0 auto; background:#ffffff; border:1px solid #E5E5E5; border-radius:14px; overflow:hidden;">
    <tr>
      <td style="padding:24px 28px; border-bottom:1px solid #E5E5E5; background:#1A1A1A; color:#ffffff;">
        <div style="font-size:11px; letter-spacing:0.32em; color:#D7000F; text-transform:uppercase;">MIRAI BizLab</div>
        <div style="margin-top:8px; font-size:18px; font-weight:700;">新しいお問い合わせが届きました</div>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 28px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          ${row("お名前", escapeHtml(p.name))}
          ${row("会社名", escapeHtml(p.company))}
          ${row("メール", `<a href="mailto:${escapeHtml(p.email)}" style="color:#D7000F; text-decoration:none;">${escapeHtml(p.email)}</a>`)}
          ${row("電話", p.phone ? escapeHtml(p.phone) : "<span style='color:#9A9A9A;'>(未入力)</span>")}
          ${row("カテゴリ", escapeHtml(p.categories.join(" / ")))}
          ${row("ご相談内容", `<div style="white-space:pre-wrap;">${escapeHtml(p.message)}</div>`)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 28px 24px; border-top:1px solid #E5E5E5; color:#9A9A9A; font-size:11px;">
        送信元: miraibizlab.co.th / お問い合わせフォーム<br/>
        このメールは自動送信です。お客様への返信は <a href="mailto:${escapeHtml(p.email)}" style="color:#D7000F;">${escapeHtml(p.email)}</a> までお願いします。
      </td>
    </tr>
  </table>
</body></html>`;
}

function renderText(p: ContactPayload): string {
  return [
    "新しいお問い合わせ — MIRAI BizLab",
    "",
    `お名前: ${p.name}`,
    `会社名: ${p.company}`,
    `メール: ${p.email}`,
    `電話: ${p.phone || "(未入力)"}`,
    `カテゴリ: ${p.categories.join(" / ")}`,
    "",
    "ご相談内容:",
    p.message,
    "",
    `※ お客様への返信は ${p.email} までお願いします。`,
  ].join("\n");
}

export async function POST(request: Request) {
  // Reject requests that don't originate from our own site.
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  // Throttle abusive bursts (spam / Resend cost).
  if (rateLimited("contact", clientKey(request), RATE)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const input = (raw ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const body: ContactPayload = {
    name: str(input.name),
    company: str(input.company),
    email: str(input.email),
    phone: str(input.phone),
    categories: Array.isArray(input.categories)
      ? input.categories
          .filter((c): c is string => typeof c === "string")
          .slice(0, LIMITS.categories)
          .map((c) => c.trim().slice(0, LIMITS.categoryItem))
      : [],
    message: str(input.message),
  };

  // Required fields.
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 },
    );
  }

  // Email format.
  if (!EMAIL_RE.test(body.email) || body.email.length > LIMITS.email) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 },
    );
  }

  // Length caps (reject oversized payloads rather than silently truncating).
  if (
    body.name.length > LIMITS.name ||
    body.company.length > LIMITS.company ||
    (body.phone?.length ?? 0) > LIMITS.phone ||
    body.message.length > LIMITS.message
  ) {
    return NextResponse.json(
      { ok: false, error: "Input too long" },
      { status: 400 },
    );
  }

  // If Resend API key is not configured, fall back to logging.
  if (!RESEND_API_KEY) {
    console.log("[contact] (no RESEND_API_KEY, logging only):", body);
    return NextResponse.json({ ok: true, delivery: "log-only" });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFY_EMAIL],
      replyTo: body.email,
      subject: `[MIRAI BizLab] お問い合わせ from ${body.name}${body.company ? ` (${body.company})` : ""}`,
      html: renderHtml(body),
      text: renderText(body),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Email delivery failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivery: "email" });
  } catch (error) {
    console.error("[contact] unexpected error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 },
    );
  }
}
