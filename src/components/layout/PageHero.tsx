"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  watermark = true,
  rightSlot,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumb: BreadcrumbItem[];
  watermark?: boolean;
  rightSlot?: ReactNode;
}) {
  const hasRight = Boolean(rightSlot);

  return (
    <section className="relative isolate overflow-hidden bg-background pt-4 pb-12 md:pt-16 md:pb-24">
      {watermark && !hasRight ? (
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 -right-20 -z-10 -translate-y-1/2 opacity-[0.05]"
        >
          <Image
            src="/assets/logo/Logo_MIRAI_BizLab2.jpg"
            alt=""
            width={520}
            height={560}
            className="h-[420px] w-auto md:h-[600px]"
          />
        </div>
      ) : null}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 -z-10 h-[400px] w-[400px] rounded-full bg-[color:var(--color-accent)]/8 blur-[120px]"
      />

      <div className="relative mb-wrap">
        <Breadcrumb items={breadcrumb} />
        <div
          className={
            hasRight
              ? "mt-2 mb-grid items-center"
              : ""
          }
        >
          <div className={hasRight ? "col-span-12 md:col-span-7" : ""}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-kicker mt-6 md:mt-10"
            >
              {eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
              className="mb-optical typo-h1 mt-7 whitespace-pre-line"
            >
              {title}
            </motion.h1>
            {description ? (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
                className="typo-body-lg mt-7 max-w-2xl text-[color:var(--color-muted)]"
              >
                {description}
              </motion.p>
            ) : null}
          </div>

          {hasRight ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
              className="col-span-12 hidden items-center justify-center md:col-span-5 md:flex"
            >
              {rightSlot}
            </motion.div>
          ) : null}
        </div>

        {hasRight ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
            className="mt-12 flex items-center justify-center md:hidden"
          >
            {rightSlot}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
