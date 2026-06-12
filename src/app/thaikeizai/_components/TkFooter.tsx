import Link from 'next/link';

export default function TkFooter() {
  return (
    <footer className="mt-16 border-t border-tk-navy/10 bg-tk-navy text-white/70">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-serif text-lg font-bold text-white">週刊タイ経済</p>
            <p className="mt-1 text-xs text-white/55">1997年タイで創刊の邦字経済紙（デジタル化プロトタイプ）</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/thaikeizai" className="hover:text-tk-gold-light">ホーム</Link>
            <Link href="/thaikeizai/pricing" className="hover:text-tk-gold-light">料金プラン</Link>
            <Link href="/thaikeizai/login" className="hover:text-tk-gold-light">ログイン</Link>
            <Link href="/thaikeizai/account" className="hover:text-tk-gold-light">マイページ</Link>
          </nav>
        </div>
        <p className="mt-8 border-t border-white/10 pt-5 text-[11px] leading-relaxed text-white/45">
          ⚠️ これは MIRAI BizLab が制作したデジタル化フェーズ1のプロトタイプです。記事はデモ用の架空コンテンツで、決済は実際には行われません。
        </p>
      </div>
    </footer>
  );
}
