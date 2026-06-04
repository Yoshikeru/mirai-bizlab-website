"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { CASE_IMAGES, CASE_SLUGS } from "@/data/cases";

type CaseItem = {
  industry: string;
  scale: string;
  title: string;
  summary: string;
};

export function CasesGrid() {
  const t = useTranslations("cases");
  const home = useTranslations("home.cases");
  const items = home.raw("items") as CaseItem[];

  const [filter, setFilter] = useState<string>("__all__");
  const [open, setOpen] = useState<number | null>(null);

  const industries = useMemo(() => {
    const seen = new Set<string>();
    items.forEach((item) => seen.add(item.industry));
    return ["__all__", ...Array.from(seen)];
  }, [items]);

  const filtered = useMemo(() => {
    if (filter === "__all__") return items.map((item, index) => ({ item, index }));
    return items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.industry === filter);
  }, [items, filter]);

  useEffect(() => {
    if (open === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const activeItem = open !== null ? items[open] : null;

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto w-full max-w-(--container-wide) px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-semibold tracking-[0.28em] text-[color:var(--color-muted)] uppercase">
            {t("filter.label")}
          </p>
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => {
              const isActive = filter === industry;
              const label =
                industry === "__all__" ? t("filter.all") : industry;
              return (
                <button
                  key={industry}
                  type="button"
                  onClick={() => setFilter(industry)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[color:var(--color-accent)] text-white"
                      : "border border-[color:var(--color-border)] text-foreground hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-24 text-center text-base text-[color:var(--color-muted)]">
            {t("empty")}
          </p>
        ) : (
          <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(({ item, index }, gridIndex) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (gridIndex % 3) * 0.08,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(index)}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-surface text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-[color:var(--color-accent)]/25 hover:shadow-[0_36px_70px_-36px_rgba(215,0,15,0.25)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={CASE_IMAGES[CASE_SLUGS[index]]}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-semibold tracking-[0.28em] text-[color:var(--color-accent)] uppercase">
                      {item.industry}
                    </span>
                    <span
                      aria-hidden
                      className="block h-px w-8 bg-[color:var(--color-accent)]/50"
                    />
                    <span className="text-xs text-[color:var(--color-muted)]">
                      {item.scale}
                    </span>
                  </div>
                  <h3 className="typo-h3 mt-6">{item.title}</h3>
                  <p className="typo-body mt-4 text-[color:var(--color-muted)]">
                    {item.summary}
                  </p>
                  <div className="mt-auto flex items-center gap-2 pt-8 text-xs font-semibold tracking-[0.24em] text-[color:var(--color-accent)] uppercase">
                    <span>View</span>
                    <span
                      aria-hidden
                      className="block h-px w-8 bg-[color:var(--color-accent)] transition-[width] duration-500 group-hover:w-14"
                    />
                  </div>
                  </div>
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/55 p-4 backdrop-blur-sm md:p-8"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-surface shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-surface/90 backdrop-blur-sm transition-all duration-200 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
              >
                <X className="h-4 w-4" />
              </button>
              {open !== null ? (
                <div className="relative aspect-[21/9] w-full overflow-hidden">
                  <Image
                    src={CASE_IMAGES[CASE_SLUGS[open]]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                    priority
                  />
                </div>
              ) : null}
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold tracking-[0.28em] text-[color:var(--color-accent)] uppercase">
                    {activeItem.industry}
                  </span>
                  <span
                    aria-hidden
                    className="block h-px w-8 bg-[color:var(--color-accent)]/50"
                  />
                  <span className="text-xs text-[color:var(--color-muted)]">
                    {activeItem.scale}
                  </span>
                </div>
                <h2 className="mt-5 text-2xl leading-snug font-bold tracking-tight md:text-4xl">
                  {activeItem.title}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-[color:var(--color-muted)] md:text-lg">
                  {activeItem.summary}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
