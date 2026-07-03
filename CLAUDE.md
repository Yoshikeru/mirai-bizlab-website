# MIRAI BizLab コーポレートサイト — プロジェクトガイド

## 概要
バンコク拠点の会計・税務・会社設立・経営サポート会社 **MIRAI BizLab Co., Ltd.** の多言語コーポレートサイト。
**6言語対応: ja / en / th / zh / zh-TW / es**（defaultLocale: `ja`、localePrefix: always）。
ターゲットは在タイ／タイ進出予定の日系中小企業（SME）。

- 本番URL: https://www.miraibizlab.co.th ／ リポジトリ: `Yoshikeru/mirai-bizlab-website`（GitHub）
- 本番デプロイ: **Vercel GitHub 連携。`main` へ push = 本番反映**（他ブランチはプレビュー）。

## 技術スタック
- Next.js 15（App Router）/ TypeScript strict / React 19 / Tailwind CSS v4（トークンは `src/styles/globals.css`）
- next-intl v4 / Framer Motion（`motion/react`）/ Lenis / Embla Carousel / react-hook-form + zod
- next-mdx-remote + gray-matter（ブログ）/ Vercel AI SDK + `@ai-sdk/anthropic`（チャットボット）/ Resend（問い合わせメール）

## コマンド
```bash
npm run dev / typecheck / lint / build
```
**コミット前に typecheck → lint、push 前に build を通すこと**（husky の pre-commit / pre-push で自動強制）。

## 環境変数（すべて Vercel 側に設定済み。コードに含めない。ローカルは `.env.local`）
`NEXT_PUBLIC_SITE_URL` / `ANTHROPIC_API_KEY` / `CHAT_MODEL` / `RESEND_API_KEY` / `CONTACT_NOTIFY_EMAIL` / `CONTACT_FROM_EMAIL`
（未設定時はチャット・メールともフォールバック動作。詳細は README）

## ディレクトリ構成（要点）
```
src/app/[locale]/            各ページ。layout.tsx が共通レイアウト
src/app/api/{chat,contact}/  チャットボットAPI / 問い合わせメール
src/app/sitemap.ts robots.ts SEO（hreflang/x-default。ブログslugは自動収集）
src/components/sections/     各セクション ／ layout/ Header・Footer 等 ／ chat/ChatWidget.tsx
src/lib/chat/knowledge.ts    チャットの知識ベース ／ lib/i18n/ ／ lib/seo/alternates.ts
content/blog/{locale}/*.mdx  ブログ記事（6言語） ／ messages/{locale}.json 全UI文言（6言語）
src/data/cases.ts            事例データ ／ public/assets/ ロゴ・画像
```

## 定型作業は skill / subagent を使う
- **ブログ記事の追加** → `blog-post` スキル（6言語 MDX・frontmatter・検証までの完全手順）
- **本番デプロイ** → `deploy` スキル（品質チェック→push→本番 curl 確認）
- **会社情報・サービス・料金・連絡先の変更** → `sync-knowledge` スキル（knowledge.ts / OrganizationSchema.tsx / messages の3点同期）
- **多言語の整合チェック** → `i18n-checker` サブエージェント（キー差分・slug 揃い・翻訳漏れ）

## 既知の落とし穴（再発防止メモ）
- **`useInView` の `margin` は単一値にしない**。`"-80px"` は左右も縮み、モバイル幅で左列の小要素が発火しない。縦のみ → `"-80px 0px"`（`src/components/ui/AnimatedNumber.tsx` 参照）。
- **オーバーレイ（MobileMenu / ChatWidget）は `createPortal(document.body)` で描画**。Header の `backdrop-blur` がスタッキングコンテキストを作り fixed 子要素を閉じ込めるため。
- **Framer Motion は非表示タブで一時停止**。ヘッドレス/背景タブ検証ではエントランスアニメが止まって見える（実機では正常）。
- **SSRハイドレーション不一致**回避のため、`BangkokPrismVisual` は三角関数座標を `.toFixed(2)` で丸めている。
- チャットUIはプレーンテキスト。マークダウンはプロンプト抑制＋`ChatWidget` の `toPlainText()` で除去。

## i18n の決まり
- URL は常に言語プレフィックス付き（`/ja/...` 〜 `/es/...` の6言語）。切替は `LocaleSwitcher`。
- 新規ページは `generateMetadata` で `buildAlternates(locale, path)` を使い、`src/app/sitemap.ts` の `STATIC_PATHS` にも追加。
- コンテンツ編集は**必ず6言語すべて**を揃える（messages / content/blog とも）。

## 素材クレジット
- タイ地図SVG: mapsicon（MIT）。詳細・運用手順・Resend/Anthropic 設定は `README.md` 参照。
