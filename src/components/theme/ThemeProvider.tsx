"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Wraps next-themes. `attribute="class"` toggles `.dark` on <html>, which our
 * CSS-variable tokens (globals.css) key off. `disableTransitionOnChange` keeps
 * the switch instant rather than animating every color at once.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
