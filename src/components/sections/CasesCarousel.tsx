"use client";

import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { CASE_IMAGES, CASE_SLUGS } from "@/data/cases";

type CaseItem = {
  industry: string;
  scale: string;
  title: string;
  summary: string;
};

type EmblaApi = NonNullable<UseEmblaCarouselType[1]>;

export function CasesCarousel() {
  const t = useTranslations("home.cases");
  const items = t.raw("items") as CaseItem[];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback((api: EmblaApi) => {
    setSelectedIndex(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-[#F5F5F5] py-24 md:py-32">
      <div className="mx-auto w-full max-w-(--container-wide) px-6">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-14 md:mt-20">
          <div ref={emblaRef} className="overflow-hidden">
            <ul className="flex gap-6 md:gap-8">
              {items.map((item, index) => (
                <li
                  key={item.title}
                  className="relative flex shrink-0 basis-[86%] flex-col overflow-hidden rounded-3xl bg-white transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.18)] sm:basis-[72%] md:basis-[58%] lg:basis-[44%]"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={CASE_IMAGES[CASE_SLUGS[index]]}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 86vw, 44vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7 md:p-10 lg:p-12">
                  <div className="flex items-center gap-3">
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
                  <h3 className="typo-h3 mt-8">{item.title}</h3>
                  <p className="typo-body mt-5 text-[color:var(--color-muted)]">
                    {item.summary}
                  </p>
                  <div className="mt-auto flex items-end justify-between pt-10">
                    <span className="font-mono text-[11px] tracking-[0.3em] text-[color:var(--color-muted)] uppercase">
                      Case {String(index + 1).padStart(2, "0")} /{" "}
                      {String(items.length).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className="block h-[2px] w-12 bg-[color:var(--color-accent)]"
                    />
                  </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {snaps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-[2px] transition-all duration-500 ${
                    selectedIndex === index
                      ? "w-12 bg-[color:var(--color-accent)]"
                      : "w-6 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canPrev}
                aria-label="Previous case"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-background text-foreground transition-all duration-300 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canNext}
                aria-label="Next case"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-background text-foreground transition-all duration-300 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
