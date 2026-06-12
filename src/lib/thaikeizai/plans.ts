// 週刊タイ経済デモ：料金プラン定義（提案デックの価格設計に基づく）
// クライアント・サーバー両方から参照する（機密情報なし）

export type PlanId = 'digital' | 'print' | 'bundle' | 'pro' | 'corp-basic' | 'corp-pro';

export interface Plan {
  id: PlanId;
  name: string;
  price: number;          // バーツ / 月
  priceLabel?: string;    // 「〜」付きなど表示用
  tagline: string;
  features: string[];
  group: 'core' | 'upper';
  badge?: string;         // 「おすすめ」「おとり」など
  recommended?: boolean;  // 本命（強調表示）
  decoy?: boolean;        // おとり
  unlocksContent: boolean; // この契約で本紙が読み放題になるか
  archive?: boolean;       // 28年アーカイブ全文検索を含むか
}

export const PLANS: Plan[] = [
  {
    id: 'digital',
    name: 'デジタルのみ',
    price: 1200,
    tagline: '新規獲得の主力。一番安い入口',
    features: ['日刊ニュースをWeb・メールで', 'スマホ・PCで全文閲覧', '月3本の無料枠を超えて読み放題'],
    group: 'core',
    unlocksContent: true,
  },
  {
    id: 'print',
    name: '紙のみ',
    price: 1400,
    tagline: '従来どおり紙でお届け',
    features: ['紙面を配達 / EMS でお届け', 'Web版は月3本の無料枠まで'],
    group: 'core',
    badge: 'おとり',
    decoy: true,
    unlocksContent: false,
  },
  {
    id: 'bundle',
    name: '紙 ＋ デジタル',
    price: 1500,
    tagline: '紙だけ＋100Bで両方。迷わず選ばれる本命',
    features: ['紙面のお届け', '日刊ニュースをWeb・メールで', 'スマホ・PCで全文読み放題'],
    group: 'core',
    badge: 'おすすめ',
    recommended: true,
    unlocksContent: true,
  },
  {
    id: 'pro',
    name: 'プロ（個人上位）',
    price: 2500,
    tagline: 'プロフェッショナル向け',
    features: ['デジタルの全機能', '28年アーカイブ全文検索', '速報サービス'],
    group: 'upper',
    unlocksContent: true,
    archive: true,
  },
  {
    id: 'corp-basic',
    name: '法人ベーシック（5ID）',
    price: 6000,
    priceLabel: '6,000〜',
    tagline: 'チームでの購読に',
    features: ['全機能＋アーカイブ', '複数アカウント（5ID）', '請求書払い対応'],
    group: 'upper',
    unlocksContent: true,
    archive: true,
  },
  {
    id: 'corp-pro',
    name: '法人プロ',
    price: 12000,
    priceLabel: '12,000〜',
    tagline: '大規模利用・データ活用に',
    features: ['法人ベーシックの全機能', 'API / データ書き出し', '優先サポート'],
    group: 'upper',
    unlocksContent: true,
    archive: true,
  },
];

export const FREE_LIMIT = 3; // 月3本まで無料（メーター式）

export function getPlan(id: string | undefined | null): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}

// その契約で本紙が読み放題になるか
export function planUnlocks(id: string | undefined | null): boolean {
  const p = getPlan(id);
  return !!p?.unlocksContent;
}
