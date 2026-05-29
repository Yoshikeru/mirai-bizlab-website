import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverted";
}) {
  const titleColor = tone === "inverted" ? "text-white" : "text-foreground";
  const descColor =
    tone === "inverted"
      ? "text-white/70"
      : "text-[color:var(--color-muted)]";

  return (
    <div
      className={`flex flex-col gap-6 ${align === "center" ? "items-center text-center" : ""}`}
    >
      <Reveal y={16} duration={0.6}>
        <p className="typo-eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal y={24} duration={0.7} delay={0.05}>
        <h2 className={`typo-h2 whitespace-pre-line ${titleColor}`}>
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal y={20} duration={0.7} delay={0.1}>
          <p className={`typo-body-lg max-w-2xl ${descColor}`}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
