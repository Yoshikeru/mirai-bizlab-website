---
name: blog-post
description: MIRAI BizLab サイトにブログ記事を追加する完全手順。「ブログ記事を書いて/追加して」「○○について記事にして」「新しい記事」「blog post」等の依頼で必ず使用。全6言語（ja/en/th/zh/zh-TW/es）のMDX作成から検証・デプロイ前確認まで。
---

# ブログ記事の追加手順

## 1. slug とメタ情報を決める
- slug: 英語 kebab-case（例: `thailand-e-invoice`）。**全言語で同一 slug**（LocaleSwitcher / hreflang が slug 一致を前提とするため）。
- category: 既存記事で使われている値に合わせる（`accounting` / `expansion` など。`grep -h category content/blog/ja/*.mdx | sort -u` で確認）。
- coverImage: `/assets/blog/<名前>.svg`。新規ならダーク基調の SVG を `public/assets/blog/` に作成（既存 SVG のトーンに合わせる）。

## 2. 6言語分の MDX を作成
`content/blog/{ja,en,th,zh,zh-TW,es}/<slug>.mdx` の **6ファイル**。frontmatter 形式:

```yaml
---
title: "記事タイトル"
category: "accounting"
publishedAt: "YYYY-MM-DD"   # 今日の日付
readTime: 6                  # 分。全言語で同じ値
excerpt: "一覧・OGに出る要約（1〜2文）"
coverImage: "/assets/blog/xxx.svg"
---
```

- 本文は `##` 見出し＋箇条書き中心。日本語版を先に書き、他言語は翻訳（ネイティブに自然な文体で。直訳調を避ける）。
- 想定読者: 在タイ・タイ進出予定の日系中小企業（zh/zh-TW/es は各言語圏の中小企業）。
- 内容が会社サービスに触れる場合は `src/lib/chat/knowledge.ts` との整合を確認。

## 3. 検証
1. `npm run typecheck && npm run lint && npm run build`
2. sitemap は `src/lib/blog.ts` の `getBlogSlugs` が自動収集するため**編集不要**。
3. dev サーバで `/ja/blog/<slug>` と他言語1つ以上を表示確認（一覧ページにカードが出ること・カバー画像が表示されること）。
4. 6ファイルの slug・publishedAt・readTime が全言語で一致しているか最終確認（i18n-checker サブエージェントに依頼可）。

## 4. コミット
`content(blog): <記事名> 記事を追加（全6言語）` の形式でコミット。公開（push）はユーザーに確認してから。
