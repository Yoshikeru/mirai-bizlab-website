/* Generates typographic cover posters.
 *   node scripts/gen-covers.js
 * blog  → public/assets/blog/*.svg   (editorial posters: one giant word, one graphic idea each)
 * cases → public/assets/cases/*.svg  (dark data posters: giant label + a small chart unique to the case)
 * Giant text uses textLength so the layout is identical whatever fallback font renders. */
const fs = require("node:fs");
const path = require("node:path");

const W = 1200, H = 750; // 16:10 = the aspect the cards use, so nothing is cropped sideways
const RED = "#D7000F", INK = "#141414", PAPER = "#F3F1EC", DARK = "#0F0D10";
const SANS = "Helvetica Neue, Helvetica, Arial, sans-serif";
const MONO = "SFMono-Regular, Menlo, Consolas, monospace";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const grid = (ink, a) => {
  let d = "";
  for (let x = 75; x < W; x += 75) d += `M${x} 0V${H}`;
  for (let y = 75; y < H; y += 75) d += `M0 ${y}H${W}`;
  return `<path d="${d}" stroke="${ink}" stroke-opacity="${a}" stroke-width="1" fill="none"/>`;
};
const mono = (x, y, t, fill, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${o.size || 15}" font-weight="700" letter-spacing="3" fill="${fill}" fill-opacity="${o.op ?? 0.8}" ${o.anchor ? `text-anchor="${o.anchor}"` : ""}>${esc(t)}</text>`;
const giant = (t, x, y, size, width, fill, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${SANS}" font-weight="800" font-size="${size}" textLength="${width}" lengthAdjust="spacingAndGlyphs" fill="${fill}" ${o.stroke ? `stroke="${o.stroke}" stroke-width="${o.sw || 2}"` : ""} ${o.op ? `fill-opacity="${o.op}"` : ""}>${esc(t)}</text>`;
const wrap = (label, body, defs = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(label)}">${defs}${body}</svg>\n`;

/* ---------- blog: editorial posters ---------- */
const POSTER = {
  paper: { bg: PAPER, fg: INK, sub: RED, line: INK, lineA: 0.07 },
  red: { bg: RED, fg: "#fff", sub: INK, line: "#fff", lineA: 0.12 },
  ink: { bg: "#121212", fg: "#fff", sub: RED, line: "#fff", lineA: 0.07 },
};
function poster({ label, theme, no, cat, word, size, width, y, extra, tag }) {
  const c = POSTER[theme];
  return wrap(
    label,
    `<rect width="${W}" height="${H}" fill="${c.bg}"/>${grid(c.line, c.lineA)}` +
      mono(60, 70, "MIRAI BIZLAB — JOURNAL", c.fg) +
      mono(W - 60, 70, `No.${no}`, c.fg, { anchor: "end" }) +
      `<g transform="translate(0,37)">` + (extra ? extra(c) : "") + giant(word, 52, y, size, width, c.fg) + `</g>` +
      mono(60, H - 50, cat, c.fg, { op: 0.7 }) +
      (tag ? mono(W - 60, H - 50, tag, c.fg, { anchor: "end", op: 0.7 }) : "") +
      `<rect x="60" y="${H - 34}" width="56" height="4" fill="${theme === "red" ? "#fff" : RED}"/>`,
  );
}
const rnd = (seed) => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

const blog = {
  "thai-b2b-accounting-pitfalls": poster({
    label: "TOP 5 — accounting pitfalls with Thai counterparties", theme: "red", no: "07", cat: "ACCOUNTING", tag: "WHT / VAT / INVOICE CYCLE",
    word: "TOP5", size: 470, width: 1020, y: 500,
    extra: (c) => [1, 2, 3, 4, 5].map((i) => `<rect x="${60 + (i - 1) * 0}" y="${96 + i * 11}" width="${300 - i * 44}" height="5" fill="${c.fg}" fill-opacity="${0.9 - i * 0.14}"/>`).join(""),
  }),
  "monthly-reports-japan-vs-thailand": poster({
    label: "JP ⇄ TH — monthly reports compared", theme: "paper", no: "08", cat: "ACCOUNTING", tag: "J-GAAP / TFRS",
    word: "JP", size: 430, width: 500, y: 470,
    extra: (c) =>
      giant("TH", 640, 470, 430, 480, c.sub) +
      `<path d="M580 250H700M676 226L700 250L676 274" stroke="${c.fg}" stroke-width="6" fill="none"/><path d="M700 330H580M604 306L580 330L604 354" stroke="${c.fg}" stroke-width="6" fill="none"/>`,
  }),
  "boi-key-points": poster({
    label: "BOI — Thailand investment incentives", theme: "ink", no: "03", cat: "INCORPORATION", tag: "INVESTMENT PROMOTION",
    word: "BOI", size: 500, width: 760, y: 500,
    extra: () => `<circle cx="930" cy="320" r="200" fill="none" stroke="${RED}" stroke-width="3"/><circle cx="930" cy="320" r="130" fill="none" stroke="${RED}" stroke-opacity=".5" stroke-width="2" stroke-dasharray="6 10"/><circle cx="930" cy="120" r="9" fill="${RED}"/>`,
  }),
  "thailand-e-invoice": (() => {
    const r = rnd(7); let q = "";
    for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) if (r() > 0.5 || (i < 3 && j < 3)) q += `<rect x="${960 + i * 16}" y="${100 + j * 16}" width="13" height="13" fill="${INK}"/>`;
    return poster({
      label: "e-Tax — Thailand e-invoicing", theme: "paper", no: "05", cat: "TAX", tag: "E-TAX INVOICE",
      word: "e-Tax", size: 400, width: 880, y: 490,
      extra: (c) => q + `<circle cx="1010" cy="140" r="0" fill="${c.sub}"/><rect x="960" y="256" width="144" height="5" fill="${RED}"/>`,
    });
  })(),
  "outsourcing-vs-hiring-thailand": poster({
    label: "OUT vs IN — outsourcing versus hiring", theme: "paper", no: "04", cat: "MANAGEMENT", tag: "OUTSOURCE / IN-HOUSE",
    word: "OUT", size: 330, width: 640, y: 350,
    extra: (c) =>
      giant("IN", 52, 640, 330, 380, c.sub).replace(`y="640"`, `y="${H - 84}"`) +
      `<circle cx="740" cy="470" r="64" fill="${c.fg}"/><text x="740" y="482" text-anchor="middle" font-family="${SANS}" font-weight="700" font-size="34" fill="${c.bg}">vs</text>`,
  }),
  "peak-cloud-accounting-thailand": poster({
    label: "PEAK — cloud accounting in Thailand", theme: "ink", no: "02", cat: "ACCOUNTING SYSTEMS", tag: "CLOUD ACCOUNTING",
    word: "PEAK", size: 430, width: 900, y: 500,
    extra: () => `<polyline points="0,300 180,300 300,210 380,270 520,110 640,230 760,180 900,300 1200,300" fill="none" stroke="${RED}" stroke-width="4"/><circle cx="520" cy="110" r="10" fill="${RED}"/>`,
  }),
  "flowaccount-cloud-accounting-thailand": poster({
    label: "FLOW — FlowAccount cloud accounting", theme: "paper", no: "01", cat: "ACCOUNTING SYSTEMS", tag: "FLOWACCOUNT",
    word: "FLOW", size: 430, width: 930, y: 500,
    extra: (c) => [0, 1, 2, 3].map((i) => {
      const y0 = 150 + i * 26; let d = `M0 ${y0}`;
      for (let x = 0; x <= W; x += 100) d += ` Q${x + 50} ${y0 - 40 * (i % 2 ? -1 : 1)} ${x + 100} ${y0}`;
      return `<path d="${d}" fill="none" stroke="${i === 1 ? c.sub : c.fg}" stroke-opacity="${i === 1 ? 1 : 0.35}" stroke-width="${i === 1 ? 4 : 2}"/>`;
    }).join(""),
  }),
  "incorporation-thai-shareholder": poster({
    label: "51% — Thai shareholder requirement", theme: "red", no: "06", cat: "INCORPORATION", tag: "FOREIGN BUSINESS ACT",
    word: "51%", size: 520, width: 760, y: 510,
    extra: (c) => {
      const R = 150, cx = 930, cy = 300, a = 0.51 * 2 * Math.PI;
      const x = cx + R * Math.sin(a), y = cy - R * Math.cos(a);
      return `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="28"/><path d="M${cx} ${cy - R}A${R} ${R} 0 1 1 ${x} ${y}" fill="none" stroke="#fff" stroke-width="28"/>`;
    },
  }),
};

/* ---------- cases: dark data posters ---------- */
function dark({ label, no, industry, word, size, width, viz }) {
  return wrap(
    label,
    `<defs><radialGradient id="g" cx="75%" cy="30%" r="80%"><stop offset="0" stop-color="#231A1E"/><stop offset="1" stop-color="${DARK}"/></radialGradient></defs>` +
      `<rect width="${W}" height="${H}" fill="url(#g)"/>${grid("#fff", 0.05)}` +
      mono(60, 70, `CASE ${no}`, "#fff", { op: 0.75 }) +
      mono(W - 60, 70, industry, "#fff", { anchor: "end", op: 0.75 }) +
      `<g transform="translate(0,30)">${viz}</g>` +
      `<g transform="translate(0,60)">` + giant(word, 52, 600, size, width, "#fff", { op: 0.95 }) + `</g>` +
      `<rect x="60" y="${H - 49}" width="56" height="4" fill="${RED}"/>`,
  );
}
const bars = (xs, base, w, hs, gap) => hs.map((h, i) => `<rect x="${xs + i * (w + gap)}" y="${base - h}" width="${w}" height="${h}" fill="${i === hs.length - 1 ? RED : "#fff"}" fill-opacity="${i === hs.length - 1 ? 1 : 0.35}"/>`).join("");
const axis = (x1, x2, y) => `<path d="M${x1} ${y}H${x2}" stroke="#fff" stroke-opacity=".35"/>`;

const cases = {
  "restaurant-multi-outlet": dark({ label: "×3 — multi-outlet restaurant P/L", no: "01", industry: "RESTAURANT", word: "×3", size: 420, width: 420,
    viz: bars(720, 380, 90, [130, 210, 290], 30) + axis(700, 1130, 380) + mono(720, 410, "OUTLET A · B · C", "#fff", { size: 13 }) }),
  "beauty-salon-payroll": dark({ label: "PAYROLL — beauty salon payroll", no: "02", industry: "BEAUTY SALON", word: "PAYROLL", size: 250, width: 900,
    viz: [0, 1, 2, 3, 4].map((i) => `<rect x="740" y="${150 + i * 44}" width="${380 - i * 46}" height="14" fill="${i === 2 ? RED : "#fff"}" fill-opacity="${i === 2 ? 1 : 0.35}"/><rect x="740" y="${172 + i * 44}" width="${110 - i * 10}" height="5" fill="#fff" fill-opacity=".2"/>`).join("") }),
  "medical-clinic-accounting": dark({ label: "CLINIC — medical clinic accounting", no: "03", industry: "MEDICAL CLINIC", word: "CLINIC", size: 270, width: 880,
    viz: `<polyline points="640,290 760,290 800,290 830,200 870,380 910,250 940,290 1140,290" fill="none" stroke="${RED}" stroke-width="4"/><circle cx="910" cy="250" r="9" fill="${RED}"/>` + axis(640, 1140, 290) }),
  "ad-agency-project-pl": dark({ label: "P/L — project profit and loss for an ad agency", no: "04", industry: "AD AGENCY", word: "P/L", size: 400, width: 560,
    viz: [[130, 250], [130, 110], [240, 70], [310, 70]].map(([y, h], i) => `<rect x="${740 + i * 100}" y="${y}" width="70" height="${h}" fill="${i === 3 ? RED : "#fff"}" fill-opacity="${i === 3 ? 1 : 0.35}"/>`).join("") + axis(720, 1140, 380) }),
  "peak-cloud-accounting": dark({ label: "CLOUD — PEAK cloud accounting rollout", no: "05", industry: "CLOUD ACCOUNTING", word: "CLOUD", size: 290, width: 900,
    viz: `<g stroke="#fff" stroke-opacity=".35" stroke-width="2"><line x1="760" y1="250" x2="900" y2="160"/><line x1="900" y1="160" x2="1040" y2="260"/><line x1="760" y1="250" x2="900" y2="340"/><line x1="900" y1="340" x2="1040" y2="260"/><line x1="900" y1="160" x2="900" y2="340"/></g>` + [[760, 250], [900, 160], [1040, 260], [900, 340]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 1 ? 16 : 11}" fill="${i === 1 ? RED : "#fff"}" fill-opacity="${i === 1 ? 1 : 0.7}"/>`).join("") }),
  "company-incorporation-fnb": dark({ label: "NEW CO. — company incorporation for an F&B business", no: "06", industry: "F&B / INCORPORATION", word: "NEW CO.", size: 250, width: 900,
    viz: `<circle cx="920" cy="240" r="120" fill="none" stroke="${RED}" stroke-width="4"/><circle cx="920" cy="240" r="96" fill="none" stroke="#fff" stroke-opacity=".3" stroke-dasharray="4 8"/><text x="920" y="252" text-anchor="middle" font-family="${SANS}" font-weight="800" font-size="34" letter-spacing="4" fill="#fff">REGD.</text>` }),
  "company-liquidation": dark({ label: "EXIT — company liquidation", no: "07", industry: "LIQUIDATION", word: "EXIT", size: 420, width: 700,
    viz: `<polyline points="720,180 820,210 900,260 980,300 1060,360 1130,380" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="3"/><circle cx="1130" cy="380" r="11" fill="${RED}"/>` + axis(720, 1140, 380) }),
};

const out = (dir, map) => {
  const d = path.join(__dirname, "..", "public", "assets", dir);
  for (const [k, v] of Object.entries(map)) fs.writeFileSync(path.join(d, `${k}.svg`), v);
  console.log(dir, Object.keys(map).length);
};
out("blog", blog);
out("cases", cases);
