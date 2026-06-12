import { PLANS, FREE_LIMIT, type Plan } from '@/lib/thaikeizai/plans';
import { readSession } from '@/lib/thaikeizai/session';
import SubscribeButton from '../_components/SubscribeButton';

export default function PricingPage() {
  const s = readSession();
  const core = PLANS.filter((p) => p.group === 'core');
  const upper = PLANS.filter((p) => p.group === 'upper');

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="text-center">
        <p className="text-xs font-semibold tracking-[0.25em] text-tk-gold">PRICING</p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-tk-navy">料金プラン</h1>
        <p className="mt-3 text-tk-ink/70">
          月{FREE_LIMIT}本まで無料。続きを読むにはご購読ください。年払いは約2ヶ月分お得です。
        </p>
        {s.hasSubscription && (
          <p className="mx-auto mt-4 inline-block rounded-full bg-tk-gold/15 px-4 py-1 text-sm font-semibold text-tk-navy">
            現在ご購読中です（プラン変更もこちらから）
          </p>
        )}
      </div>

      {/* コア3プラン */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {core.map((p) => (
          <CoreCard key={p.id} plan={p} />
        ))}
      </div>

      {/* 上位・法人 */}
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {upper.map((p) => (
          <UpperCard key={p.id} plan={p} />
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-tk-mute">
        ※ 価格はデモ用の提案値（バーツ／月）です。既存購読者は当面、現行価格で据え置かれます。
      </p>
    </div>
  );
}

function CoreCard({ plan }: { plan: Plan }) {
  const hi = !!plan.recommended;
  return (
    <div
      className={`relative flex flex-col rounded-xl border p-6 shadow-sm ${
        hi ? 'border-tk-gold bg-tk-navy text-white shadow-lg' : 'border-tk-navy/12 bg-white'
      }`}
    >
      {plan.badge && (
        <span
          className={`absolute right-5 top-5 rounded-full px-3 py-0.5 text-[11px] font-bold ${
            hi ? 'bg-tk-gold text-tk-navy' : 'bg-tk-ice text-tk-mute'
          }`}
        >
          {plan.badge}
        </span>
      )}
      <h3 className={`font-serif text-lg font-bold ${hi ? 'text-white' : 'text-tk-navy'}`}>{plan.name}</h3>
      <div className="mt-3 flex items-baseline gap-1">
        <span className={`font-serif text-4xl font-bold ${hi ? 'text-tk-gold-light' : 'text-tk-navy'}`}>
          {plan.price.toLocaleString()}
        </span>
        <span className={`text-sm ${hi ? 'text-white/70' : 'text-tk-mute'}`}>バーツ / 月</span>
      </div>
      <p className={`mt-2 text-sm ${hi ? 'text-white/75' : 'text-tk-ink/70'}`}>{plan.tagline}</p>

      <ul className={`mt-5 flex-1 space-y-2 text-sm ${hi ? 'text-white/85' : 'text-tk-ink/80'}`}>
        {plan.features.map((f, i) => (
          <li key={i} className="flex gap-2">
            <span className={hi ? 'text-tk-gold-light' : 'text-tk-gold'}>✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <SubscribeButton plan={plan.id} recommended={hi} />
      </div>
    </div>
  );
}

function UpperCard({ plan }: { plan: Plan }) {
  return (
    <div className="flex flex-col rounded-xl border border-tk-navy/12 bg-tk-ice/50 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-tk-navy">{plan.name}</h3>
        {plan.archive && (
          <span className="rounded bg-tk-gold/20 px-2 py-0.5 text-[10px] font-semibold text-tk-navy">アーカイブ</span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-serif text-2xl font-bold text-tk-navy">{plan.priceLabel ?? plan.price.toLocaleString()}</span>
        <span className="text-xs text-tk-mute">バーツ / 月</span>
      </div>
      <ul className="mt-3 flex-1 space-y-1.5 text-xs text-tk-ink/75">
        {plan.features.map((f, i) => (
          <li key={i} className="flex gap-1.5">
            <span className="text-tk-gold">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <SubscribeButton plan={plan.id} label="申し込む" />
      </div>
    </div>
  );
}
