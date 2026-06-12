'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    const res = await fetch('/api/thaikeizai/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setBusy(false);
    if (res.ok) {
      router.push('/thaikeizai/account');
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setErr(d.error || 'ログインに失敗しました');
    }
  }

  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <h1 className="text-center font-serif text-2xl font-bold text-tk-navy">ログイン / 新規登録</h1>
      <p className="mt-2 text-center text-sm text-tk-ink/70">
        メールアドレスでかんたんにご利用いただけます（デモ）。
      </p>

      <form onSubmit={submit} className="mt-8 rounded-xl border border-tk-navy/12 bg-white p-6 shadow-sm">
        <label className="block text-sm font-semibold text-tk-navy">メールアドレス</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-2 w-full rounded-md border border-tk-navy/20 px-3 py-2.5 text-sm outline-none focus:border-tk-gold focus:ring-1 focus:ring-tk-gold"
        />
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-4 w-full rounded-md bg-tk-navy py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tk-navy-2 disabled:opacity-60"
        >
          {busy ? '処理中…' : 'ログイン / 登録'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-tk-ink/70">
        まだ購読していませんか？{' '}
        <Link href="/thaikeizai/pricing" className="font-semibold text-tk-navy underline">
          プランを見る
        </Link>
      </p>
    </div>
  );
}
