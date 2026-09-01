import { useEffect } from 'react';

let audioCtx = null;

/* 浏览器自动播放策略：音频上下文必须在用户点击时唤醒 */
export function ensureAudio() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!audioCtx) {
    try { audioCtx = new AC(); } catch (e) { return null; }
  }
  if (audioCtx.state === 'suspended') Promise.resolve(audioCtx.resume()).catch(() => {});
  return audioCtx;
}

/* 老式打印机出纸的「沙沙」：带通噪声 + 频率抖动，贴合 1.9s 出票动画 */
export function playPaperFeed() {
  const ctx = ensureAudio();
  if (!ctx || ctx.state !== 'running') return;
  const dur = 1.8;
  const t = ctx.currentTime;
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 2200;
  bp.Q.value = 0.7;
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 11;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 500;
  lfo.connect(lfoGain).connect(bp.frequency);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.03, t + 0.12);
  g.gain.setValueAtTime(0.03, t + dur - 0.45);
  g.gain.linearRampToValueAtTime(0, t + dur);
  src.connect(bp);
  bp.connect(g);
  g.connect(ctx.destination);
  src.start(t);
  src.stop(t + dur);
  lfo.start(t);
  lfo.stop(t + dur);
}

/* 收银铃「叮」：非谐分音，快攻击慢衰减，音量极弱 */
export function playDing() {
  const ctx = ensureAudio();
  if (!ctx || ctx.state !== 'running') return;
  const t = ctx.currentTime;
  [[1244, 0.045, 1.6], [3111, 0.02, 0.9], [4662, 0.01, 0.5]].forEach(([f, vol, dur]) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = f;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(vol, t + 0.004);
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(env).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  });
}
