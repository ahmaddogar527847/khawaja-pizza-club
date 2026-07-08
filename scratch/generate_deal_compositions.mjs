import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp");

const VIEW_W = 1600;
const VIEW_H = 1200;
const OUT_W = 3200;
const OUT_H = 2400;

const dealSpecs = [
  {
    output: "deal_1.jpg",
    items: [
      burger(95, 510, 570),
      fries(730, 640, 360, "regular"),
      drink("345ml", 1210, 335),
    ],
  },
  {
    output: "deal_2.jpg",
    items: [
      burger(55, 540, 470),
      burger(450, 540, 470),
      fries(835, 650, 285, "regular"),
      fries(1065, 650, 285, "regular"),
      drink("345ml", 1295, 350),
    ],
  },
  {
    output: "deal_3.jpg",
    items: [
      burger(45, 605, 390),
      burger(410, 510, 430),
      burger(775, 605, 390),
      fries(1130, 690, 250, "small"),
      drink("1L", 1300, 280),
    ],
  },
  {
    output: "deal_4.jpg",
    items: [
      pizza(110, 505, 410, "small"),
      burger(590, 580, 530),
      drink("1L", 1295, 280),
    ],
  },
  {
    output: "deal_5.jpg",
    items: [
      pizza(95, 420, 590, "medium"),
      fries(810, 680, 260, "small"),
      drink("1.5L", 1215, 220),
    ],
  },
  {
    output: "deal_6.jpg",
    items: [
      pizza(45, 380, 685, "large"),
      burger(725, 630, 520),
      drink("1.5L", 1270, 220),
    ],
  },
  {
    output: "family_deal_1.jpg",
    items: [
      burger(55, 420, 350),
      burger(375, 420, 350),
      burger(695, 420, 350),
      burger(210, 655, 350),
      burger(530, 655, 350),
      burger(850, 655, 350),
      drink("1.5L", 1260, 215),
    ],
  },
  {
    output: "family_deal_2.jpg",
    items: [
      pizza(110, 500, 390, "small"),
      pizza(470, 555, 390, "small"),
      fries(960, 705, 245, "small"),
      drink("1L", 1285, 280),
    ],
  },
  {
    output: "family_deal_3.jpg",
    items: [
      pizza(80, 475, 505, "medium"),
      pizza(535, 535, 505, "medium"),
      fries(990, 720, 245, "small"),
      drink("1.5L", 1280, 220),
    ],
  },
  {
    output: "family_deal_4.jpg",
    items: [
      pizza(45, 370, 735, "xl"),
      burger(900, 380, 410),
      fries(890, 690, 385, "large"),
      drink("1.5L", 1285, 215),
    ],
  },
];

function burger(x, y, width) {
  return { type: "burger", x, y, width };
}

function fries(x, y, width, size) {
  return { type: "fries", x, y, width, size };
}

function pizza(x, y, diameter, size) {
  return { type: "pizza", x, y, diameter, size };
}

function drink(size, x, y) {
  return { type: "drink", size, x, y };
}

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function defs() {
  return `
    <defs>
      <radialGradient id="bg" cx="48%" cy="40%" r="78%">
        <stop offset="0%" stop-color="#4a2b12"/>
        <stop offset="36%" stop-color="#18110a"/>
        <stop offset="100%" stop-color="#030303"/>
      </radialGradient>
      <linearGradient id="table" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#070504"/>
        <stop offset="45%" stop-color="#241409"/>
        <stop offset="100%" stop-color="#080504"/>
      </linearGradient>
      <radialGradient id="stageGlow" cx="48%" cy="74%" r="52%">
        <stop offset="0%" stop-color="#d7a52d" stop-opacity="0.35"/>
        <stop offset="40%" stop-color="#6f3f10" stop-opacity="0.14"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="bunTop" x1="18%" y1="0%" x2="82%" y2="100%">
        <stop offset="0%" stop-color="#fff0a8"/>
        <stop offset="18%" stop-color="#e6a743"/>
        <stop offset="58%" stop-color="#a75518"/>
        <stop offset="100%" stop-color="#5b210c"/>
      </linearGradient>
      <linearGradient id="bunSide" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#d98e30"/>
        <stop offset="54%" stop-color="#9f4715"/>
        <stop offset="100%" stop-color="#52200c"/>
      </linearGradient>
      <linearGradient id="chicken" x1="12%" y1="8%" x2="90%" y2="90%">
        <stop offset="0%" stop-color="#ffd36a"/>
        <stop offset="35%" stop-color="#e27621"/>
        <stop offset="70%" stop-color="#a33112"/>
        <stop offset="100%" stop-color="#561407"/>
      </linearGradient>
      <linearGradient id="friesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fff2a8"/>
        <stop offset="43%" stop-color="#f0b93c"/>
        <stop offset="100%" stop-color="#9d4a13"/>
      </linearGradient>
      <radialGradient id="pizzaCheese" cx="42%" cy="34%" r="70%">
        <stop offset="0%" stop-color="#fff5b8"/>
        <stop offset="45%" stop-color="#f2c34c"/>
        <stop offset="80%" stop-color="#d77221"/>
        <stop offset="100%" stop-color="#7b260e"/>
      </radialGradient>
      <linearGradient id="cola" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#230504"/>
        <stop offset="22%" stop-color="#941a10"/>
        <stop offset="55%" stop-color="#c53517"/>
        <stop offset="100%" stop-color="#2b0705"/>
      </linearGradient>
      <linearGradient id="glass" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.04"/>
        <stop offset="18%" stop-color="#ffffff" stop-opacity="0.34"/>
        <stop offset="43%" stop-color="#ffffff" stop-opacity="0.05"/>
        <stop offset="76%" stop-color="#ffffff" stop-opacity="0.26"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.08"/>
      </linearGradient>
      <linearGradient id="bottleLabel" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#111"/>
        <stop offset="22%" stop-color="#3b2506"/>
        <stop offset="50%" stop-color="#ffd75c"/>
        <stop offset="78%" stop-color="#3b2506"/>
        <stop offset="100%" stop-color="#111"/>
      </linearGradient>
      <filter id="softShadow" x="-45%" y="-45%" width="190%" height="190%">
        <feGaussianBlur stdDeviation="18"/>
      </filter>
      <filter id="itemGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="22" stdDeviation="16" flood-color="#000" flood-opacity="0.56"/>
        <feDropShadow dx="0" dy="-3" stdDeviation="3" flood-color="#f5c14c" flood-opacity="0.18"/>
      </filter>
      <filter id="crispShadow" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="14" stdDeviation="9" flood-color="#000" flood-opacity="0.52"/>
      </filter>
    </defs>`;
}

function background() {
  return `
    <rect width="${VIEW_W}" height="${VIEW_H}" fill="url(#bg)"/>
    <rect y="710" width="${VIEW_W}" height="490" fill="url(#table)"/>
    <rect width="${VIEW_W}" height="${VIEW_H}" fill="url(#stageGlow)"/>
    <g opacity="0.20" fill="none">
      <path d="M0 767 C300 725 590 803 910 760 C1210 720 1405 740 1600 766" stroke="#e6b447" stroke-width="2"/>
      <path d="M0 842 C330 818 610 875 960 835 C1190 809 1390 814 1600 846" stroke="#7a4714" stroke-width="3"/>
      <path d="M0 938 C310 902 680 958 1020 914 C1260 886 1430 902 1600 930" stroke="#d4af37" stroke-width="1.5"/>
    </g>
    <rect width="${VIEW_W}" height="${VIEW_H}" fill="#000" opacity="0.08"/>
  `;
}

function burgerSvg(item) {
  const scale = item.width / 420;
  const sesame = [
    [85, 55, -20], [126, 39, 8], [168, 48, -9], [212, 40, 18],
    [254, 58, -14], [298, 76, 20], [112, 84, 16], [207, 78, -18],
    [326, 100, 12], [151, 75, -24],
  ].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="2.6" fill="#fff6c7" opacity="0.88" transform="rotate(${r} ${x} ${y})"/>`).join("");

  const crispBits = [
    [66, 146, 11], [101, 132, 8], [142, 154, 10], [185, 134, 9],
    [225, 158, 12], [272, 138, 8], [319, 158, 11], [350, 143, 8],
    [117, 171, 7], [245, 178, 8], [307, 177, 6],
  ].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffbf42" opacity="0.56"/>`).join("");

  return `
    <g transform="translate(${item.x} ${item.y}) scale(${scale})" filter="url(#itemGlow)">
      <ellipse cx="210" cy="245" rx="180" ry="32" fill="#000" opacity="0.55" filter="url(#softShadow)"/>
      <path d="M58 186 C96 216 315 216 357 186 L342 223 C305 251 105 252 72 223 Z" fill="url(#bunSide)"/>
      <path d="M66 179 C124 160 295 160 354 179 C334 199 93 201 66 179 Z" fill="#f2b85d"/>
      <path d="M38 163 C78 135 126 142 158 158 C199 139 249 142 285 158 C323 139 373 145 397 166 C331 196 103 196 38 163 Z" fill="#50aa3e"/>
      <ellipse cx="124" cy="169" rx="55" ry="15" fill="#d12619" opacity="0.88"/>
      <ellipse cx="285" cy="169" rx="58" ry="15" fill="#d12619" opacity="0.88"/>
      <path d="M68 157 L350 157 L320 188 L92 188 Z" fill="#f7c94d" opacity="0.95"/>
      <path d="M43 132 C86 102 124 127 166 111 C212 94 239 125 281 115 C326 106 366 123 388 148 C360 195 59 198 35 155 C33 145 36 137 43 132 Z" fill="url(#chicken)"/>
      ${crispBits}
      <path d="M60 151 C104 163 132 133 165 152 C204 174 236 131 282 151 C320 166 349 148 378 158" fill="none" stroke="#5c1707" stroke-width="7" stroke-linecap="round" opacity="0.38"/>
      <path d="M84 124 C135 139 259 139 333 124 C334 134 323 145 300 149 C253 157 161 158 105 150 C84 147 76 135 84 124 Z" fill="#fff8e4" opacity="0.94"/>
      <path d="M73 92 C126 36 289 29 350 90 C378 118 374 134 351 139 C285 153 105 153 60 139 C36 132 42 118 73 92 Z" fill="url(#bunTop)"/>
      <path d="M72 95 C130 55 279 49 337 93" fill="none" stroke="#fff6b0" stroke-width="8" opacity="0.32" stroke-linecap="round"/>
      ${sesame}
      <path d="M68 140 C135 156 288 156 354 140" fill="none" stroke="#4a1d08" stroke-width="6" opacity="0.25"/>
    </g>`;
}

function friesSvg(item) {
  const scale = item.width / 300;
  const count = item.size === "large" ? 23 : item.size === "small" ? 14 : 18;
  const trayW = 300;
  const trayH = item.size === "large" ? 118 : item.size === "small" ? 88 : 102;
  const fries = Array.from({ length: count }, (_, i) => {
    const x = 48 + (i % 9) * 24 + (i % 3) * 5;
    const y = 42 + Math.floor(i / 7) * 14 + (i % 4) * 4;
    const h = 105 + (i % 5) * 18;
    const w = 17 + (i % 3) * 4;
    const r = -34 + ((i * 29) % 68);
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="url(#friesGrad)" stroke="#fff1a3" stroke-opacity="0.25" stroke-width="2" transform="rotate(${r} ${x + w / 2} ${y + h})"/>`;
  }).join("");

  return `
    <g transform="translate(${item.x} ${item.y}) scale(${scale})" filter="url(#itemGlow)">
      <ellipse cx="150" cy="220" rx="148" ry="30" fill="#000" opacity="0.50" filter="url(#softShadow)"/>
      <g filter="url(#crispShadow)">
        ${fries}
        <path d="M24 ${150 - trayH * 0.12} C70 ${122 - trayH * 0.18} 232 ${122 - trayH * 0.18} 276 ${150 - trayH * 0.12} L250 ${150 + trayH * 0.58} C203 ${180 + trayH * 0.34} 96 ${180 + trayH * 0.34} 51 ${150 + trayH * 0.58} Z" fill="#17120d" stroke="#d9a73b" stroke-opacity="0.55" stroke-width="4"/>
        <path d="M58 ${145 - trayH * 0.05} C105 ${160 - trayH * 0.08} 197 ${160 - trayH * 0.08} 244 ${145 - trayH * 0.05}" fill="none" stroke="#fff0a6" stroke-opacity="0.18" stroke-width="5"/>
      </g>
    </g>`;
}

function pizzaSvg(item) {
  const scale = item.diameter / 420;
  const toppings = pizzaToppings(210, 210, 142, item.size);
  const crust = item.size === "xl" ? 28 : item.size === "large" ? 25 : item.size === "medium" ? 22 : 19;
  const sliceLines = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45 + 10) * Math.PI / 180;
    const x = 210 + Math.cos(angle) * 145;
    const y = 210 + Math.sin(angle) * 145;
    return `<path d="M210 210 L${x.toFixed(1)} ${y.toFixed(1)}" stroke="#a64713" stroke-width="4" stroke-opacity="0.28" stroke-linecap="round"/>`;
  }).join("");
  const cheeseBubbles = Array.from({ length: 34 }, (_, i) => {
    const angle = (i * 73) * Math.PI / 180;
    const rr = 28 + ((i * 31) % 120);
    const x = 210 + Math.cos(angle) * rr;
    const y = 210 + Math.sin(angle) * rr;
    const radius = 4 + (i % 5);
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius}" fill="#fff1a0" opacity="${0.18 + (i % 3) * 0.06}"/>`;
  }).join("");
  const crustSpots = Array.from({ length: 26 }, (_, i) => {
    const angle = (i * 37) * Math.PI / 180;
    const rr = 164 + (i % 4) * 5;
    const x = 210 + Math.cos(angle) * rr;
    const y = 210 + Math.sin(angle) * rr;
    return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${6 + (i % 4)}" ry="${3 + (i % 3)}" fill="#6f2208" opacity="0.34" transform="rotate(${i * 17} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }).join("");

  return `
    <g transform="translate(${item.x} ${item.y}) scale(${scale})" filter="url(#itemGlow)">
      <ellipse cx="210" cy="278" rx="190" ry="34" fill="#000" opacity="0.55" filter="url(#softShadow)"/>
      <circle cx="210" cy="210" r="182" fill="#4e1b09"/>
      <circle cx="210" cy="210" r="${182 - crust}" fill="#8f2612"/>
      <circle cx="210" cy="210" r="${168 - crust}" fill="url(#pizzaCheese)"/>
      ${sliceLines}
      ${cheeseBubbles}
      <circle cx="210" cy="210" r="179" fill="none" stroke="#f3b24c" stroke-width="${crust}" stroke-opacity="0.85"/>
      ${crustSpots}
      <circle cx="210" cy="210" r="173" fill="none" stroke="#5b210b" stroke-width="8" stroke-opacity="0.35"/>
      ${toppings}
      <path d="M63 179 C124 116 282 103 350 179" fill="none" stroke="#fff2a6" stroke-width="8" opacity="0.18" stroke-linecap="round"/>
      <path d="M78 279 C132 327 285 322 340 274" fill="none" stroke="#431604" stroke-width="9" opacity="0.30" stroke-linecap="round"/>
    </g>`;
}

function pizzaToppings(cx, cy, r, size) {
  const count = size === "xl" ? 52 : size === "large" ? 44 : size === "medium" ? 36 : 28;
  let out = "";
  for (let i = 0; i < count; i += 1) {
    const angle = (i * 137.5) * Math.PI / 180;
    const rr = r * (0.18 + ((i * 37) % 74) / 100);
    const x = cx + Math.cos(angle) * rr;
    const y = cy + Math.sin(angle) * rr;
    if (i % 4 === 0) {
      out += `<rect x="${x - 15}" y="${y - 11}" width="30" height="22" rx="5" fill="#c04917" stroke="#5a1606" stroke-width="3" transform="rotate(${(i * 23) % 90} ${x} ${y})"/>`;
    } else if (i % 4 === 1) {
      out += `<ellipse cx="${x}" cy="${y}" rx="18" ry="8" fill="#2d8f43" transform="rotate(${(i * 31) % 180} ${x} ${y})"/>`;
    } else if (i % 4 === 2) {
      out += `<circle cx="${x}" cy="${y}" r="13" fill="#351a11"/><circle cx="${x}" cy="${y}" r="6" fill="#d9ad49"/>`;
    } else {
      out += `<circle cx="${x}" cy="${y}" r="12" fill="#e13120" stroke="#7b160c" stroke-width="3"/>`;
    }
  }
  for (let i = 0; i < 22; i += 1) {
    const angle = (i * 54) * Math.PI / 180;
    const rr = r * (0.16 + ((i * 19) % 76) / 100);
    const x = cx + Math.cos(angle) * rr;
    const y = cy + Math.sin(angle) * rr;
    out += `<circle cx="${x}" cy="${y}" r="${3 + (i % 3)}" fill="#fff7c2" opacity="0.50"/>`;
  }
  return out;
}

function drinkSvg(item) {
  const dims = {
    "345ml": { w: 118, h: 300, label: "345ml" },
    "1L": { w: 150, h: 410, label: "1 LTR" },
    "1.5L": { w: 190, h: 525, label: "1.5 LTR" },
  }[item.size];

  const w = dims.w;
  const h = dims.h;
  const capH = h * 0.055;
  const neckW = w * 0.34;
  const neckH = h * 0.18;
  const bodyW = w * 0.78;
  const bodyX = (w - bodyW) / 2;
  const bodyY = capH + neckH - h * 0.03;
  const bodyH = h - bodyY - 8;
  const labelY = bodyY + bodyH * 0.42;
  const labelH = bodyH * 0.24;
  const nextSize = Math.max(22, w * 0.22);
  const sizeLabel = Math.max(11, w * 0.082);

  return `
    <g transform="translate(${item.x} ${item.y})" filter="url(#itemGlow)">
      <ellipse cx="${w / 2}" cy="${h + 18}" rx="${w * 0.48}" ry="${h * 0.055}" fill="#000" opacity="0.55" filter="url(#softShadow)"/>
      <rect x="${(w - neckW) / 2}" y="${capH}" width="${neckW}" height="${neckH + 20}" rx="${neckW * 0.20}" fill="url(#cola)" stroke="#fff" stroke-opacity="0.18" stroke-width="2.5"/>
      <rect x="${(w - neckW) / 2 - 5}" y="3" width="${neckW + 10}" height="${capH + 12}" rx="${capH * 0.42}" fill="#f0c24b"/>
      <rect x="${bodyX}" y="${bodyY}" width="${bodyW}" height="${bodyH}" rx="${bodyW * 0.24}" fill="url(#cola)" stroke="#fff" stroke-opacity="0.24" stroke-width="3.5"/>
      <rect x="${bodyX + bodyW * 0.08}" y="${bodyY + 12}" width="${bodyW * 0.84}" height="${bodyH - 24}" rx="${bodyW * 0.22}" fill="url(#glass)"/>
      <rect x="${bodyX + bodyW * 0.045}" y="${labelY}" width="${bodyW * 0.91}" height="${labelH}" rx="${labelH * 0.22}" fill="url(#bottleLabel)" stroke="#fff0a6" stroke-opacity="0.70" stroke-width="2"/>
      <text x="${w / 2}" y="${labelY + labelH * 0.47}" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="${nextSize}" font-weight="900" fill="#130c04">NEXT</text>
      <text x="${w / 2}" y="${labelY + labelH * 0.78}" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="${sizeLabel}" font-weight="800" fill="#fff7cf">${esc(dims.label)}</text>
      <path d="M${bodyX + bodyW * 0.25} ${bodyY + 32} C${bodyX + bodyW * 0.12} ${bodyY + bodyH * 0.36}, ${bodyX + bodyW * 0.18} ${bodyY + bodyH * 0.70}, ${bodyX + bodyW * 0.28} ${bodyY + bodyH - 42}" fill="none" stroke="#fff" stroke-opacity="0.36" stroke-width="${Math.max(4, w * 0.035)}" stroke-linecap="round"/>
      <path d="M${bodyX + bodyW * 0.82} ${bodyY + 42} C${bodyX + bodyW * 0.92} ${bodyY + bodyH * 0.40}, ${bodyX + bodyW * 0.88} ${bodyY + bodyH * 0.72}, ${bodyX + bodyW * 0.78} ${bodyY + bodyH - 48}" fill="none" stroke="#000" stroke-opacity="0.24" stroke-width="${Math.max(4, w * 0.030)}" stroke-linecap="round"/>
    </g>`;
}

function renderItem(item) {
  if (item.type === "burger") return burgerSvg(item);
  if (item.type === "fries") return friesSvg(item);
  if (item.type === "pizza") return pizzaSvg(item);
  if (item.type === "drink") return drinkSvg(item);
  throw new Error(`Unknown item type: ${item.type}`);
}

function dealSvg(spec) {
  return `
    <svg width="${OUT_W}" height="${OUT_H}" viewBox="0 0 ${VIEW_W} ${VIEW_H}" xmlns="http://www.w3.org/2000/svg">
      ${defs()}
      ${background()}
      ${spec.items.map(renderItem).join("\n")}
      <rect width="${VIEW_W}" height="${VIEW_H}" fill="none"/>
    </svg>`;
}

async function generate(spec) {
  const output = path.join("public", "images", "deals", spec.output);
  await sharp(Buffer.from(dealSvg(spec)))
    .jpeg({ quality: 94, chromaSubsampling: "4:4:4", mozjpeg: true })
    .toFile(output);
  console.log(`Generated ${spec.output}`);
}

for (const spec of dealSpecs) {
  await generate(spec);
}
