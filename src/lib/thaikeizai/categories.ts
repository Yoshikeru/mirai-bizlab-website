// 週刊タイ経済デモ：カテゴリー定義（クライアント・サーバー共用）

export interface TkCat {
  slug: string;
  label: string;
  chip: string;   // 一覧のカテゴリーチップ用 Tailwind クラス（リテラルで記述）
  bar: string;    // セクション見出しの帯の色
}

export const CATEGORIES: TkCat[] = [
  { slug: 'flash', label: '速報', chip: 'bg-red-600 text-white', bar: 'bg-red-600' },
  { slug: 'econ', label: '政治・経済', chip: 'bg-tk-navy text-white', bar: 'bg-tk-navy' },
  { slug: 'industry', label: '産業・企業', chip: 'bg-tk-navy-2 text-white', bar: 'bg-tk-navy-2' },
  { slug: 'market', label: '金融・市場', chip: 'bg-emerald-700 text-white', bar: 'bg-emerald-700' },
  { slug: 'law', label: '法律・制度', chip: 'bg-tk-ice text-tk-navy', bar: 'bg-tk-navy' },
  { slug: 'stats', label: '統計・指標', chip: 'bg-tk-ice text-tk-navy', bar: 'bg-tk-navy-2' },
  { slug: 'column', label: 'コラム', chip: 'bg-tk-gold/20 text-tk-navy', bar: 'bg-tk-gold' },
  { slug: 'report', label: 'レポート', chip: 'bg-tk-navy-2/10 text-tk-navy-2', bar: 'bg-tk-navy-2' },
  { slug: 'company', label: '企業紹介', chip: 'bg-tk-navy text-white', bar: 'bg-tk-navy' },
];

const BY_LABEL = new Map(CATEGORIES.map((c) => [c.label, c]));
const BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));

export function catByLabel(label: string): TkCat | undefined {
  return BY_LABEL.get(label);
}
export function catBySlug(slug: string): TkCat | undefined {
  return BY_SLUG.get(slug);
}
export function chipClass(label: string): string {
  return BY_LABEL.get(label)?.chip ?? 'bg-tk-ice text-tk-navy';
}
