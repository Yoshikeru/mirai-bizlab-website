import type { Metadata } from 'next';
import { readSession } from '@/lib/thaikeizai/session';
import TkHeader from './_components/TkHeader';
import TkFooter from './_components/TkFooter';
import MarketTicker from './_components/MarketTicker';

export const metadata: Metadata = {
  title: '週刊タイ経済（デジタル化デモ）',
  description: 'タイ経済の最新情報をお届けする邦字経済紙のデジタル版プロトタイプ',
};

function todayLabel(): string {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(now);
  return parts;
}

export default function TkLayout({ children }: { children: React.ReactNode }) {
  const s = readSession();
  return (
    <div className="min-h-screen bg-white font-sans text-tk-ink">
      <TkHeader date={todayLabel()} email={s.email} hasSubscription={s.hasSubscription} freeRemaining={s.freeRemaining} />
      <MarketTicker />
      {children}
      <TkFooter />
    </div>
  );
}
