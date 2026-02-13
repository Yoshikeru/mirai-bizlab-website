import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `あなたはMIRAI BizLab Co., Ltd.のAIアシスタントです。
バンコクを拠点に日系企業向けのサービスを提供している会社のアシスタントとして、
丁寧かつプロフェッショナルに対応してください。

## 会社概要
- 会社名: MIRAI BizLab Co., Ltd.
- 設立: 2018年6月13日
- 代表者: 吉田 拓郎 (Takuro Yoshida)
- 所在地: 954/1724 The Metropolis Building, 3rd Floor, Room No. M3, Moo. 9, Thepharak, Muang Samutprakarn, Samutprakarn 10270
- 電話: 02-088-8539
- 資本金: 2,000,000 THB

## 事業内容（3つの柱）

### 1. 経理代行 (Accounting Outsourcing)
- 月次・年次の会計処理
- 給与計算・社会保険手続き
- 税務申告・VAT処理
- 収支レポート作成
- タイの法令に完全準拠
- 飲食店、ヘアサロン、オフィスなど多様な業種に対応

### 2. 社内情報のアプリ化 & AI化 (App & AI Integration)
- 散在する社内情報のアプリケーション集約
- AI技術による業務効率改善
- 紙・Excelからの脱却支援
- リアルタイム経営判断支援
- 業務アプリ開発
- データ分析基盤構築

### 3. 管理者向けパーソナルAIトレーニング (Personal AI Training)
- ChatGPT、Claude、Gemini等のAIツール活用研修
- マンツーマン指導
- プロンプト設計指導
- 業務フロー最適化
- 継続サポート

## 対応ルール
- 会社のサービスに関する質問には詳しく回答する
- 料金についての具体的な質問には「お客様の状況に合わせてお見積りいたしますので、お問い合わせフォームよりご連絡ください」と案内する
- 会社と無関係な質問には「申し訳ございませんが、弊社のサービスに関するご質問にお答えしています」と丁寧に断る
- ユーザーの言語に合わせて回答する（日本語、英語、タイ語に対応）`;

export async function POST(req: NextRequest) {
  try {
    const { message, locale, history } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      // Return a helpful default response when API key is not configured
      const defaultResponses: Record<string, string> = {
        ja: 'AIアシスタントは現在セットアップ中です。サービスについてのお問い合わせは info@miraibizlab.co.th または 02-088-8539 までご連絡ください。',
        en: 'The AI assistant is currently being set up. For service inquiries, please contact info@miraibizlab.co.th or call 02-088-8539.',
        th: 'ผู้ช่วย AI กำลังตั้งค่าอยู่ สำหรับสอบถามบริการ กรุณาติดต่อ info@miraibizlab.co.th หรือโทร 02-088-8539',
      };
      return NextResponse.json({
        reply: defaultResponses[locale] || defaultResponses.ja,
      });
    }

    // Build messages array from history
    const messages: { role: 'user' | 'assistant'; content: string }[] = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        messages.push({
          role: msg.role,
          content: msg.content,
        });
      }
    }
    messages.push({
      role: 'user',
      content: message,
    });

    // Call Anthropic API via SDK
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    const reply =
      textBlock && 'text' in textBlock
        ? textBlock.text
        : 'Sorry, I could not generate a response.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      reply:
        '申し訳ございません。一時的にエラーが発生しました。しばらくしてからお試しいただくか、info@miraibizlab.co.th までお問い合わせください。',
    });
  }
}
