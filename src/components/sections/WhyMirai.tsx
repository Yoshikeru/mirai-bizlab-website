import { useTranslations } from "next-intl";

import { Reveal } from "@/components/motion/Reveal";

type Reason = { title: string; description: string };

/**
 * Full-width editorial spread: one oversized headline, then the four reasons
 * as wide rows (number / statement / explanation). A red rule wipes across a
 * row on hover.
 */
export function WhyMirai() {
  const t = useTranslations("home.why");
  const reasons = t.raw("reasons") as Reason[];

  return (
    <section className="relative bg-background py-16 md:py-36">
      <div className="mb-wrap">
        <Reveal y={16} duration={0.6}>
          <p className="mb-kicker">{t("eyebrow")}</p>
        </Reveal>
        <Reveal y={40} duration={0.95} delay={0.05}>
          <h2 className="mb-optical mb-numeral mt-8 whitespace-pre-line text-[clamp(3.25rem,10.5vw,10rem)] !leading-[1.02]">
            {t("title")}
          </h2>
        </Reveal>

        <ol className="mt-16 md:mt-28">
          {reasons.map((reason, index) => (
            <li key={reason.title}>
              <Reveal y={28} duration={0.8}>
                <div className="group relative grid grid-cols-12 gap-x-6 gap-y-4 border-t border-[color:var(--color-border)] py-9 transition-colors duration-500 hover:bg-[color:var(--color-accent-soft)]/40 md:py-14">
                  <span
                    aria-hidden
                    className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--color-accent)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  />
                  <span className="mb-folio col-span-12 pt-2 text-[color:var(--color-accent)] md:col-span-1 md:text-[0.8125rem]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-phrase col-span-12 text-[clamp(1.6rem,3.4vw,3.1rem)] leading-[1.2] font-extrabold tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:col-span-6 md:col-start-2">
                    {reason.title}
                  </h3>
                  <p className="typo-body-lg col-span-12 max-w-xl text-[color:var(--color-muted)] md:col-span-4 md:col-start-9 md:pt-2">
                    {reason.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
          <li aria-hidden className="border-t border-[color:var(--color-border)]" />
        </ol>
      </div>
    </section>
  );
}
