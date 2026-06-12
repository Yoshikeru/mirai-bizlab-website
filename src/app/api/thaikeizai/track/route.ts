import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_VIEWS } from '@/lib/thaikeizai/session';
import { FREE_LIMIT } from '@/lib/thaikeizai/plans';

const MONTH = 60 * 60 * 24 * 30;

// 記事閲覧をメーターに記録（無料枠の消費）。同じ記事の再訪はカウントしない。
export async function POST(req: Request) {
  const { slug } = await req.json().catch(() => ({ slug: '' }));
  if (!slug) {
    return NextResponse.json({ error: 'slug required' }, { status: 400 });
  }
  const c = cookies();
  let viewed: string[] = [];
  try {
    viewed = JSON.parse(c.get(COOKIE_VIEWS)?.value || '[]');
    if (!Array.isArray(viewed)) viewed = [];
  } catch {
    viewed = [];
  }
  if (!viewed.includes(slug)) viewed.push(slug);
  const res = NextResponse.json({ ok: true, remaining: Math.max(0, FREE_LIMIT - viewed.length) });
  res.cookies.set(COOKIE_VIEWS, JSON.stringify(viewed), {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: MONTH,
  });
  return res;
}
