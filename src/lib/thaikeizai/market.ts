// 週刊タイ経済デモ：マーケット指標バー（デモ用の固定データ）

export interface MarketItem {
  name: string;
  value: string;
  change: string;
  dir: 'up' | 'down' | 'flat';
}

// 日本式：上昇＝赤、下落＝青
export const MARKET: MarketItem[] = [
  { name: 'SET指数', value: '1,268.42', change: '+0.82%', dir: 'up' },
  { name: '日経平均', value: '38,512', change: '+1.15%', dir: 'up' },
  { name: 'バーツ/円', value: '4.28', change: '-0.21%', dir: 'down' },
  { name: 'バーツ/ドル', value: '36.45', change: '+0.12%', dir: 'up' },
  { name: 'WTI原油', value: '72.10', change: '-0.35%', dir: 'down' },
  { name: '金(THB/g)', value: '2,485', change: '+0.40%', dir: 'up' },
];
