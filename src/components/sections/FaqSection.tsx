"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

type QA = { q: string; a: string };

export function FaqSection() {
  const t = useTranslations("home.faq");
  const items = t.raw("items") as QA[];

  if (!items?.length) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className="bg-background py-14 md:py-32" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mb-wrap">
        <div className="mb-grid items-end">
          <div className="col-span-12 md:col-span-7">
            <p className="mb-kicker">{t("eyebrow")}</p>
            <h2 id="faq-heading" className="mb-optical typo-h2 mt-6">
              {t("title")}
            </h2>
          </div>
        </div>

        <ul className="mt-10 md:mt-16 md:col-span-10">
          {items.map((it) => (
            <li
              key={it.q}
              className="border-t border-[color:var(--color-border)] last:border-b"
            >
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="typo-h3 text-base md:text-lg">{it.q}</span>
                  <Plus
                    aria-hidden
                    className="h-5 w-5 flex-none text-[color:var(--color-accent)] transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <p className="typo-body max-w-2xl pr-10 pb-6 text-[color:var(--color-muted)]">
                  {it.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
