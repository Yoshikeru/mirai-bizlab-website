---
name: sync-knowledge
description: 会社情報・サービス・料金・連絡先を変更したときの同期手順。「料金を変えて」「サービス内容を更新」「電話番号/住所/営業時間の変更」「連絡先を直して」等の依頼で必ず使用。チャットボット知識ベース・JSON-LD・UI文言の3点同期。
---

# 会社情報変更時の同期手順

会社情報・サービス・料金・連絡先を変えるときは、**次の3系統を必ずセットで更新**する（どれか1つでも漏れると、サイト表示・検索エンジン・AIチャットの回答が食い違う）。

## 更新箇所チェックリスト

1. **UI 文言**: `messages/{ja,en,th,zh,zh-TW,es}.json` — 全6言語を揃えて編集。
   - 連絡先（電話/メール/LINE/住所/営業時間）は `contact.info` セクション。
2. **JSON-LD（検索エンジン向け）**: `src/components/seo/OrganizationSchema.tsx`
   - 電話・住所・営業時間などの構造化データを messages と一致させる。
3. **チャットボット知識ベース**: `src/lib/chat/knowledge.ts`
   - 「MIRAI AIサポート」の回答精度に直結。サービス・料金・会社情報の記述を最新化する。

該当する場合のみ:
- 事例データ: `src/data/cases.ts`
- 料金・サービスがブログ記事で言及されていれば `content/blog/**` も確認。

## 検証
1. `npm run typecheck && npm run lint && npm run build`
2. i18n-checker サブエージェントで 6言語 JSON のキー整合を確認。
3. dev サーバで /contact と該当ページを目視確認。チャットボットが更新後の情報で答えるかは knowledge.ts の記述を読み合わせで確認（APIキーなしローカルではフォールバック応答になるため）。
