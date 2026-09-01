import { useState, useEffect } from 'react';

/* ================= 静态数据 ================= */

export const CHECKOUT_STEPS = [
  '正在清点您的购物车...',
  '正在打包您的宁静...',
  '隔绝外界焦虑...',
  '支付成功',
];

const GlyphSilence = () => (
  <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="0.7">
    <circle cx="32" cy="32" r="24" strokeDasharray="1 5" strokeLinecap="round" className="opacity-40" />
    <circle cx="32" cy="32" r="15" className="opacity-60" />
    <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
  </svg>
);

const GlyphMoon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinejoin="round" strokeLinecap="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" className="opacity-80" />
    <path d="M17.5 3.2l.55 1.45 1.45.55-1.45.55-.55 1.45-.55-1.45-1.45-.55 1.45-.55z" fill="currentColor" stroke="none" className="opacity-70" />
    <circle cx="20" cy="11.5" r="0.5" fill="currentColor" stroke="none" className="opacity-60" />
  </svg>
);

const GlyphHeart = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinejoin="round" strokeLinecap="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    <circle cx="4.2" cy="4.6" r="0.55" fill="currentColor" stroke="none" className="opacity-50" />
    <circle cx="20.4" cy="4" r="0.55" fill="currentColor" stroke="none" className="opacity-50" />
    <circle cx="12" cy="2.4" r="0.55" fill="currentColor" stroke="none" className="opacity-50" />
  </svg>
);

export const PRODUCTS = [
  {
    id: 1,
    no: '01',
    glyph: <GlyphSilence />,
    name: '深夜11点的10分钟绝对安静',
    en: 'ABSOLUTE SILENCE',
    desc: '隔绝现实的喧嚣与工作群的弹窗。此刻世界属于你。',
  },
  {
    id: 2,
    no: '02',
    glyph: <GlyphMoon />,
    name: '小怪兽熟睡后的天使滤镜',
    en: 'ANGEL FILTER',
    desc: '提取最柔软的记忆。原谅今天所有的兵荒马乱。',
  },
  {
    id: 3,
    no: '03',
    glyph: <GlyphHeart />,
    name: '毫无逻辑的偏爱与肯定',
    en: 'BLIND AFFECTION',
    desc: '你今天已经做得很好了，无需向任何人证明什么。',
  },
];

export const BagIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.5 8h13l-1.2 12.5H6.7L5.5 8Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);
