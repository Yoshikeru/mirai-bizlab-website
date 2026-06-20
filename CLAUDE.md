# MIRAI BizLab コーポレートサイト — プロジェクトガイド

> このファイルは Claude Code がセッション開始時に自動で読み込みます。
> 新しいセッションでも、これを読めばすぐに作業状況を把握できます。

## 概要
バンコク拠点の会計・税務・会社設立・経営サポート会社 **MIRAI BizLab Co., Ltd.** の
トリリンガル（日本語 / 英語 / タイ語）コーポレートサイト。ターゲットは在タイ／タイ進出予定の日系中小企業（SME）。

- 本番URL: https://www.miraibizlab.co.th
- リポジトリ: `Yoshikeru/mirai-bizlab-website`（GitHub）

## 技術スタック
- Next.js 15（App Router） / TypeScript（strict） / React 19
- Tailwind CSS v4（`@theme inline` + CSSカスタムプロパティ。トークンは `src/styles/globals.css`）
- next-intl v4（i18n。`locales: ja/en/th`、`defaultLocale: ja`、`localePrefix: always`）
- Framer Motion（`motion/react`） / Lenis（スムーススクロール、smoothWheelのみ）
- Embla Carousel（/cases） / react-hook-form + zod（/contact）
- next-mdx-remote + gray-matter（ブログ） / lucide-react（アイコン）
- Vercel AI SDK（`ai` v6 + `@ai-sdk/anthropic`）でチャットボット
- Resend（問い合わせメール） / Vercel Analytics + Speed Insights

## コマンド
```bash
npm run dev        # 開発サーバ
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
npm run build      # 本番ビルド
```
**コミット前に必ず `typecheck` → `lint` → `build` を通すこと。**

## デプロイ運用（重要）
- 本番デプロイは **Vercel の GitHub 自動連携**。Production Branch = **`main`**（2026-06-13に旧 `claude/fervent-antonelli-146211` から切替済み・push→本番反映を実地確認済み）。
- `main` に **push すると本番に自動デプロイ**される（別ブランチはプレビュー扱い）。
- 流れ: 編集 → typecheck/lint/build → `git commit` → `git push origin HEAD` → Vercel が自動ビルド・公開。
- 反映確認は本番URLを `curl` などで確認（デプロイは概ね1〜2分）。

## 環境変数（すべて Vercel 側に設定済み。コードには含めない）
| 変数 | 用途 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | 本番URL（`https://www.miraibizlab.co.th`）。canonical / sitemap / OG / hreflang に使用 |
| `ANTHROPIC_API_KEY` | チャットボット（Claude）。未設定時はフォールバック応答 |
| `CHAT_MODEL` | （任意）既定 `claude-haiku-4-5` |
| `RESEND_API_KEY` | 問い合わせフォームのメール送信。未設定時は console.log フォールバック |
| `CONTACT_NOTIFY_EMAIL` / `CONTACT_FROM_EMAIL` | 通知先 / 差出人 |
- ローカルで使う場合は `.env.local`（gitignore済み）。雛形は `.env.local.example`。
- **コスト保険**: Anthropic コンソールで月間 Spend limit を設定推奨。

## ディレクトリ構成（要点）
```
src/app/[locale]/        各ページ（page.tsx）。layout.tsx が共通レイアウト
src/app/api/chat/        チャットボットAPI（streamText + Claude、Origin制限・レート制限・トークン上限）
src/app/api/contact/     問い合わせメール（Resend）
src/app/sitemap.ts robots.ts  SEO（hreflang/x-default 出力）
src/components/sections/ 各セクション（Hero, AboutMetrics, Services, ...）
src/components/chat/ChatWidget.tsx   右下フローティングのAIチャット（"MIRAI AIサポート"）
src/components/layout/   Header / Footer / LocaleSwitcher / MobileMenu / PageHero
src/components/visuals/  BangkokPrismVisual（タイ地図）/ RubikCube3D
src/lib/chat/knowledge.ts   チャットの知識ベース（システムプロンプト）
src/lib/i18n/            routing / navigation / request
src/lib/seo/alternates.ts   canonical + hreflang 生成ヘルパー
content/blog/{ja,en,th}/*.mdx   ブログ記事（言語ごと）
messages/{ja,en,th}.json        全UI文言（3言語）
public/assets/           ロゴ・画像
```

## コンテンツ編集の場所
- **画面の文言**: `messages/{ja,en,th}.json`（3言語すべて揃えて編集）。
- **ブログ記事**: `content/blog/{ja,en,th}/<slug>.mdx`（frontmatter + 本文）。3言語分。
- **事例データ**: `src/data/cases.ts`。
- **連絡先（電話/メール/LINE/住所/営業時間）**: `messages/*.json` の `contact.info` と
  `src/components/seo/OrganizationSchema.tsx`（JSON-LD）の両方を更新。
- **会社情報・サービス・料金を変えたら、チャットの知識ベース
  `src/lib/chat/knowledge.ts` も必ず同期更新する**（回答精度のため）。

## 既知の落とし穴（再発防止メモ）
- **`useInView` の `margin` は単一値にしない**。`"-80px"` は上下左右すべてを縮め、
  狭いモバイル幅で左列の小さい要素（例: 数字カウントアップ）が左の死角に入り発火しない。
  縦のみにする → `"-80px 0px"`。`src/components/ui/AnimatedNumber.tsx` 参照。
- **オーバーレイ（MobileMenu / ChatWidget）は `createPortal(document.body)` で描画**。
  Header の `backdrop-blur` がスタッキングコンテキストを作り、fixed子要素を閉じ込めるため。
- **Framer Motion は非表示タブ（`document.hidden`）でアニメを一時停止**する。
  ヘッドレス/背景タブでの検証では、エントランスアニメが途中で止まって見えることがある（実機では正常）。
- **SSRハイドレーション不一致**を避けるため、`BangkokPrismVisual` は三角関数の座標を `.toFixed(2)` で丸めている。
- チャットUIはプレーンテキスト表示。モデルが出す `**bold**` 等のマークダウンは
  プロンプトで抑制＋`ChatWidget` の `toPlainText()` で除去している。

## i18n の決まり
- URLは常に言語プレフィックス付き（`/ja/...`, `/en/...`, `/th/...`）。
- 言語切替は `LocaleSwitcher`（`<Link>` + `hreflang` + `rel="alternate"`）。
- 新規ページ追加時は `generateMetadata` で `buildAlternates(locale, path)` を使い、
  `src/app/sitemap.ts` の `STATIC_PATHS` にもパスを追加する。

## 素材クレジット
- タイ地図SVG: mapsicon（MIT）。詳細は README 参照。

---
詳しい運用手順・デプロイ・Resend/Anthropic設定は `README.md` を参照。
