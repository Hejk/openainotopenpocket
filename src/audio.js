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

/* ============ 沉浸式交付：环境声 ============ */

let ambientNodes = null;

function stopAmbient() {
  if (!ambientNodes) return;
  const { master } = ambientNodes;
  const t = master.context.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(master.gain.value, t);
  master.gain.linearRampToValueAtTime(0, t + 0.6);
  ambientNodes.stops.forEach((s) => setTimeout(s, 700));
  ambientNodes = null;
}

/* 极轻的合成白噪音：像深夜房间里的底噪 */
function startSilence(ctx, master) {
  const src = ctx.createBufferSource();
  const buf = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  src.buffer = buf;
  src.loop = true;
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 450;
  const g = ctx.createGain();
  g.gain.value = 0.016;
  src.connect(lp).connect(g).connect(master);
  src.start();
  return [() => src.stop()];
}

/* 天使滤镜：低沉温暖的持续和弦，极慢呼吸 */
function startAngel(ctx, master) {
  const stops = [];
  [110, 165, 220.5].forEach((f, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = 0;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05 + i * 0.017;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.014;
    lfo.connect(lfoGain).connect(g.gain);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 3);
    osc.connect(g).connect(master);
    osc.start();
    lfo.start();
    stops.push(() => { osc.stop(); lfo.stop(); });
  });
  return stops;
}

/* 心跳脉动：与光晕同步的双峰节律 */
function startHeartbeat(ctx, master) {
  const stops = [];
  const beat = () => {
    if (!ambientNodes || ambientNodes.kind !== 'heartbeat') return;
    const t = ctx.currentTime;
    [[0, 0.05], [0.18, 0.028]].forEach(([delay, vol]) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(58, t + delay);
      osc.frequency.exponentialRampToValueAtTime(40, t + delay + 0.12);
      const env = ctx.createGain();
      env.gain.setValueAtTime(0, t + delay);
      env.gain.linearRampToValueAtTime(vol, t + delay + 0.012);
      env.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.32);
      osc.connect(env).connect(master);
      osc.start(t + delay);
      osc.stop(t + delay + 0.4);
    });
    setTimeout(beat, 2000);
  };
  beat();
  return stops;
}

export function startAmbient(kind) {
  stopAmbient();
  const ctx = ensureAudio();
  if (!ctx || ctx.state !== 'running' || !kind) return;
  const master = ctx.createGain();
  master.gain.value = 1;
  master.connect(ctx.destination);
  const stops =
    kind === 'silence' ? startSilence(ctx, master) :
    kind === 'angel' ? startAngel(ctx, master) :
    kind === 'heartbeat' ? startHeartbeat(ctx, master) : [];
  ambientNodes = { master, stops, kind };
}

export function stopAmbientSound() {
  stopAmbient();
}
