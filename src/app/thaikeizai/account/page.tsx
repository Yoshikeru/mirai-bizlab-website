import Link from 'next/link';
import { readSession } from '@/lib/thaikeizai/session';
import { getPlan, FREE_LIMIT } from '@/lib/thaikeizai/plans';
import PdfButton from '../_components/PdfButton';

export default function AccountPage({ searchParams }: { searchParams: { welcome?: string } }) {
  const s = readSession();

  if (!s.isMember) {
    return (
      <div className="mx-auto max-w-md px-5 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-tk-navy">マイページ</h1>
        <p className="mt-3 text-tk-ink/70">ご利用にはログインが必要です。</p>
        <Link
          href="/thaikeizai/login"
          className="mt-6 inline-block rounded-md bg-tk-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-tk-navy-2"
        >
          ログイン / 登録
        </Link>
      </div>
    );
  }

  const plan = getPlan(s.planId);

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      {searchParams.welcome && (
        <div className="mb-6 rounded-lg border border-tk-gold/40 bg-tk-gold/10 px-5 py-4 text-sm text-tk-navy">
          🎉 ご購読ありがとうございます！本日からすべての記事が読み放題です。
        </div>
      )}

      <h1 className="font-serif text-2xl font-bold text-tk-navy">マイページ</h1>
      <p className="mt-1 text-sm text-tk-mute">{s.email}</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {/* 契約状況 */}
        <div className="rounded-xl border border-tk-navy/12 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-tk-mute">ご契約プラン</p>
          {plan ? (
            <>
              <p className="mt-2 font-serif text-xl font-bold text-tk-navy">{plan.name}</p>
              <p className="mt-1 text-sm text-tk-ink/70">
                {(plan.priceLabel ?? plan.price.toLocaleString())} バーツ / 月
              </p>
              <span className="mt-3 inline-block rounded-full bg-tk-gold/15 px-3 py-1 text-xs font-semibold text-tk-navy">
                ● 読み放題でご利用中
              </span>
            </>
          ) : (
            <>
              <p className="mt-2 font-serif text-xl font-bold text-tk-navy">無料会員</p>
              <p className="mt-1 text-sm text-tk-ink/70">無料枠 残り{s.freeRemaining} / {FREE_LIMIT}本</p>
              <Link
                href="/thaikeizai/pricing"
                className="mt-3 inline-block rounded-md bg-tk-gold px-4 py-2 text-sm font-semibold text-tk-navy hover:bg-tk-gold-light"
              >
                プランに申し込む
              </Link>
            </>
          )}
        </div>

        {/* 配信 */}
        <div className="rounded-xl border border-tk-navy/12 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-tk-mute">日刊ニュースレター</p>
          {plan?.unlocksContent ? (
            <>
              <p className="mt-2 text-sm text-tk-ink/80">毎朝のPDFを配信中です。</p>
              <div className="mt-4">
                <PdfButton />
              </div>
              {plan.archive && (
                <p className="mt-4 text-xs text-tk-mute">＋ 28年アーカイブの全文検索がご利用いただけます。</p>
              )}
            </>
          ) : (
            <p className="mt-2 text-sm text-tk-ink/70">
              ご購読いただくと、毎朝のPDFが自動配信されます。
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <Link href="/thaikeizai/pricing" className="font-semibold text-tk-navy underline">
          プランを変更する
        </Link>
        <Link href="/thaikeizai" className="text-tk-mute hover:text-tk-navy">
          記事一覧へ
        </Link>
      </div>
    </div>
  );
}
