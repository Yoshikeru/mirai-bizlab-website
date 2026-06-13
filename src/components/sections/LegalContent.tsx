"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

type Section = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export function LegalContent() {
  const t = useTranslations("privacy");
  const intro = t.raw("intro") as string[];
  const controllerLines = t.raw("controller.lines") as string[];
  const sections = t.raw("sections") as Section[];

  return (
    <section className="bg-background py-14 md:py-28">
      <div className="mx-auto w-full max-w-(--container-content) px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="typo-caption">{t("updated")}</p>

          <div className="mt-8 space-y-6 text-foreground">
            {intro.map((para, index) => (
              <p key={index} className="typo-body-lg">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[color:var(--color-border)] bg-surface-alt p-6 md:p-8">
            <p className="text-xs font-semibold tracking-[0.18em] text-[color:var(--color-muted)] uppercase">
              {t("controller.heading")}
            </p>
            <div className="mt-4 space-y-1.5 text-sm leading-relaxed text-foreground md:text-base">
              {controllerLines.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-14 max-w-3xl space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: Math.min(index, 4) * 0.04,
              }}
            >
              <h2 className="text-xl font-bold tracking-tight md:text-2xl">
                <span className="text-[color:var(--color-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="ml-3">{section.heading}</span>
              </h2>
              {section.paragraphs?.map((para, pIndex) => (
                <p
                  key={pIndex}
                  className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted)] md:text-base"
                >
                  {para}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {section.bullets.map((bullet, bIndex) => (
                    <li
                      key={bIndex}
                      className="flex gap-3 text-sm leading-relaxed text-[color:var(--color-muted)] md:text-base"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--color-accent)]"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
