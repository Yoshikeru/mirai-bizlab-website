"use client";

import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type Reason = { title: string; description: string };

export function WhyMirai() {
  const t = useTranslations("home.why");
  const reasons = t.raw("reasons") as Reason[];
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-(--container-wide) grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-16">
        <aside className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="typo-eyebrow"
            >
              {t("eyebrow")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.08,
              }}
              className="typo-h2 mt-6 whitespace-pre-line"
            >
              {t("title")}
            </motion.h2>

            <ul className="mt-10 flex flex-col gap-3">
              {reasons.map((reason, index) => {
                const isActive = active === index;
                return (
                  <li key={reason.title}>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      className="group flex w-full items-center gap-4 text-left"
                      aria-current={isActive}
                    >
                      <span
                        className={`block h-px transition-all duration-500 ${
                          isActive
                            ? "w-12 bg-[color:var(--color-accent)]"
                            : "w-5 bg-[color:var(--color-border)] group-hover:w-8"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium transition-colors duration-500 ${
                          isActive
                            ? "text-foreground"
                            : "text-[color:var(--color-muted)]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")} · {reason.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <div className="md:col-span-7">
          <ol className="flex flex-col gap-16 md:gap-24">
            {reasons.map((reason, index) => (
              <ReasonItem
                key={reason.title}
                reason={reason}
                index={index}
                onEnter={() => setActive(index)}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ReasonItem({
  reason,
  index,
  onEnter,
}: {
  reason: Reason;
  index: number;
  onEnter: () => void;
}) {
  const ref = useRef<HTMLLIElement | null>(null);
  const inView = useInView(ref, { margin: "-45% 0% -45% 0%" });

  useEffect(() => {
    if (inView) onEnter();
  }, [inView, onEnter]);

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-8 md:pl-12"
    >
      <span
        aria-hidden
        className="absolute top-2 left-0 text-xs font-mono tracking-widest text-[color:var(--color-accent)]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="typo-h3">{reason.title}</h3>
      <p className="typo-body-lg mt-5 text-[color:var(--color-muted)]">
        {reason.description}
      </p>
    </motion.li>
  );
}
