import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";

import { CtaSection } from "@/components/sections/CtaSection";
import { Link } from "@/lib/i18n/navigation";
import {
  getAllBlogParams,
  getBlogPost,
  type BlogPost,
} from "@/lib/blog";
import { type Locale } from "@/lib/i18n/routing";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return getAllBlogParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(locale as Locale, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getBlogPost(locale as Locale, slug);
  if (!post) notFound();

  return (
    <>
      <BlogArticle post={post} />
      <CtaSection />
    </>
  );
}

function BlogArticle({ post }: { post: BlogPost }) {
  const t = useTranslations("blog");
  const common = useTranslations("common");

  return (
    <article className="relative isolate bg-background pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="mx-auto w-full max-w-(--container-content) px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-[color:var(--color-muted)] uppercase transition-colors duration-300 hover:text-[color:var(--color-accent)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {common("back")}
        </Link>

        <div className="mt-10 flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-[color:var(--color-accent)] uppercase">
          <span>{t(`categories.${post.category}`)}</span>
          <span aria-hidden className="block h-px w-8 bg-[color:var(--color-accent)]/40" />
          <time dateTime={post.publishedAt} className="text-[color:var(--color-muted)]">
            {post.publishedAt}
          </time>
          <span aria-hidden className="block h-px w-3 bg-[color:var(--color-border)]" />
          <span className="text-[color:var(--color-muted)]">
            {post.readTime} {t("minRead")}
          </span>
        </div>

        <h1 className="typo-h1 mt-7 whitespace-pre-line">{post.title}</h1>
        <p className="typo-body-lg mt-7 max-w-2xl text-[color:var(--color-muted)]">
          {post.excerpt}
        </p>

        {post.coverImage ? (
          <div className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-3xl">
            <Image
              src={post.coverImage}
              alt=""
              fill
              sizes="(max-width: 1140px) 100vw, 1140px"
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        <div className="prose mt-14 max-w-none [&_a]:text-[color:var(--color-accent)] [&_a:hover]:underline [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight md:[&_h2]:text-3xl [&_h3]:mt-10 [&_h3]:text-xl [&_h3]:font-bold [&_p]:mt-5 [&_p]:text-base [&_p]:leading-[1.95] [&_p]:text-foreground md:[&_p]:text-lg [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul_li]:mt-2 [&_strong]:font-bold [&_hr]:my-12 [&_hr]:border-[color:var(--color-border)]">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
}
