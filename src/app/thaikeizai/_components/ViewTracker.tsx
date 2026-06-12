'use client';

import { useEffect, useRef } from 'react';

// 無料枠の消費を記録する。ヘッダーの残数表示は次のナビゲーションで更新される。
export default function ViewTracker({ slug }: { slug: string }) {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    fetch('/api/thaikeizai/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    }).catch(() => {});
  }, [slug]);
  return null;
}
