'use client';

import { useState, useCallback, useMemo } from 'react';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChatBot from '@/components/chat/AIChatBot';
import { I18nContext, Locale, getTranslation } from '@/lib/i18n';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>('ja');

  const t = useMemo(() => getTranslation(locale), [locale]);

  const handleSetLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
  }, []);

  const contextValue = useMemo(
    () => ({ locale, setLocale: handleSetLocale, t }),
    [locale, handleSetLocale, t]
  );

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <title>MIRAI BizLab Co., Ltd. | バンコクの経理代行・AI導入支援</title>
        <meta
          name="description"
          content="バンコクを拠点に日系企業の経理代行、社内DX、AIトレーニングを提供するMIRAI BizLab Co., Ltd.の公式サイト"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <I18nContext.Provider value={contextValue}>
          <Header />
          <main>{children}</main>
          <Footer />
          <AIChatBot />
        </I18nContext.Provider>
      </body>
    </html>
  );
}
