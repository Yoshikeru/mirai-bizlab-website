import Link from 'next/link';
import { listArticleMeta, listByCategory, type TkArticleMeta } from '@/lib/thaikeizai/articles';
import { CATEGORIES, chipClass, catBySlug } from '@/lib/thaikeizai/categories';

function md(a: TkArticleMeta) {
  return `${a.date.slice(5)} ${a.time}`;
}

// セクション表示順
const SECTION_ORDER = ['econ', 'industry', 'market', 'law', 'stats', 'column', 'report', 'company'];
// アクセスランキング（デモ用の固定順）
const RANKING = [
  'boi-ev-approval',
  'cbank-rate-hold',
  'housing-market-2026-05',
  'pdpa-amendment',
  'set-index-rally',
];
const LEAD = 'housing-market-2026-05';

export default function TkHome() {
  const all = listArticleMeta();
  const bySlug = new Map(all.map((a) => [a.slug, a]));
  const sorted = [...all].sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
  const flash = all.filter((a) => a.category === '速報');
  const lead = bySlug.get(LEAD) ?? sorted[0];
  const topNews = sorted.filter((a) => a.slug !== lead.slug && a.category !== '速報').slice(0, 4);
  const ranking = RANKING.map((s) => bySlug.get(s)).filter(Boolean) as TkArticleMeta[];
  const latest = sorted.slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-4 py-5">
      {/* 速報ストリップ */}
      {flash.length > 0 && (
        <div className="mb-5 flex items-center gap-3 overflow-x-auto border-y border-tk-navy/10 bg-tk-cream px-3 py-2">
          <span className="shrink-0 rounded bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white">速報</span>
          <div className="flex items-center gap-5 text-sm">
            {flash.map((a) => (
              <Link key={a.slug} href={`/thaikeizai/articles/${a.slug}`} className="flex shrink-0 items-center gap-2 hover:text-tk-navy-2">
                <span className="text-xs text-tk-mute">{a.time}</span>
                <span className="font-medium text-tk-navy">{a.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* メイン */}
        <div>
          {/* リード記事 */}
          <Link href={`/thaikeizai/articles/${lead.slug}`} className="group block border-b border-tk-navy/10 pb-6">
            <div className="mb-2 flex items-center gap-2 text-xs">
              <span className={`rounded px-2 py-0.5 font-semibold ${chipClass(lead.category)}`}>{lead.category}</span>
              <span className="text-tk-mute">{md(lead)}</span>
            </div>
            <h2 className="font-serif text-3xl font-bold leading-snug text-tk-navy group-hover:text-tk-navy-2">
              {lead.title}
            </h2>
            <p className="mt-3 leading-relaxed text-tk-ink/80">{lead.excerpt}</p>
          </Link>

          {/* 主要ニュース */}
          <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {topNews.map((a) => (
              <Link key={a.slug} href={`/thaikeizai/articles/${a.slug}`} className="group block">
                <div className="mb-1.5 flex items-center gap-2 text-[11px]">
                  <span className={`rounded px-1.5 py-0.5 font-semibold ${chipClass(a.category)}`}>{a.category}</span>
                  <span className="text-tk-mute">{md(a)}</span>
                </div>
                <h3 className="font-bold leading-snug text-tk-navy group-hover:text-tk-navy-2">{a.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-tk-ink/65">{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* サイドバー */}
        <aside className="space-y-7">
          {/* ランキング */}
          <div className="border border-tk-navy/10 bg-tk-cream/60 p-4">
            <h3 className="mb-3 flex items-center gap-2 font-serif font-bold text-tk-navy">
              <span className="h-4 w-1 bg-tk-gold" /> アクセスランキング
            </h3>
            <ol className="space-y-3">
              {ranking.map((a, i) => (
                <li key={a.slug}>
                  <Link href={`/thaikeizai/articles/${a.slug}`} className="group flex gap-3">
                    <span className="font-serif text-lg font-bold leading-none text-tk-gold">{i + 1}</span>
                    <span className="text-sm leading-snug text-tk-navy group-hover:text-tk-navy-2">
                      {a.title}
                      {a.archiveOnly && <span className="ml-1 text-[10px] text-tk-gold">🔒</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          {/* 新着 */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-serif font-bold text-tk-navy">
              <span className="h-4 w-1 bg-tk-navy" /> 新着
            </h3>
            <ul className="divide-y divide-tk-navy/10 border-y border-tk-navy/10">
              {latest.map((a) => (
                <li key={a.slug}>
                  <Link href={`/thaikeizai/articles/${a.slug}`} className="group block py-2.5">
                    <span className="text-[11px] text-tk-mute">{md(a)} ・ {a.category}</span>
                    <p className="text-sm leading-snug text-tk-navy group-hover:text-tk-navy-2">{a.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 購読CTA */}
          <div className="bg-tk-navy p-5 text-white">
            <p className="font-serif text-lg font-bold">続きは購読で</p>
            <p className="mt-1 text-sm text-white/70">月3本まで無料。すべての記事と毎朝のPDFをお届けします。</p>
            <Link href="/thaikeizai/pricing" className="mt-3 inline-block rounded bg-tk-gold px-4 py-2 text-sm font-semibold text-tk-navy hover:bg-tk-gold-light">
              プランを見る
            </Link>
          </div>
        </aside>
      </div>

      {/* カテゴリー別セクション */}
      <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2">
        {SECTION_ORDER.map((slug) => {
          const cat = catBySlug(slug);
          if (!cat) return null;
          const items = listByCategory(cat.label).slice(0, 4);
          if (items.length === 0) return null;
          return (
            <section key={slug}>
              <div className="mb-3 flex items-center justify-between border-b-2 border-tk-navy/15 pb-1.5">
                <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-tk-navy">
                  <span className={`h-4 w-1.5 ${cat.bar}`} />
                  {cat.label}
                </h3>
                <Link href={`/thaikeizai/category/${slug}`} className="text-xs text-tk-mute hover:text-tk-navy">
                  一覧 →
                </Link>
              </div>
              <ul className="divide-y divide-tk-navy/10">
                {items.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/thaikeizai/articles/${a.slug}`} className="group flex items-start justify-between gap-3 py-2.5">
                      <span className="text-sm leading-snug text-tk-navy group-hover:text-tk-navy-2">
                        {a.title}
                        {a.archiveOnly && <span className="ml-1 text-[10px] text-tk-gold">🔒</span>}
                      </span>
                      <span className="shrink-0 pt-0.5 text-[11px] text-tk-mute">{md(a)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
