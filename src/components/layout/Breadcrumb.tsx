import { ChevronRight } from "lucide-react";

import { Link } from "@/lib/i18n/navigation";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-[color:var(--color-muted)]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? (
              <ChevronRight aria-hidden className="h-3 w-3 text-[color:var(--color-muted)]/60" />
            ) : null}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors duration-200 hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
