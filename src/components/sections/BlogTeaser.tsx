"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";
import type { BlogPost } from "@/lib/blog";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BlogTeaser({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations("home.blog");
  const b = useTranslations("blog");

  if (posts.length === 0) return null;

  return (
    <section className="bg-surface-alt py-14 md:py-32">
      <div className="mb-wrap">
        {/* asymmetric header: title left, view-all link right */}
        <div className="mb-grid items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="mb-kicker">{t("eyebrow")}</p>
            <h2 className="mb-optical typo-h2 mt-6">{t("title")}</h2>
          </div>
          <div className="col-span-12 mt-6 md:col-span-3 md:col-start-10 md:mt-0 md:flex md:justify-end">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-[color:var(--color-accent)] uppercase"
            >
              {t("viewAll")}
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <ul className="mt-12 mb-grid md:mt-16">
          {posts.map((post, index) => (
            <motion.li
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.08 }}
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
                    <span>{b(`categories.${post.category}`)}</span>
                    <span aria-hidden className="block h-px w-8 bg-[color:var(--color-accent)]/40" />
                    <time dateTime={post.publishedAt} className="text-[color:var(--color-muted)]">
                      {post.publishedAt}
                    </time>
                  </div>
                  <h3 className="typo-h3 mt-6">{post.title}</h3>
                  <p className="typo-body mt-4 text-[color:var(--color-muted)]">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-8 text-xs text-[color:var(--color-muted)]">
                    <span>
                      {post.readTime} {b("minRead")}
                    </span>
                    <span className="flex items-center gap-2 font-semibold tracking-[0.24em] text-[color:var(--color-accent)] uppercase">
                      {b("readMore")}
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
      </div>
    </section>
  );
}
