# MIRAI BizLab Co., Ltd. - Official Website

バンコクを拠点に日系企業の経理代行・AI導入支援を提供する MIRAI BizLab Co., Ltd. の公式ウェブサイト。

## 技術スタック

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS 3.4** (カスタムデザインシステム)
- **Framer Motion 11** (アニメーション)
- **Anthropic Claude API** (AIチャット機能)

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example` を `.env.local` にコピーし、APIキーを設定:

```bash
cp .env.local.example .env.local
```

```
ANTHROPIC_API_KEY=your_api_key_here
```

> **Note:** AIチャット機能はAPIキーなしでもフォールバック応答で動作します。

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

### 4. 本番ビルド

```bash
npm run build
npm start
```

## プロジェクト構造

```
mirai-bizlab-website/
├── public/
│   └── images/              # ロゴ・画像ファイル
├── src/
│   ├── app/
│   │   ├── layout.tsx       # ルートレイアウト（多言語対応）
│   │   ├── page.tsx         # トップページ
│   │   ├── globals.css      # グローバルスタイル
│   │   ├── services/        # 事業内容ページ
│   │   ├── about/           # 会社概要ページ
│   │   ├── blog/            # 社長ブログページ
│   │   ├── contact/         # お問い合わせページ
│   │   └── api/chat/        # AIチャットAPI
│   ├── components/
│   │   ├── layout/          # Header, Footer, LanguageSwitcher
│   │   ├── chat/            # AIチャットボットWidget
│   │   └── ui/              # 共通UIコンポーネント
│   ├── lib/
│   │   ├── i18n.ts          # 多言語対応ユーティリティ
│   │   └── animations.ts    # Framer Motionアニメーション定義
│   └── locales/
│       ├── ja.json          # 日本語
│       ├── en.json          # 英語
│       └── th.json          # タイ語
├── package.json
├── tailwind.config.js       # Tailwindカスタム設定
├── tsconfig.json
└── next.config.js
```

## ページ構成

| ページ | パス | 説明 |
|--------|------|------|
| トップ | `/` | ヒーローセクション、サービスプレビュー、会社紹介 |
| 事業内容 | `/services` | 3つのサービス詳細（経理代行、アプリ化&AI化、AIトレーニング） |
| 会社概要 | `/about` | 代表メッセージ、会社情報テーブル、地図 |
| 社長ブログ | `/blog` | ブログ記事一覧（CMS連携予定） |
| お問い合わせ | `/contact` | 問い合わせフォーム、連絡先情報 |

## デザインシステム

### カラーパレット

| 用途 | カラー | コード |
|------|--------|--------|
| プライマリレッド | 赤 | `#DC2626` |
| レッドダーク（ホバー） | 暗い赤 | `#B91C1C` |
| ブランドブラック | 黒 | `#0A0A0A` |
| グレーダーク | 濃灰 | `#1F2937` |
| グレーミッド | 灰 | `#6B7280` |
| グレーライト | 薄灰 | `#F3F4F6` |
| ホワイト | 白 | `#FFFFFF` |

### フォント

- **Inter** — 英語テキスト
- **Noto Sans JP** — 日本語テキスト
- **Noto Sans Thai** — タイ語テキスト

### 主なアニメーション

- スクロール連動フェードイン
- パララックスヒーロー
- カードホバーエフェクト
- ページ遷移アニメーション
- ナビゲーションのスムーズ表示/非表示

## 機能

### 多言語対応（3言語）
- 日本語 🇯🇵
- English 🇬🇧
- ไทย 🇹🇭
- ヘッダーの言語切替ボタンで瞬時に切替可能

### AIチャットボット
- 画面右下のチャットアイコンから起動
- MIRAI BizLabのサービスに関する質問に自動回答
- Anthropic Claude APIを使用
- APIキー未設定時はフォールバック応答

### レスポンシブデザイン
- モバイル、タブレット、デスクトップに完全対応
- モバイル用ハンバーガーメニュー

## カスタマイズ

### ロゴの変更
`public/images/` にロゴファイルを配置し、`Header.tsx` と `Footer.tsx` のロゴ部分を更新してください。

### 問い合わせフォームの接続
`src/app/contact/page.tsx` の `handleSubmit` 関数を実際のメール送信APIまたはフォームサービスに接続してください。

### ブログ記事の管理
CMSを導入する場合は、`src/app/blog/page.tsx` のサンプルデータ部分をAPI呼び出しに置き換えてください。

## Cursor IDEでの開発

1. Cursorでこのフォルダを開く
2. ターミナルで `npm install` を実行
3. `npm run dev` で開発サーバーを起動
4. Cursorの AI機能で各コンポーネントを自由にカスタマイズ

## ライセンス

MIRAI BizLab Co., Ltd. 専用
