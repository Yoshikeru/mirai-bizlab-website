import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

import { getSystemPrompt } from "@/lib/chat/knowledge";
import { clientKey, isAllowedOrigin, rateLimited } from "@/lib/api/security";
import { routing, type Locale } from "@/lib/i18n/routing";

export const runtime = "nodejs";
// Keep streaming responses well within Vercel's serverless limits.
export const maxDuration = 30;

const MODEL = process.env.CHAT_MODEL ?? "claude-haiku-4-5";

// Conversation limits (defence against abuse / runaway token cost).
const MAX_MESSAGES = 16; // most recent turns kept
const MAX_CHARS_PER_MESSAGE = 2000;
const MAX_TOTAL_CHARS = 12000;
const MAX_OUTPUT_TOKENS = 700;

// Best-effort per-IP rate limit (see lib/api/security).
const RATE = { windowMs: 60_000, max: 15 };

type IncomingMessage = { role: "user" | "assistant"; content: unknown };

type ChatRequestBody = {
  messages?: IncomingMessage[];
  locale?: string;
};

/** Localised graceful fallback used when the AI key is missing or errors. */
function fallbackText(locale: Locale): string {
  switch (locale) {
    case "en":
      return "Sorry — the assistant is unavailable right now. Please reach us via the contact form, LINE (@miraibizlab), email (contact@miraibizlab.co.th) or phone (+66 2 088 8539) and we'll be glad to help.";
    case "th":
      return "ขออภัย ระบบผู้ช่วยไม่พร้อมใช้งานในขณะนี้ กรุณาติดต่อเราผ่านแบบฟอร์มติดต่อ, LINE (@miraibizlab), อีเมล (contact@miraibizlab.co.th) หรือโทร 02-088-8539 ยินดีให้บริการครับ";
    default:
      return "申し訳ありません。ただいまアシスタントをご利用いただけません。お問い合わせフォーム、LINE（@miraibizlab）、メール（contact@miraibizlab.co.th）、またはお電話（02-088-8539）よりお気軽にご連絡ください。";
  }
}

function plainTextResponse(text: string, status = 200): Response {
  return new Response(text, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

export async function POST(request: Request) {
  // Reject requests that don't originate from our own site.
  if (!isAllowedOrigin(request)) {
    return plainTextResponse("Forbidden", 403);
  }

  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return plainTextResponse("Invalid JSON", 400);
  }

  const locale: Locale = routing.locales.includes(body.locale as Locale)
    ? (body.locale as Locale)
    : routing.defaultLocale;

  // Validate / normalise messages.
  const raw = Array.isArray(body.messages) ? body.messages : [];
  const messages = raw
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_CHARS_PER_MESSAGE),
    }));

  if (messages.length === 0 || messages[messages.length - 1]!.role !== "user") {
    return plainTextResponse("No user message", 400);
  }

  const totalChars = messages.reduce((sum, m) => sum + m.content.length, 0);
  if (totalChars > MAX_TOTAL_CHARS) {
    return plainTextResponse(fallbackText(locale), 200);
  }

  if (rateLimited("chat", clientKey(request), RATE)) {
    const msg =
      locale === "en"
        ? "You're sending messages a little too fast. Please wait a moment and try again."
        : locale === "th"
          ? "คุณส่งข้อความเร็วเกินไป กรุณารอสักครู่แล้วลองใหม่อีกครั้ง"
          : "メッセージの送信が速すぎます。少し時間をおいて再度お試しください。";
    return plainTextResponse(msg, 429);
  }

  // No key configured (e.g. preview without secrets) → graceful fallback.
  if (!process.env.ANTHROPIC_API_KEY) {
    return plainTextResponse(fallbackText(locale), 200);
  }

  try {
    const result = streamText({
      model: anthropic(MODEL),
      system: getSystemPrompt(locale),
      messages,
      temperature: 0.3,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      abortSignal: request.signal,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[chat] streamText error:", error);
    return plainTextResponse(fallbackText(locale), 200);
  }
}
