"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/**
 * Light/dark toggle. Renders a stable icon until mounted to avoid a hydration
 * mismatch (the resolved theme is only known on the client).
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const t = useTranslations("theme");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        !mounted ? t("toggle") : isDark ? t("toLight") : t("toDark")
      }
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] text-foreground transition-colors duration-200 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px]" aria-hidden />
      ) : (
        <Moon className="h-[18px] w-[18px]" aria-hidden />
      )}
    </button>
  );
}
