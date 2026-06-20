"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  features: string[];
  cta: string;
};

export function PricingPlans() {
  const t = useTranslations("pricing");
  const plans = t.raw("plans") as Plan[];

  return (
    <section className="bg-background py-14 md:py-32">
      <div className="mb-wrap">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center text-sm text-[color:var(--color-muted)]"
        >
          {t("note")}
        </motion.p>

        <div className="mt-14 mb-grid md:mt-16 md:items-end">
          {plans.map((plan, index) => {
            const recommended = index === 1;
            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px 0px" }}
                transition={{
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.12,
                }}
                className={`col-span-12 md:col-span-4 relative flex flex-col rounded-3xl p-8 md:p-10 ${
                  recommended
                    ? "border border-[color:var(--color-accent)] bg-contrast text-white shadow-[0_40px_80px_-40px_rgba(215,0,15,0.45)] md:py-12 lg:py-14"
                    : "border border-[color:var(--color-border)] bg-surface text-foreground"
                }`}
              >
                {recommended ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[color:var(--color-accent)] px-4 py-1 text-[10px] font-bold tracking-[0.32em] text-white uppercase">
                    {t("recommended")}
                  </div>
                ) : null}

                <p
                  className={`text-xs font-semibold tracking-[0.28em] uppercase ${
                    recommended
                      ? "text-[color:var(--color-accent)]"
                      : "text-[color:var(--color-muted)]"
                  }`}
                >
                  {plan.tagline}
                </p>
                <h3
                  className={`typo-h2 mt-4 ${
                    recommended ? "text-white" : "text-foreground"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-7 text-2xl font-bold tracking-tight md:text-3xl ${
                    recommended ? "text-white" : "text-foreground"
                  }`}
                >
                  {plan.price}
                </p>

                <ul className="mt-8 space-y-3.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className={`mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                          recommended
                            ? "bg-[color:var(--color-accent)]/25"
                            : "bg-[color:var(--color-accent)]/12"
                        }`}
                      >
                        <Check className="h-3 w-3 text-[color:var(--color-accent)]" />
                      </span>
                      <span
                        className={`text-sm leading-relaxed ${
                          recommended
                            ? "text-white/85"
                            : "text-[color:var(--color-muted)]"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Button
                    href="/contact"
                    variant={recommended ? "primary" : "secondary"}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
