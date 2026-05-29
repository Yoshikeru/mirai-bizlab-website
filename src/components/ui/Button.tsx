import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { Link } from "@/lib/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost-light";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-accent)] text-white hover:bg-[#bb000d] focus-visible:ring-[color:var(--color-accent)]",
  secondary:
    "bg-foreground text-background hover:bg-[#0f0f0f] focus-visible:ring-foreground",
  "ghost-light":
    "border border-white/40 text-white hover:bg-white/10 focus-visible:ring-white",
};

const BASE =
  "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Button({
  href,
  children,
  variant = "primary",
  withArrow = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${BASE} ${VARIANT_CLASSES[variant]} ${className}`}
    >
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      ) : null}
    </Link>
  );
}
