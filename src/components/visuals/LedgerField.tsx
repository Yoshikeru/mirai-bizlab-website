"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/motion/useReducedMotion";

/**
 * "Ledger gate" — the hero's signature moment.
 *
 * A field of ledger entries. Left of the red gate they are raw Thai books
 * (฿ amounts, WHT/VAT, file names, Thai account names) drifting out of order.
 * Right of the gate they have been re-cast into a Japanese head-office report
 * (¥ amounts, 月次試算表, 源泉所得税 …) and locked to a strict grid.
 * The pointer drags the gate; every entry it crosses is translated.
 *
 * Performance: text is pre-rendered to sprites once (per theme), the loop only
 * calls drawImage. The loop stops when the hero is off-screen / tab hidden and
 * is replaced by a single static frame under prefers-reduced-motion.
 */

type Pair = { th: string; jp: string; hot?: boolean };

const WORD_PAIRS: Pair[] = [
  { th: "VAT 7%", jp: "仮払消費税" },
  { th: "WHT 3%", jp: "源泉所得税" },
  { th: "PND.53", jp: "源泉税納付" },
  { th: "PND.1", jp: "給与源泉" },
  { th: "PP.30", jp: "VAT申告" },
  { th: "SSO", jp: "社会保険料" },
  { th: "ใบกำกับภาษี", jp: "請求書" },
  { th: "ใบเสร็จรับเงิน", jp: "領収書" },
  { th: "ค่าเช่า", jp: "賃借料" },
  { th: "เงินเดือน", jp: "給与手当" },
  { th: "ค่าสาธารณูปโภค", jp: "水道光熱費" },
  { th: "ค่าบริการ", jp: "業務委託費" },
  { th: "ลูกหนี้การค้า", jp: "売掛金" },
  { th: "เจ้าหนี้การค้า", jp: "買掛金" },
  { th: "สินค้าคงเหลือ", jp: "棚卸資産" },
  { th: "TFRS", jp: "J-GAAP調整", hot: true },
  { th: "Excel_final_v7.xlsx", jp: "月次試算表", hot: true },
  { th: "สลิป 3 เดือน", jp: "証憑整理" },
  { th: "THB", jp: "JPY" },
  { th: "ภ.พ.30", jp: "予実対比" },
];

// report columns: 科目 | 当月 | 前月   (Thai raw-book equivalents on the left of the gate)
const HEAD_TH = ["ACCOUNT", "THIS MO.", "PRIOR MO."];
const HEAD_JP = ["科目", "当月", "前月"];

const CHAOS_SCATTER_X = 78;
const CHAOS_SCATTER_Y = 46;
const CHAOS_WOBBLE = 20;

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const fmt = (n: number) => n.toLocaleString("en-US");

type Sprite = { c: HTMLCanvasElement; w: number; h: number };

type Particle = {
  cx: number; // home cell centre-left (ordered position)
  cy: number;
  th: Sprite;
  jp: Sprite;
  hot: boolean;
  head: boolean;
  delay: number; // gate offset, staggers the wave
  sx: number; // static chaos scatter
  sy: number;
  rot: number;
  f1: number;
  f2: number;
  p1: number;
  p2: number;
  t: number; // 0 = raw Thai book, 1 = Japanese report row
};

export function LedgerField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const section = wrap?.closest<HTMLElement>("[data-hero]") ?? null;
    if (!wrap || !canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    let disposed = false;
    let raf = 0;
    let running = false;
    let visible = true;
    let ready = false; // set once fonts are loaded and sprites are built

    let W = 0;
    let H = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let cols = 0;
    let rows = 0;

    let safe: { l: number; t: number; r: number; b: number }[] = [];
    let gate = 0;
    let gateTarget = 0;
    let pointerActive = false;
    let last = performance.now();
    let clock = 0;
    let colors = { fg: "#17161a", accent: "#d7000f", bg: "#fafaf8" };
    let fonts = { mono: "monospace", jp: "sans-serif", th: "sans-serif" };
    const spriteCache = new Map<string, Sprite>();
    const labelSprites: Record<string, Sprite> = {};

    const readTheme = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        fg: cs.getPropertyValue("--color-foreground").trim() || "#17161a",
        accent: cs.getPropertyValue("--color-accent").trim() || "#d7000f",
        bg: cs.getPropertyValue("--color-background").trim() || "#fafaf8",
      };
      fonts = {
        mono: cs.getPropertyValue("--font-mono").trim() || "monospace",
        jp: cs.getPropertyValue("--font-sans-jp").trim() || "sans-serif",
        th: cs.getPropertyValue("--font-sans-thai").trim() || "sans-serif",
      };
    };

    const sprite = (
      text: string,
      family: string,
      size: number,
      weight: number,
      color: string,
      spacing = 0,
    ): Sprite => {
      const key = `${text}|${family}|${size}|${weight}|${color}|${spacing}|${dpr}`;
      const hit = spriteCache.get(key);
      if (hit) return hit;
      const c = document.createElement("canvas");
      const g = c.getContext("2d")!;
      g.font = `${weight} ${size}px ${family}`;
      // manual letter-spacing (ctx.letterSpacing is not universal)
      const glyphs = [...text];
      const widths = glyphs.map((ch) => g.measureText(ch).width + spacing);
      const w = Math.ceil(widths.reduce((a, b) => a + b, 0)) + 4;
      const h = Math.ceil(size * 1.5);
      c.width = Math.ceil(w * dpr);
      c.height = Math.ceil(h * dpr);
      const g2 = c.getContext("2d")!;
      g2.scale(dpr, dpr);
      g2.font = `${weight} ${size}px ${family}`;
      g2.fillStyle = color;
      g2.textBaseline = "middle";
      let x = 2;
      glyphs.forEach((ch, i) => {
        g2.fillText(ch, x, h / 2 + 0.5);
        x += widths[i];
      });
      const s = { c, w, h };
      spriteCache.set(key, s);
      return s;
    };

    // Rects of the hero copy (tight glyph boxes) so tokens can flow around it.
    const measureSafe = () => {
      const wr = wrap.getBoundingClientRect();
      safe = [...section.querySelectorAll<HTMLElement>("[data-safe]")].map((el) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        const r = el.hasAttribute("data-safe-box") ? el.getBoundingClientRect() : range.getBoundingClientRect();
        return { l: r.left - wr.left - 18, t: r.top - wr.top - 10, r: r.right - wr.left + 18, b: r.bottom - wr.top + 10 };
      });
    };
    const safeFactor = (x: number, y: number) => {
      let dMin = 999;
      for (const z of safe) {
        const dx = Math.max(z.l - x, 0, x - z.r);
        const dy = Math.max(z.t - y, 0, y - z.b);
        dMin = Math.min(dMin, Math.hypot(dx, dy));
      }
      return 0.09 + 0.91 * smooth(0, 70, dMin);
    };

    const build = () => {
      const r = wrap.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      dpr = Math.min(window.devicePixelRatio || 1, isCoarse ? 1.5 : 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spriteCache.clear();

      const small = W < 720;
      const cellW = small ? 108 : 138;
      const cellH = small ? 34 : 36;
      const size = small ? 11 : 12.5;
      const padX = 28;
      const padTop = small ? 84 : 116;
      const padBottom = small ? 96 : 128;
      cols = Math.max(3, Math.floor((W - padX * 2) / cellW));
      rows = Math.max(4, Math.floor((H - padTop - padBottom) / cellH));
      const gridW = cols * cellW;
      const x0 = W - padX - gridW; // right-align grid so ordered side hugs the edge
      const R = mulberry32(20260930);

      const total = cols * rows;
      particles = [];
      let wi = 0;
      // column-major so the wave reads left → right
      for (let cx = 0; cx < cols; cx++) {
        const role = (cols - 1 - cx) % 3; // 2 = 科目 (word), 1 = 当月, 0 = 前月
        for (let cy = 0; cy < rows; cy++) {
          const head = cy === 0;
          let it: Pair;
          let isAmount = false;
          if (head) {
            const k3 = 2 - role;
            it = { th: HEAD_TH[k3], jp: HEAD_JP[k3], hot: true };
          } else if (role === 2) {
            it = WORD_PAIRS[(wi++ + Math.floor(R() * 4)) % WORD_PAIRS.length];
          } else {
            isAmount = true;
            const n = Math.round((R() * R() * 1450 + 6) * 100) * 10 + (R() < 0.5 ? 0 : 50);
            const yen = Math.round((n * 4.2) / 10) * 10;
            it = { th: `฿ ${fmt(n)}`, jp: `¥ ${fmt(yen)}`, hot: R() < 0.04 };
          }
          const hot = !!it.hot;
          const thFam = /[\u0E00-\u0E7F]/.test(it.th) ? `${fonts.th}, ${fonts.mono}` : fonts.mono;
          const th = sprite(it.th, thFam, size, head ? 700 : 400, hot && !head ? colors.accent : colors.fg, head ? 1.6 : isAmount ? 0.3 : 0.2);
          const jpFam = isAmount || head ? (head ? fonts.jp : fonts.mono) : fonts.jp;
          const jp = sprite(it.jp, jpFam, head ? size + 0.5 : size, head ? 700 : isAmount ? 500 : 500, hot ? colors.accent : colors.fg, head ? 1.2 : isAmount ? 0.3 : 0.6);
          particles.push({
            cx: x0 + cx * cellW,
            cy: padTop + cy * cellH,
            th,
            jp,
            hot,
            head,
            delay: (R() - 0.5) * 120,
            sx: (R() - 0.5) * 2 * CHAOS_SCATTER_X,
            sy: (R() - 0.5) * 2 * CHAOS_SCATTER_Y,
            rot: head ? 0 : (R() - 0.5) * 0.36,
            f1: 0.16 + R() * 0.34,
            f2: 0.12 + R() * 0.3,
            p1: R() * 6.283,
            p2: R() * 6.283,
            t: 0,
          });
        }
      }
      void total;

      labelSprites.th = sprite("TH LEDGER", fonts.mono, 10.5, 700, colors.fg, 2.2);
      labelSprites.jp = sprite("JP REPORT", fonts.mono, 10.5, 700, colors.accent, 2.2);
    };

    const restGate = () => W * (W < 720 ? 0.5 : 0.56);

    const frame = (now: number) => {
      if (disposed) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      clock += dt;

      // gate: pointer while active, otherwise a slow breathing drift
      const idle = restGate() + Math.sin(clock * 0.32) * W * 0.05;
      const target = pointerActive ? gateTarget : idle;
      gate += (target - gate) * (1 - Math.exp(-dt * (pointerActive ? 6 : 2.2)));

      ctx.clearRect(0, 0, W, H);

      // gate glow
      const gl = ctx.createLinearGradient(gate - 220, 0, gate + 220, 0);
      gl.addColorStop(0, "rgba(215,0,15,0)");
      gl.addColorStop(0.5, "rgba(215,0,15,0.085)");
      gl.addColorStop(1, "rgba(215,0,15,0)");
      ctx.fillStyle = gl;
      ctx.fillRect(gate - 220, 0, 440, H);

      // report rules: hairline under each row, only on the reconciled side
      ctx.fillStyle = colors.fg;
      ctx.globalAlpha = 0.07;
      for (let r = 0; r < rows; r++) {
        const yy = Math.round(particles[r]?.cy ?? 0) + 20;
        ctx.fillRect(gate, yy, W - gate - 28, 1);
      }
      ctx.globalAlpha = 1;

      let reconciled = 0;
      for (const p of particles) {
        const target01 = p.cx > gate + p.delay ? 1 : 0;
        const rate = target01 ? 6.5 : 4.2;
        p.t += (target01 - p.t) * (1 - Math.exp(-dt * rate));
        if (p.t > 0.86) reconciled++;

        const chaos = 1 - smooth(0, 1, p.t);
        const wob = CHAOS_WOBBLE * chaos;
        const x =
          p.cx + p.sx * chaos + (Math.sin(clock * p.f1 + p.p1) + 0.5 * Math.sin(clock * p.f1 * 2.3 + p.p2)) * wob;
        const y =
          p.cy + p.sy * chaos + (Math.sin(clock * p.f2 + p.p2) + 0.5 * Math.sin(clock * p.f2 * 1.9 + p.p1)) * wob * 0.7;

        const sf = safeFactor(x + 30, y);
        const aTh = (1 - smooth(0.12, 0.55, p.t)) * (p.hot && !p.head ? 0.92 : p.head ? 0.55 : 0.55) * sf;
        const aJp = smooth(0.45, 0.92, p.t) * (p.hot ? 1 : p.head ? 1 : 0.86) * (0.35 + 0.65 * sf);

        const rot = p.rot * chaos;
        if (Math.abs(rot) > 0.004) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rot);
          if (aTh > 0.01) {
            ctx.globalAlpha = aTh;
            ctx.drawImage(p.th.c, 0, -p.th.h / 2, p.th.w, p.th.h);
          }
          if (aJp > 0.01) {
            ctx.globalAlpha = aJp;
            ctx.drawImage(p.jp.c, 0, -p.jp.h / 2, p.jp.w, p.jp.h);
          }
          ctx.restore();
        } else {
          if (aTh > 0.01) {
            ctx.globalAlpha = aTh;
            ctx.drawImage(p.th.c, x, y - p.th.h / 2, p.th.w, p.th.h);
          }
          if (aJp > 0.01) {
            ctx.globalAlpha = aJp;
            ctx.drawImage(p.jp.c, x, y - p.jp.h / 2, p.jp.w, p.jp.h);
          }
        }
      }
      ctx.globalAlpha = 1;

      // gate line + ticks
      const lg = ctx.createLinearGradient(0, 0, 0, H);
      lg.addColorStop(0, "rgba(215,0,15,0)");
      lg.addColorStop(0.16, "rgba(215,0,15,0.9)");
      lg.addColorStop(0.84, "rgba(215,0,15,0.9)");
      lg.addColorStop(1, "rgba(215,0,15,0)");
      ctx.fillStyle = lg;
      ctx.fillRect(gate - 0.75, 0, 1.5, H);
      ctx.fillStyle = colors.accent;
      for (let y = 60; y < H - 60; y += 24) {
        ctx.globalAlpha = y % 96 === 12 ? 0.9 : 0.4;
        ctx.fillRect(gate - (y % 96 === 12 ? 9 : 5), y, y % 96 === 12 ? 18 : 10, 1);
      }
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(gate, H * 0.5, 4.5, 0, 6.283);
      ctx.fill();

      // labels — on solid chips so no token ever collides with them; they fade
      // out wherever they would run into the headline / kicker copy
      const ty = W < 720 ? 44 : 64;
      const labelFade = (x: number, w: number) => {
        let f = 1;
        for (let px = x; px <= x + w; px += 24) f = Math.min(f, (safeFactor(px, ty + 6) - 0.09) / 0.91);
        return f;
      };
      const chip = (x: number, y: number, w: number, h: number, f: number) => {
        ctx.globalAlpha = 0.92 * f;
        ctx.fillStyle = colors.bg;
        ctx.fillRect(x - 6, y - 2, w + 12, h + 4);
      };
      const L = labelSprites.th, Rr = labelSprites.jp;
      const cnt = sprite(`RECONCILED ${reconciled}/${particles.length}`, fonts.mono, 10.5, 700, colors.fg, 2);
      const cx0 = gate + 16 + Rr.w + 22;
      const items: [Sprite, number, number][] = [
        [L, gate - 16 - L.w, 0.75],
        [Rr, gate + 16, 1],
        [cnt, cx0, 0.7],
      ];
      for (const [sp, x, a] of items) {
        const f = labelFade(x, sp.w);
        if (f < 0.02) continue;
        chip(x, ty, sp.w, sp.h, f);
        ctx.globalAlpha = a * f;
        ctx.drawImage(sp.c, x, ty, sp.w, sp.h);
      }
      ctx.globalAlpha = 1;
      // keep cache bounded: counter text changes often
      if (spriteCache.size > 900) spriteCache.clear();

      if (running && !reduce) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduce || disposed || !ready) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // ---- scroll fx: publish hero progress (0..1) for CSS to consume
    let sTick = false;
    const onScroll = () => {
      if (sTick) return;
      sTick = true;
      requestAnimationFrame(() => {
        sTick = false;
        const r = section.getBoundingClientRect();
        const p = clamp(-r.top / (r.height * 0.8), 0, 1);
        section.style.setProperty("--hero-p", p.toFixed(3));
      });
    };

    // ---- pointer
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = wrap.getBoundingClientRect();
      pointerActive = true;
      gateTarget = clamp(e.clientX - r.left, W * 0.34, W * 0.9);
    };
    const onLeave = () => {
      pointerActive = false;
    };

    const init = async () => {
      readTheme();
      try {
        const jpText = WORD_PAIRS.map((p) => p.jp).join("") + "¥";
        const thText = WORD_PAIRS.map((p) => p.th).join("") + "฿";
        await Promise.race([
          Promise.all([
            document.fonts.load(`500 12px ${fonts.jp}`, jpText),
            document.fonts.load(`400 12px ${fonts.th}`, thText),
            document.fonts.load(`400 12px ${fonts.mono}`, "0123456789"),
          ]),
          new Promise((res) => setTimeout(res, 1400)),
        ]);
      } catch {
        /* fall through with fallback fonts */
      }
      if (disposed) return;
      build();
      measureSafe();
      window.setTimeout(measureSafe, 1500);
      gate = restGate();
      gateTarget = gate;
      ready = true;
      frame(performance.now());
      if (!reduce && visible && !document.hidden) start();
      wrap.dataset.ready = "true";
    };

    const ro = new ResizeObserver(() => {
      if (!particles.length) return;
      const wasRunning = running;
      stop();
      build();
      measureSafe();
      gate = clamp(gate, W * 0.34, W * 0.9);
      frame(performance.now());
      if (wasRunning && !reduce) start();
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(section);

    const onVis = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVis);
    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // re-skin on theme switch (next-themes toggles a class on <html>)
    const mo = new MutationObserver(() => {
      if (!particles.length) return;
      readTheme();
      build();
      frame(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    init();

    return () => {
      disposed = true;
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce]);

  return (
    <div ref={wrapRef} className="ledger-field absolute inset-0 -z-10" aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
