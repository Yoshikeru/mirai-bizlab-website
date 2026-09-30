import Image from "next/image";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Human moment on the home page: the founder's closing line from the
 * "代表挨拶" as an oversized pull quote (copy comes from about.message, so it
 * is already translated in all six locales).
 */
export function FounderNote() {
  const t = useTranslations("about.message");
  const nav = useTranslations("nav");
  const body = t.raw("body") as string[];
  const quote = body[body.length - 1];

  return (
    <section className="bg-surface-alt py-16 md:py-32" aria-label={t("title")}>
      <div className="mb-wrap">
        <div className="mb-grid items-center gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <Reveal y={24} duration={0.8}>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-surface ring-1 ring-[color:var(--color-border)] md:max-w-none">
                <Image
                  src="/assets/photos/founder.jpg"
                  alt={t("name")}
                  fill
                  sizes="(min-width: 768px) 30vw, 80vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 via-black/35 to-transparent"
                />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
                  <div>
                    <p className="text-base font-bold tracking-tight">
                      {t("name")}
                    </p>
                    <p className="mt-1 text-xs text-white/75">{t("role")}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <Reveal y={16} duration={0.6}>
              <p className="mb-kicker">{t("eyebrow")}</p>
            </Reveal>
            <Reveal y={28} duration={0.85} delay={0.06}>
              <blockquote className="mt-8">
                <span
                  aria-hidden
                  className="mb-numeral block text-[6rem] leading-[0.6] text-[color:var(--color-accent)] md:text-[9rem]"
                >
                  “
                </span>
                <p className="mb-optical mt-4 text-[clamp(1.5rem,3.3vw,3rem)] leading-[1.35] font-bold tracking-tight">
                  {quote}
                </p>
              </blockquote>
            </Reveal>
            <Reveal y={16} duration={0.7} delay={0.14}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button href="/about" variant="secondary">
                  {nav("about")}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
