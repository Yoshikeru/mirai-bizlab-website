import { NextResponse } from 'next/server';
import { COOKIE_MEMBER, COOKIE_PLAN, COOKIE_VIEWS } from '@/lib/thaikeizai/session';

const MONTH = 60 * 60 * 24 * 30;

// ログイン（デモ：メールアドレスのみで会員登録扱い）
export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({ email: '' }));
  const addr = String(email || '').trim();
  if (!addr || !addr.includes('@')) {
    return NextResponse.json({ error: '有効なメールアドレスを入力してください' }, { status: 400 });
  }
  const res = NextResponse.json({ ok: true, email: addr });
  res.cookies.set(COOKIE_MEMBER, addr, { httpOnly: true, path: '/', sameSite: 'lax', maxAge: MONTH });
  return res;
}

// ログアウト
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  for (const name of [COOKIE_MEMBER, COOKIE_PLAN, COOKIE_VIEWS]) {
    res.cookies.set(name, '', { path: '/', maxAge: 0 });
  }
  return res;
}
