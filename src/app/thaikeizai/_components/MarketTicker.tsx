import { MARKET } from '@/lib/thaikeizai/market';

export default function MarketTicker() {
  return (
    <div className="border-b border-tk-navy/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-5 overflow-x-auto px-4 py-2 text-xs">
        <span className="whitespace-nowrap font-semibold text-tk-mute">マーケット</span>
        {MARKET.map((m) => {
          const color = m.dir === 'up' ? 'text-red-600' : m.dir === 'down' ? 'text-blue-600' : 'text-tk-mute';
          const arrow = m.dir === 'up' ? '▲' : m.dir === 'down' ? '▼' : '＝';
          return (
            <span key={m.name} className="flex items-baseline gap-1.5 whitespace-nowrap">
              <span className="text-tk-ink/70">{m.name}</span>
              <span className="font-semibold text-tk-navy">{m.value}</span>
              <span className={`${color} font-medium`}>
                {arrow} {m.change}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
