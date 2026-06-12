import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_MEMBER, COOKIE_PLAN } from '@/lib/thaikeizai/session';
import { getPlan } from '@/lib/thaikeizai/plans';

const MONTH = 60 * 60 * 24 * 30;

// 購読（デモ：実決済の代わりにプランをcookieに記録する疑似チェックアウト）
export async function POST(req: Request) {
  const { plan } = await req.json().catch(() => ({ plan: '' }));
  const p = getPlan(plan);
  if (!p) {
    return NextResponse.json({ error: 'プランが不正です' }, { status: 400 });
  }
  const res = NextResponse.json({ ok: true, plan: p.id, name: p.name });
  res.cookies.set(COOKIE_PLAN, p.id, { httpOnly: true, path: '/', sameSite: 'lax', maxAge: MONTH });
  // 未ログインの場合はデモ用の仮アカウントを発行
  const c = cookies();
  if (!c.get(COOKIE_MEMBER)?.value) {
    res.cookies.set(COOKIE_MEMBER, 'demo@thaikeizai.com', {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: MONTH,
    });
  }
  return res;
}
