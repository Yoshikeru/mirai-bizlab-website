import type { Metadata } from "next";
import {
  Inter,
  Inter_Tight,
  Noto_Sans_JP,
  Noto_Sans_Thai,
  Space_Mono,
} from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ChatWidget } from "@/components/chat/ChatWidget";
import { GridOverlay } from "@/components/grid/GridOverlay";
import { OpticalAlign } from "@/components/grid/OpticalAlign";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { routing, type Locale } from "@/lib/i18n/routing";
import { buildAlternates } from "@/lib/seo/alternates";
import "@/styles/globals.css";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.miraibizlab.co.th"
).replace(/\/$/, "");

const OG_LOCALES: Record<Locale, string> = {
  ja: "ja_JP",
  en: "en_US",
  th: "th_TH",
};

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter-tight",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans-thai",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const site = await getTranslations({ locale, namespace: "site" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: site("name"),
      template: `%s | ${site("name")}`,
    },
    description: site("tagline"),
    openGraph: {
      type: "website",
      siteName: site("name"),
      locale: OG_LOCALES[locale as Locale] ?? OG_LOCALES.ja,
      title: site("name"),
      description: site("tagline"),
      url: `/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: site("name"),
      description: site("tagline"),
    },
    alternates: buildAlternates(locale as Locale, "/"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${notoSansJp.variable} ${inter.variable} ${interTight.variable} ${notoSansThai.variable} ${spaceMono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[100] focus-visible:rounded-full focus-visible:bg-foreground focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
        >
          Skip to main content
        </a>
        <OrganizationSchema />
        <ThemeProvider>
          <NextIntlClientProvider>
            <LenisProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main id="main" className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </LenisProvider>
            <ChatWidget />
            <OpticalAlign />
            <GridOverlay />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
