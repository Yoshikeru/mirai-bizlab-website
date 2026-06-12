import Link from 'next/link';
import { notFound } from 'next/navigation';
import { catBySlug } from '@/lib/thaikeizai/categories';
import { listByCategory } from '@/lib/thaikeizai/articles';

function md(date: string, time: string) {
  return `${date.slice(5)} ${time}`;
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = catBySlug(params.slug);
  if (!cat) notFound();

  const items = listByCategory(cat.label);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="text-xs text-tk-mute">
        <Link href="/thaikeizai" className="hover:text-tk-navy">トップ</Link>
        <span className="mx-1.5">›</span>
        <span className="text-tk-navy">{cat.label}</span>
      </nav>

      <h1 className="mt-3 flex items-center gap-3 font-serif text-2xl font-bold text-tk-navy">
        <span className={`h-6 w-1.5 ${cat.bar}`} />
        {cat.label}
      </h1>

      {items.length === 0 ? (
        <p className="mt-8 text-tk-mute">このカテゴリーの記事はまだありません。</p>
      ) : (
        <ul className="mt-6 divide-y divide-tk-navy/10 border-t border-tk-navy/10">
          {items.map((a) => (
            <li key={a.slug}>
              <Link href={`/thaikeizai/articles/${a.slug}`} className="group block py-5">
                <span className="text-[11px] text-tk-mute">{md(a.date, a.time)}</span>
                <h2 className="mt-0.5 font-bold leading-snug text-tk-navy group-hover:text-tk-navy-2">
                  {a.title}
                  {a.archiveOnly && <span className="ml-2 text-[11px] font-semibold text-tk-gold">🔒 アーカイブ</span>}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm text-tk-ink/65">{a.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
