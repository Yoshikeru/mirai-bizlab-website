# MIRAI BizLab — Corporate Website

バンコクを拠点とする会計・コンサルティング会社 **MIRAI BizLab Co., Ltd.** のコーポレートサイト。日系SMEのタイ進出と運用を支援する3言語(日本語 / English / ไทย)対応のNext.jsプロジェクトです。

---

## 技術スタック

| 項目 | 採用 |
| --- | --- |
| フレームワーク | Next.js 15 (App Router) |
| 言語 | TypeScript (strict) |
| スタイリング | Tailwind CSS v4 + CSSデザイントークン |
| アニメーション | Framer Motion (`motion/react`) + Lenis (スムーススクロール) |
| 多言語化 | next-intl v4 (ja / en / th, default: ja) |
| アイコン | lucide-react |
| カルーセル | Embla Carousel |
| フォーム | react-hook-form + zod |
| ブログ | MDX (`next-mdx-remote/rsc` + gray-matter) |
| フォント | next/font 経由で Noto Sans JP / Inter / Noto Sans Thai |

---

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

```bash
cp .env.local.example .env.local
```

`.env.local` を編集し、本番URL等を設定してください。`NEXT_PUBLIC_SITE_URL` は `sitemap.xml` / `robots.txt` / OG画像URL の正規化に使われます。

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。デフォルトでは `/ja` にリダイレクトされます。

### 4. 本番ビルド

```bash
npm run build
npm run start
```

### 5. その他のコマンド

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
```

---

## ディレクトリ構成

```
mirai-bizlab-website/
├── content/
│   └── blog/                 # MDX記事 (ja / en / th サブディレクトリ)
├── messages/
│   ├── ja.json               # 日本語翻訳
│   ├── en.json               # 英語翻訳
│   └── th.json               # タイ語翻訳
├── public/
│   └── assets/logo/          # ロゴ画像 (1: 横並び, 2: 縦並び)
├── src/
│   ├── app/
│   │   ├── [locale]/         # 各ロケールごとのルート
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx      # ホーム
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── pricing/
│   │   │   ├── cases/
│   │   │   ├── blog/         # 一覧 + [slug] 個別
│   │   │   ├── careers/
│   │   │   └── contact/
│   │   ├── api/contact/      # 問い合わせフォーム送信先 (現状 console.log)
│   │   ├── icon.tsx          # favicon (動的生成)
│   │   ├── apple-icon.tsx    # apple-touch-icon
│   │   ├── opengraph-image.tsx # OG画像
│   │   ├── sitemap.ts        # sitemap.xml
│   │   ├── robots.ts         # robots.txt
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/           # Header, Footer, LocaleSwitcher, PageHero, Breadcrumb
│   │   ├── sections/         # ページ固有のセクション
│   │   ├── motion/           # アニメーション基盤 (LenisProvider, Reveal, constants)
│   │   └── ui/               # 再利用UI (Button, SectionHeader, AnimatedNumber)
│   ├── data/                 # 構造化データのインデックス (例: cases.ts)
│   ├── lib/
│   │   ├── i18n/             # next-intl の routing / navigation / request 設定
│   │   └── blog.ts           # MDX読み込み
│   ├── styles/globals.css    # デザイントークン + Tailwind v4 エントリ
│   └── middleware.ts         # next-intl ロケールルーティング
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## デザインシステム

### カラートークン (`src/styles/globals.css`)

| 用途 | 値 |
| --- | --- |
| 背景 | `#FAFAFA` |
| 文字 | `#1A1A1A` |
| アクセント (朱赤) | `#D7000F` |
| アクセント (薄背景) | `#F4E5E6` |
| 補助テキスト | `#6B6B6B` |
| 罫線 | `#E5E5E5` |

### フォント

- 日本語: Noto Sans JP (`--font-noto-sans-jp`)
- 欧文: Inter (`--font-inter`)
- タイ語: Noto Sans Thai (`--font-noto-sans-thai`)

`html[lang]` で言語ごとに自動切替されます。

### アニメーション規格

- イージング: `cubic-bezier(0.22, 1, 0.36, 1)` (定数: [src/components/motion/constants.ts](src/components/motion/constants.ts))
- 標準 duration: 0.6 – 0.8s / ホバー: 0.3s
- スクロール連動には `useScroll` + `useTransform` を使用
- すべての装飾アニメーションは `prefers-reduced-motion` を尊重

---

## コンテンツの更新方法

### 1. ページ本文 / セクションのコピー

`messages/{ja,en,th}.json` を編集してください。3言語すべてで同じキーが揃っている必要があります。

| 編集対象 | パス |
| --- | --- |
| ホーム | `home.*` |
| 会社情報 | `about.*` |
| サービス | `services.*` |
| 料金 | `pricing.*` (含む FAQ) |
| 事例 | `home.cases.items` (現状はホームと共有) |
| 採用 | `careers.*` |
| お問い合わせ | `contact.*` |
| 共通 (ナビ / フッター) | `nav.*` / `footer.*` |

### 2. ブログ記事の追加

```
content/blog/<locale>/<slug>.mdx
```

3言語すべてに同じ `<slug>` で配置してください。フロントマターは以下:

```mdx
---
title: "記事タイトル"
category: "expansion"  # accounting | legal | expansion | trends
publishedAt: "2026-04-15"
excerpt: "概要(一覧カード用)"
readTime: 6
---

## 見出し
本文 (MDX)
```

ファイルを追加すると、`sitemap.xml` と `/blog` 一覧、`/blog/[slug]` 個別ページに自動反映されます。

### 3. 事例 (Cases)

現状はメッセージファイルに直接埋め込んでいます。CMS化する際は `src/data/cases.ts` の `CASE_SLUGS` を起点に、`messages/*.json` の `home.cases.items` を外部データソースへ差し替えてください。

### 4. ロゴアセット

```
public/assets/logo/
├── Logo_MIRAI_BizLab1.png   # 横並びロゴ (Header / Footer)
├── Logo_MIRAI_BizLab2.jpg   # 縦並びロゴ (PageHero / MVV背景)
└── tree-mark.png            # 樹木モチーフ単体 (favicon と src/app/icon.png 用)
```

差し替えはファイルを置き換えるだけで反映されます。

### 5. 連絡先 (電話 / メール / LINE / 住所 / 営業時間)

`messages/{ja,en,th}.json` の `contact.info.*` を編集してください。フッターやContactページに反映されます。

### 6. 価格

`messages/{ja,en,th}.json` の `pricing.plans` を編集してください。価格を確定して表示する場合は、`price` フィールドを `"50,000 THB / month"` のような表示に書き換えます。

---

## Vercel へのデプロイ

### 初回セットアップ

1. [Vercel](https://vercel.com) にログインし、**Import Project** から GitHub リポジトリを接続します。
2. **Framework Preset** は **Next.js** を選択 (自動検出されます)。
3. **Environment Variables** で以下を設定:
   - `NEXT_PUBLIC_SITE_URL` = `https://miraibizlab.co.th` (本番ドメイン)
4. **Deploy** をクリック。

### カスタムドメインの設定

1. Vercel プロジェクトの **Settings → Domains** で `miraibizlab.co.th` を追加。
2. DNS プロバイダで A レコード / CNAME を Vercel が指示する値に設定。
3. SSL は自動で発行されます。
4. 設定後、`NEXT_PUBLIC_SITE_URL` を本番ドメインに更新し再デプロイ。

### 継続的デプロイ

- `main` ブランチへのpushで本番デプロイ
- フィーチャーブランチで自動的にプレビュー URL が発行されます
- プレビュー環境にも環境変数を継承するには **Environment Variables** で `Preview` を選択

### 問い合わせフォームの稼働 (Resend設定)

`src/app/api/contact/route.ts` は [Resend](https://resend.com) によるメール送信に対応済みです。Vercel の環境変数に下記を設定すれば、即座にメール通知が始まります。

| 変数名 | 用途 | 例 |
| --- | --- | --- |
| `RESEND_API_KEY` | Resend の API キー (必須) | `re_xxxxxxxxxxxxxxxxxxxx` |
| `CONTACT_NOTIFY_EMAIL` | お問い合わせの通知先メール | `yoshida@miraibizlab.co.th` |
| `CONTACT_FROM_EMAIL` | (任意) ドメイン認証後の差出人 | `MIRAI BizLab <contact@miraibizlab.co.th>` |

#### セットアップ手順

1. [https://resend.com](https://resend.com) でサインアップ
2. **API Keys → Create API Key** で `re_...` を発行 → コピー
3. Vercel ダッシュボード → プロジェクト → **Settings → Environment Variables** で上記3変数を Production / Preview / Development に追加
4. (任意) 自社ドメイン `miraibizlab.co.th` を Resend の **Domains** で認証 (DNS にTXT/MX/DKIMを追加) → 認証完了後に `CONTACT_FROM_EMAIL` を `contact@miraibizlab.co.th` 経由に変更
5. 設定後、再デプロイ (`npx vercel --prod`) で反映

> **`RESEND_API_KEY` 未設定時**は console.log フォールバックで動作し、本番ビルドは通ります (メール送信されません)。

#### 動作確認

- フォーム送信 → 200 OK + `{ ok: true, delivery: "email" }` レスポンス
- `CONTACT_NOTIFY_EMAIL` に件名 `[MIRAI BizLab] お問い合わせ from ...` のHTMLメールが届く
- `reply-to` がお客様のメールに設定されているので、メールアプリの「返信」でそのまま顧客に返信できます

---

## 動作確認チェックリスト

- [ ] 3言語 (`/ja`, `/en`, `/th`) すべてのページが正常に表示される
- [ ] LocaleSwitcher で言語切替後も同じパスを保持する
- [ ] `/blog` 一覧 → 個別記事に遷移できる (3言語)
- [ ] `/contact` フォームのバリデーションが機能する (空欄 / 不正メール / カテゴリ未選択)
- [ ] `/sitemap.xml` と `/robots.txt` が応答する
- [ ] `/icon` / `/apple-icon` / `/opengraph-image` が画像を返す
- [ ] `npm run build` がエラーなく完了する
- [ ] Lighthouse でパフォーマンス80以上、アクセシビリティ95以上

---

## クレジット (オープンソース素材)

### タイ地図 (Heroセクション)
- **データ**: [mapsicon](https://github.com/djaiss/mapsicon) — 国別 SVG outline コレクション
- **ライセンス**: MIT License
- **使用箇所**: `src/components/visuals/thailand-outline.ts` (国境path data)、`src/components/visuals/BangkokPrismVisual.tsx` (描画)

### フォント (Google Fonts経由)
- [Inter](https://rsms.me/inter/) — 欧文本文
- [Inter Tight](https://fonts.google.com/specimen/Inter+Tight) — 欧文Display見出し
- [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP) — 日本語
- [Noto Sans Thai](https://fonts.google.com/noto/specimen/Noto+Sans+Thai) — タイ語

### アイコン
- [Lucide](https://lucide.dev/) — 各セクションのアイコン (Building2, Calculator, Database, LineChart 他)
- **ライセンス**: ISC License

### 写真素材 (差し替え予定)
- 仮素材として一部 [Unsplash](https://unsplash.com) のフリー写真を利用。本番運用時には自社素材へ差し替えてください。

---

## デプロイ運用フロー (Vercel自動デプロイ設定後)

1. ローカルで編集 → `git commit`
2. `git push` で GitHub の対象ブランチへ
3. Vercel が自動でビルド → 本番反映 (約1〜3分)
4. デプロイ完了通知は Vercel ダッシュボード / GitHub PR コメント / Slack 連携(任意)で確認

> Production ブランチ以外への push は自動でプレビュー URL (`*.vercel.app`) が発行されます。マージ前のレビューに便利です。

---

## ライセンス

MIRAI BizLab Co., Ltd. 専用 / All rights reserved.
  test trigger: GitHub→Vercel auto deploy
auto-deploy verification: Sun May 31 15:12:59 +07 2026
