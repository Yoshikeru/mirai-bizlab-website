"use client";

import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

type ServiceItem = {
  id: string;
  index: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  deliverables: string[];
  pricing: string;
};

export function ServicesDetail() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto w-full max-w-(--container-wide) px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-28">
              <p className="text-xs font-semibold tracking-[0.32em] text-[color:var(--color-muted)] uppercase">
                {t("nav")}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {items.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="group flex items-center gap-3"
                        aria-current={isActive}
                      >
                        <span
                          className={`block h-px transition-all duration-500 ${
                            isActive
                              ? "w-10 bg-[color:var(--color-accent)]"
                              : "w-4 bg-[color:var(--color-border)] group-hover:w-7"
                          }`}
                        />
                        <span
                          className={`font-mono text-xs ${
                            isActive
                              ? "text-[color:var(--color-accent)]"
                              : "text-[color:var(--color-muted)]"
                          }`}
                        >
                          {item.index}
                        </span>
                        <span
                          className={`text-sm font-medium transition-colors duration-300 ${
                            isActive
                              ? "text-foreground"
                              : "text-[color:var(--color-muted)] group-hover:text-foreground"
                          }`}
                        >
                          {item.title}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <div className="flex flex-col gap-28 md:col-span-9 md:gap-36">
            {items.map((item) => (
              <ServiceBlock
                key={item.id}
                item={item}
                onEnter={() => setActive(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceBlock({
  item,
  onEnter,
}: {
  item: ServiceItem;
  onEnter: () => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { margin: "-35% 0% -55% 0%" });

  useEffect(() => {
    if (inView) onEnter();
  }, [inView, onEnter]);

  return (
    <motion.article
      ref={ref}
      id={item.id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-24"
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm tracking-[0.3em] text-[color:var(--color-accent)] uppercase">
          {item.index}
        </span>
        <span
          aria-hidden
          className="block h-px w-12 bg-[color:var(--color-accent)]"
        />
      </div>
      <h2 className="mt-6 text-3xl leading-[1.15] font-bold tracking-tight md:text-5xl">
        {item.title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-[color:var(--color-muted)] md:text-lg">
        {item.summary}
      </p>

      <dl className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <div>
          <dt className="text-xs font-semibold tracking-[0.28em] text-[color:var(--color-muted)] uppercase">
            Problem
          </dt>
          <dd className="mt-4 text-base leading-relaxed text-foreground md:text-lg">
            {item.problem}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-[0.28em] text-[color:var(--color-accent)] uppercase">
            Solution
          </dt>
          <dd className="mt-4 text-base leading-relaxed text-foreground md:text-lg">
            {item.solution}
          </dd>
        </div>
      </dl>

      <div className="mt-12 rounded-3xl border border-[color:var(--color-border)] bg-white p-8 md:p-10">
        <p className="text-xs font-semibold tracking-[0.28em] text-[color:var(--color-muted)] uppercase">
          Deliverables
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {item.deliverables.map((d, index) => (
            <li key={index} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[color:var(--color-accent)]/12"
              >
                <Check className="h-3 w-3 text-[color:var(--color-accent)]" />
              </span>
              <span className="text-sm leading-relaxed text-foreground md:text-base">
                {d}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-col gap-2 rounded-2xl border-l-4 border-[color:var(--color-accent)] bg-[color:var(--color-accent-soft)]/40 p-6 md:flex-row md:items-baseline md:gap-6 md:p-7">
        <span className="text-xs font-semibold tracking-[0.28em] text-[color:var(--color-accent)] uppercase">
          Pricing
        </span>
        <span className="text-base font-semibold tracking-tight text-foreground md:text-lg">
          {item.pricing}
        </span>
      </div>
    </motion.article>
  );
}
