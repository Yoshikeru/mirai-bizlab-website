import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  folio,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverted";
  /** Optional mono register (e.g. "(01 — 05)") shown right-aligned on a hairline. */
  folio?: string;
}) {
  const titleColor = tone === "inverted" ? "text-white" : "text-foreground";
  const descColor =
    tone === "inverted" ? "text-white/70" : "text-[color:var(--color-muted)]";

  const head = (
    <div className={`flex flex-col gap-6 ${align === "center" ? "items-center text-center" : ""}`}>
      <Reveal y={16} duration={0.6}>
        <p className="mb-kicker">{eyebrow}</p>
      </Reveal>
      <Reveal y={24} duration={0.7} delay={0.05}>
        <h2
          className={`typo-h2 whitespace-pre-line ${align === "left" ? "mb-optical" : ""} ${titleColor}`}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal y={20} duration={0.7} delay={0.1}>
          <p className={`typo-body-lg max-w-2xl ${descColor}`}>{description}</p>
        </Reveal>
      ) : null}
    </div>
  );

  // Editorial register: title left, mono folio on a hairline at the right.
  if (folio && align !== "center") {
    return (
      <div className="mb-grid items-end">
        <div className="col-span-12 md:col-span-8">{head}</div>
        <div className="col-span-12 mt-6 md:col-span-3 md:col-start-10 md:mt-0">
          <Reveal y={16} duration={0.6} delay={0.1}>
            <div className="flex items-center gap-3 md:flex-col md:items-end md:gap-2">
              <span
                aria-hidden
                className="h-px w-10 bg-[color:var(--color-accent)] md:w-full"
              />
              <span className="mb-folio whitespace-nowrap text-[color:var(--color-muted)]">
                {folio}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  return head;
}
