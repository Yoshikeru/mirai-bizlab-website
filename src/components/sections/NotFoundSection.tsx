"use client";

import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/Button";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Tuk-tuk SVG illustration ───────────────────────────────────────────────

function TukTukIllustration() {
  const reduce = useReducedMotion();

  // Shared wheel animation (Framer Motion on SVG <g>)
  const wheelAnim = reduce
    ? {}
    : {
        animate: { rotate: 360 },
        transition: { duration: 1.6, repeat: Infinity, ease: "linear" as const },
      };

  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      {/* Floating "?" bubble */}
      <motion.div
        aria-hidden
        className="absolute -top-8 right-2 h-12 w-12 z-10"
        animate={
          reduce
            ? {}
            : { y: [0, -9, 0], scale: [1, 1.12, 1], rotate: [-4, 4, -4] }
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="24"
            cy="22"
            r="19"
            fill="var(--color-accent)"
            fillOpacity="0.12"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text
            x="24"
            y="30"
            textAnchor="middle"
            fontSize="22"
            fill="var(--color-accent)"
            fontWeight="900"
            fontFamily="system-ui,sans-serif"
          >
            ?
          </text>
          {/* tail */}
          <path
            d="M16 40 L8 47 L21 44 Z"
            fill="var(--color-accent)"
            fillOpacity="0.3"
          />
        </svg>
      </motion.div>

      {/* Tuk-tuk body — bobs up/down with gentle tilt */}
      <motion.div
        animate={
          reduce
            ? {}
            : {
                y: [0, -10, 0],
                rotate: ["-0.8deg", "0.8deg", "-0.8deg"],
              }
        }
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 230 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          aria-hidden
        >
          {/* ground shadow */}
          <ellipse
            cx="96"
            cy="132"
            rx="74"
            ry="4.5"
            fill="currentColor"
            opacity="0.08"
          />

          {/* ── Body ── */}
          <rect
            x="18"
            y="48"
            width="155"
            height="54"
            rx="10"
            fill="#FFB300"
          />

          {/* ── Roof / canopy ── */}
          <path
            d="M8 34 Q8 21 18 21 L158 21 Q172 21 173 33 L173 48 L18 48 Z"
            fill="#E69800"
          />

          {/* ── Windshield ── */}
          <rect
            x="23"
            y="24"
            width="62"
            height="20"
            rx="4"
            fill="rgba(135,206,235,0.45)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
          />

          {/* ── Driver head ── */}
          <circle cx="44" cy="33" r="8" fill="#F0C080" />
          {/* little hair */}
          <path
            d="M36 30 Q44 22 52 30"
            fill="none"
            stroke="#5a3a1a"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* ── Passenger open area ── */}
          <rect
            x="110"
            y="53"
            width="52"
            height="40"
            rx="8"
            fill="rgba(0,0,0,0.1)"
          />
          {/* curious face inside */}
          <circle cx="136" cy="68" r="7" fill="#F0C080" />
          <circle cx="133" cy="67" r="1.5" fill="#5a3a1a" />
          <circle cx="139" cy="67" r="1.5" fill="#5a3a1a" />
          <path
            d="M132 71 Q136 74 140 71"
            stroke="#5a3a1a"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* ── Decorative stripe ── */}
          <rect
            x="18"
            y="72"
            width="155"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.2)"
          />

          {/* ── Headlight glow ── */}
          <circle cx="13" cy="77" r="6.5" fill="rgba(255,255,200,0.85)" />
          <circle cx="13" cy="77" r="4" fill="rgba(255,255,230,0.95)" />

          {/* ── Front wheel ── */}
          <motion.g
            style={{ transformOrigin: "52px 117px" }}
            {...wheelAnim}
          >
            <circle cx="52" cy="117" r="16" fill="#1C1C1E" />
            <circle cx="52" cy="117" r="10.5" fill="#2a2a2a" />
            <circle cx="52" cy="117" r="4" fill="#FFB300" />
            <line
              x1="52"
              y1="101"
              x2="52"
              y2="133"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="36"
              y1="117"
              x2="68"
              y2="117"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="40.7"
              y1="106.7"
              x2="63.3"
              y2="127.3"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="63.3"
              y1="106.7"
              x2="40.7"
              y2="127.3"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.g>

          {/* ── Rear wheel ── */}
          <motion.g
            style={{ transformOrigin: "148px 117px" }}
            {...wheelAnim}
          >
            <circle cx="148" cy="117" r="16" fill="#1C1C1E" />
            <circle cx="148" cy="117" r="10.5" fill="#2a2a2a" />
            <circle cx="148" cy="117" r="4" fill="#FFB300" />
            <line
              x1="148"
              y1="101"
              x2="148"
              y2="133"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="132"
              y1="117"
              x2="164"
              y2="117"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="136.7"
              y1="106.7"
              x2="159.3"
              y2="127.3"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="159.3"
              y1="106.7"
              x2="136.7"
              y2="127.3"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.g>

          {/* ── Exhaust puffs ── */}
          <motion.g
            animate={reduce ? {} : { opacity: [0, 0.22, 0], x: [0, 8, 16] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          >
            <circle cx="178" cy="93" r="5.5" fill="rgba(180,180,180,1)" />
            <circle cx="186" cy="87" r="4" fill="rgba(180,180,180,1)" />
            <circle cx="193" cy="82" r="2.5" fill="rgba(180,180,180,1)" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Main section ────────────────────────────────────────────────────────────

export function NotFoundSection({
  title,
  description,
  fun,
  button,
}: {
  title: string;
  description: string;
  fun: string;
  button: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[color:var(--color-accent)]/8 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[320px] w-[320px] rounded-full bg-[color:var(--color-accent)]/5 blur-[110px]"
      />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(rgba(0,0,0,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.6)_1px,transparent_1px)] [background-size:60px_60px] dark:[background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]"
      />

      {/* Floating small circles decoration */}
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[8%] top-[20%] h-24 w-24 rounded-full border border-[color:var(--color-accent)]/20"
            animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[10%] bottom-[25%] h-16 w-16 rounded-full border border-[color:var(--color-accent)]/15"
            animate={{ y: [0, 14, 0], x: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[6%] top-[30%] h-8 w-8 rounded-full bg-[color:var(--color-accent)]/10"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* ── Illustration ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mb-2 w-full max-w-[220px] sm:max-w-[260px]"
      >
        <TukTukIllustration />
      </motion.div>

      {/* ── 404 digits ── */}
      <div
        aria-label="404"
        className="flex items-center justify-center gap-1 sm:gap-2"
      >
        {(["4", "0", "4"] as const).map((d, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.2 + i * 0.08 }}
            className="font-black leading-none tracking-tighter"
            style={{
              fontSize:
                i === 1
                  ? "clamp(4.5rem,13vw,8rem)"
                  : "clamp(5rem,14vw,9rem)",
              color:
                i === 1
                  ? "var(--color-foreground)"
                  : "var(--color-accent)",
            }}
          >
            {d}
          </motion.span>
        ))}
      </div>

      {/* ── Title ── */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.46 }}
        className="typo-h3 mt-5 max-w-md"
      >
        {title}
      </motion.h1>

      {/* ── Fun subtitle ── */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: EASE, delay: 0.56 }}
        className="typo-body mt-4 max-w-sm whitespace-pre-line text-[color:var(--color-muted)]"
      >
        {fun}
      </motion.p>

      {/* ── Plain description ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.64 }}
        className="mt-2 max-w-sm text-sm text-[color:var(--color-muted)] opacity-60"
      >
        {description}
      </motion.p>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: EASE, delay: 0.74 }}
        className="mt-10"
      >
        <Button href="/" variant="primary">
          {button}
        </Button>
      </motion.div>
    </section>
  );
}
