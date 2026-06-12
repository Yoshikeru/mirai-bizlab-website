import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticle, relatedMeta } from '@/lib/thaikeizai/articles';
import { chipClass, catByLabel } from '@/lib/thaikeizai/categories';
import { readSession, decideAccess } from '@/lib/thaikeizai/session';
import { FREE_LIMIT } from '@/lib/thaikeizai/plans';
import ViewTracker from '../../_components/ViewTracker';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const s = readSession();
  const access = decideAccess(article.slug, !!article.archiveOnly, s);
  const consumesQuota = access.allowed && !s.hasSubscription && !article.archiveOnly;
  const related = relatedMeta(article.slug);
  const cat = catByLabel(article.category);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* パンくず */}
      <nav className="text-xs text-tk-mute">
        <Link href="/thaikeizai" className="hover:text-tk-navy">トップ</Link>
        <span className="mx-1.5">›</span>
        {cat ? (
          <Link href={`/thaikeizai/category/${cat.slug}`} className="hover:text-tk-navy">{article.category}</Link>
        ) : (
          <span>{article.category}</span>
        )}
      </nav>

      <div className="mt-4 flex items-center gap-3 text-xs">
        <span className={`rounded px-2 py-0.5 font-semibold ${chipClass(article.category)}`}>{article.category}</span>
        <span className="text-tk-mute">{article.date} {article.time}</span>
        {article.archiveOnly && (
          <span className="rounded bg-tk-gold/15 px-2 py-0.5 font-semibold text-tk-navy">🔒 アーカイブ</span>
        )}
      </div>

      <h1 className="mt-3 font-serif text-3xl font-bold leading-snug text-tk-navy">{article.title}</h1>

      {/* リード（常に表示） */}
      <p className="mt-6 border-l-4 border-tk-gold pl-4 text-lg leading-relaxed text-tk-ink">{article.excerpt}</p>

      {access.allowed ? (
        <>
          <div className="mt-6 space-y-5 leading-loose text-tk-ink">
            {article.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {consumesQuota && access.reason === 'free-quota' && (
            <p className="mt-8 rounded-md bg-tk-ice px-4 py-3 text-sm text-tk-navy">
              無料枠で閲覧中です（残り{Math.max(0, s.freeRemaining - 1)}本）。読み放題にするには{' '}
              <Link href="/thaikeizai/pricing" className="font-semibold underline">プランをご検討ください</Link>。
            </p>
          )}
          {consumesQuota && <ViewTracker slug={article.slug} />}
        </>
      ) : (
        <Paywall reason={access.reason} />
      )}

      {/* 関連記事 */}
      {related.length > 0 && (
        <div className="mt-12 border-t border-tk-navy/10 pt-6">
          <h2 className="mb-3 flex items-center gap-2 font-serif font-bold text-tk-navy">
            <span className="h-4 w-1 bg-tk-gold" /> 関連記事
          </h2>
          <ul className="divide-y divide-tk-navy/10">
            {related.map((a) => (
              <li key={a.slug}>
                <Link href={`/thaikeizai/articles/${a.slug}`} className="group flex items-start justify-between gap-3 py-2.5">
                  <span className="text-sm leading-snug text-tk-navy group-hover:text-tk-navy-2">{a.title}</span>
                  <span className="shrink-0 pt-0.5 text-[11px] text-tk-mute">{a.date.slice(5)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Paywall({ reason }: { reason: string }) {
  const archive = reason === 'archive-locked';
  return (
    <div className="relative mt-2">
      <div className="pointer-events-none h-28 bg-gradient-to-b from-transparent to-white" aria-hidden />
      <div className="rounded-xl border border-tk-gold/40 bg-tk-cream p-7 text-center shadow-md">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-tk-navy text-xl text-tk-gold-light">
          🔒
        </div>
        {archive ? (
          <>
            <h2 className="font-serif text-xl font-bold text-tk-navy">この記事はアーカイブ限定です</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-tk-ink/75">
              1997年からの記事を全文検索・閲覧できるのは「プロ」以上のプランです。28年分の蓄積を、調べものの武器に。
            </p>
          </>
        ) : (
          <>
            <h2 className="font-serif text-xl font-bold text-tk-navy">無料で読める記事数の上限に達しました</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-tk-ink/75">
              無料枠は月{FREE_LIMIT}本までです。続きと、毎朝のすべての記事をお読みいただくにはご購読ください。
            </p>
          </>
        )}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link href="/thaikeizai/pricing" className="rounded-md bg-tk-gold px-6 py-2.5 text-sm font-semibold text-tk-navy transition-colors hover:bg-tk-gold-light">
            プランを見る
          </Link>
          <Link href="/thaikeizai/login" className="text-sm text-tk-navy underline">
            すでに会員の方はログイン
          </Link>
        </div>
      </div>
    </div>
  );
}
