'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { CATEGORIES } from '@/lib/thaikeizai/categories';

interface Props {
  date: string;
  email: string | null;
  hasSubscription: boolean;
  freeRemaining: number;
}

export default function TkHeader({ date, email, hasSubscription, freeRemaining }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await fetch('/api/thaikeizai/session', { method: 'DELETE' });
    setBusy(false);
    router.push('/thaikeizai');
    router.refresh();
  }

  return (
    <header className="bg-white">
      {/* 上部ユーティリティバー */}
      <div className="bg-tk-navy text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-[11px]">
          <span className="text-white/70">{date}</span>
          <div className="flex items-center gap-3">
            {hasSubscription ? (
              <span className="text-tk-gold-light">● 購読中</span>
            ) : (
              <span className="text-white/60">無料枠 残り{freeRemaining}本</span>
            )}
            <span className="text-white/25">|</span>
            {email ? (
              <>
                <Link href="/thaikeizai/account" className="hover:text-tk-gold-light">マイページ</Link>
                <button onClick={logout} disabled={busy} className="text-white/55 hover:text-white disabled:opacity-50">
                  ログアウト
                </button>
              </>
            ) : (
              <Link href="/thaikeizai/login" className="hover:text-tk-gold-light">ログイン / 会員登録</Link>
            )}
          </div>
        </div>
      </div>

      {/* ブランド行 */}
      <div className="border-b border-tk-navy/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/thaikeizai" className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-tk-navy">週刊タイ経済</span>
            <span className="hidden text-[11px] text-tk-mute sm:inline">日刊ニュース ｜ since 1997</span>
            <span className="rounded bg-tk-gold px-1.5 py-0.5 text-[10px] font-bold text-tk-navy">DEMO</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden items-center rounded border border-tk-navy/20 px-2 py-1 text-tk-mute md:flex">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.3-4.3m1.3-5.2a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
              </svg>
              <input
                placeholder="記事を検索"
                className="ml-1.5 w-32 bg-transparent text-sm outline-none placeholder:text-tk-mute/70"
              />
            </div>
            <Link
              href="/thaikeizai/pricing"
              className="rounded bg-tk-gold px-4 py-1.5 text-sm font-semibold text-tk-navy transition-colors hover:bg-tk-gold-light"
            >
              ご購読
            </Link>
          </div>
        </div>
      </div>

      {/* カテゴリーナビ（スティッキー） */}
      <nav className="sticky top-0 z-40 bg-tk-navy text-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-2 text-sm">
          <NavLink href="/thaikeizai" label="トップ" active={pathname === '/thaikeizai'} />
          {CATEGORIES.map((c) => (
            <NavLink
              key={c.slug}
              href={`/thaikeizai/category/${c.slug}`}
              label={c.label}
              active={pathname === `/thaikeizai/category/${c.slug}`}
            />
          ))}
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`whitespace-nowrap border-b-2 px-3 py-2.5 transition-colors ${
        active
          ? 'border-tk-gold text-tk-gold-light'
          : 'border-transparent text-white/85 hover:text-tk-gold-light'
      }`}
    >
      {label}
    </Link>
  );
}
