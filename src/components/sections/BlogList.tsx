"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { Link } from "@/lib/i18n/navigation";
import type { BlogPost } from "@/lib/blog";

const CATEGORY_KEYS = ["accounting", "legal", "expansion", "trends"] as const;

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations("blog");
  const [category, setCategory] = useState<string>("__all__");

  const filtered = useMemo(() => {
    if (category === "__all__") return posts;
    return posts.filter((post) => post.category === category);
  }, [posts, category]);

  return (
    <section className="bg-background py-14 md:py-32">
      <div className="mb-wrap">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-semibold tracking-[0.28em] text-[color:var(--color-muted)] uppercase">
            {t("filter.label")}
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterButton
              isActive={category === "__all__"}
              onClick={() => setCategory("__all__")}
            >
              {t("filter.all")}
            </FilterButton>
            {CATEGORY_KEYS.map((key) => (
              <FilterButton
                key={key}
                isActive={category === key}
                onClick={() => setCategory(key)}
              >
                {t(`categories.${key}`)}
              </FilterButton>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-24 text-center text-base text-[color:var(--color-muted)]">
            {t("empty")}
          </p>
        ) : (
          <ul className="mt-14 mb-grid">
            {filtered.map((post, index) => (
              <motion.li
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (index % 3) * 0.08,
                }}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-surface transition-all duration-500 hover:-translate-y-1.5 hover:border-[color:var(--color-accent)]/25 hover:shadow-card-hover"
                >
                  {post.coverImage ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-[color:var(--color-accent)] uppercase">
                    <span>{t(`categories.${post.category}`)}</span>
                    <span
                      aria-hidden
                      className="block h-px w-8 bg-[color:var(--color-accent)]/40"
                    />
                    <time
                      dateTime={post.publishedAt}
                      className="text-[color:var(--color-muted)]"
                    >
                      {post.publishedAt}
                    </time>
                  </div>
                  <h3 className="typo-h3 mt-6">{post.title}</h3>
                  <p className="typo-body mt-4 text-[color:var(--color-muted)]">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-8 text-xs text-[color:var(--color-muted)]">
                    <span>
                      {post.readTime} {t("minRead")}
                    </span>
                    <span className="flex items-center gap-2 font-semibold tracking-[0.24em] text-[color:var(--color-accent)] uppercase">
                      {t("readMore")}
                      <span
                        aria-hidden
                        className="block h-px w-8 bg-[color:var(--color-accent)] transition-[width] duration-500 group-hover:w-14"
                      />
                    </span>
                  </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function FilterButton({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
        isActive
          ? "bg-[color:var(--color-accent)] text-white"
          : "border border-[color:var(--color-border)] text-foreground hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
      }`}
    >
      {children}
    </button>
  );
}
