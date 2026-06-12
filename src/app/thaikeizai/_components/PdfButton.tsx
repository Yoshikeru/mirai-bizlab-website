'use client';

export default function PdfButton() {
  return (
    <button
      onClick={() => alert('（デモ）本日のPDFニュースレターのダウンロードが開始されます。\n本番では会員ログインに紐づくPDFが自動で配信されます。')}
      className="rounded-md bg-tk-gold px-5 py-2.5 text-sm font-semibold text-tk-navy transition-colors hover:bg-tk-gold-light"
    >
      📄 本日のPDFをダウンロード
    </button>
  );
}
