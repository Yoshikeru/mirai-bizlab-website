import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: Replace with real delivery (email service, Slack webhook, CRM ingest).
    // Use environment variables: CONTACT_NOTIFY_EMAIL / CONTACT_SLACK_WEBHOOK etc.
    console.log("[contact] payload:", JSON.stringify(body, null, 2));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
