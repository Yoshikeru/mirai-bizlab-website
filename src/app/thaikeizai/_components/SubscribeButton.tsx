'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  plan: string;
  recommended?: boolean;
  label?: string;
}

export default function SubscribeButton({ plan, recommended, label }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function subscribe() {
    setBusy(true);
    const res = await fetch('/api/thaikeizai/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    });
    setBusy(false);
    if (res.ok) {
      router.push('/thaikeizai/account?welcome=1');
      router.refresh();
    }
  }

  return (
    <button
      onClick={subscribe}
      disabled={busy}
      className={`w-full rounded-md py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 ${
        recommended
          ? 'bg-tk-gold text-tk-navy hover:bg-tk-gold-light'
          : 'border border-tk-navy/25 text-tk-navy hover:bg-tk-navy hover:text-white'
      }`}
    >
      {busy ? '処理中…' : label || 'このプランで申し込む'}
    </button>
  );
}
