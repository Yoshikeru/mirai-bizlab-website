---
name: deploy
description: MIRAI BizLab サイトを本番デプロイする手順。「デプロイして」「公開して」「本番に反映して」「push して」等の依頼で必ず使用。品質チェック→コミット→push→本番確認までの一連。
---

# 本番デプロイ手順

本番は **Vercel の GitHub 自動連携**。`main` に push すると自動で本番デプロイされる（他ブランチはプレビュー）。

## 1. 品質チェック（必須・この順で）
```bash
npm run typecheck && npm run lint && npm run build
```
- husky の pre-commit（typecheck+lint）/ pre-push（build）でも強制されるが、push 直前に失敗して手戻りしないよう先に通す。

## 2. コミット & push
```bash
git add <対象>          # 意味単位で
git commit -m "feat(scope): 日本語の説明"   # conventional commits
git push origin HEAD
```
- main への push = 本番反映。**push 前にユーザーの明示的な了承があること**。

## 3. 本番反映の確認（デプロイは概ね1〜2分）
```bash
curl -s -o /dev/null -w "%{http_code}" https://www.miraibizlab.co.th/ja
# 変更内容に応じて該当ページの HTML を curl で確認
curl -sL https://www.miraibizlab.co.th/ja/<変更したパス> | grep -o "<期待する文言>"
```
- 反映が確認できたら、確認した URL と結果を添えて完了報告する。
- 反映されない場合: 2〜3分待って再確認 → それでもダメなら Vercel のビルドログ確認をユーザーに提案。
