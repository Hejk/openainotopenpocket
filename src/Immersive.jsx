import { useState, useEffect, useRef } from 'react';
import { EXPERIENCES } from './data.jsx';
import { ensureAudio, startAmbient, stopAmbientSound } from './audio.js';

/* 沉浸式交付页：全黑 + 呼吸光晕 + 真实时长倒计时。ESC / 点击安静离开 */
export default function Immersive({ productId, onExit }) {
  const conf = EXPERIENCES[productId];
  const [remain, setRemain] = useState(conf.duration);
  const [ended, setEnded] = useState(false);
  const startRef = useRef(Date.now());

  useEffect(() => {
    ensureAudio();
    startAmbient(conf.sound);
    return () => stopAmbientSound();
  }, [conf.sound]);

  useEffect(() => {
    const timer = setInterval(() => {
      const passed = Math.floor((Date.now() - startRef.current) / 1000);
      const left = conf.duration - passed;
      if (left <= 0) {
        setRemain(0);
        setEnded(true);
        stopAmbientSound();
        clearInterval(timer);
      } else {
        setRemain(left);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [conf.duration]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onExit(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onExit]);

  const mm = String(Math.floor(remain / 60)).padStart(2, '0');
  const ss = String(remain % 60).padStart(2, '0');

  return (
    <div
      data-testid="immersive"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-1000"
      style={{ background: conf.bg }}
    >
      <div
        className={`w-[46vmin] h-[46vmin] rounded-full ${conf.haloClass}`}
        style={{ background: conf.halo }}
      />

      {!ended && (
        <>
          <p className="absolute top-10 font-mono text-[10px] tracking-[0.5em] text-white/25 select-none">
            {mm} : {ss}
          </p>
          <p
            className="absolute bottom-10 font-mono text-[9px] tracking-[0.4em] text-white/20 select-none cursor-pointer hover:text-white/40 transition-colors duration-700"
            onClick={onExit}
          >
            ESC · 随时安静离开
          </p>
        </>
      )}

      {ended && (
        <div className="anim-fade-up absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <p className="font-light text-lg md:text-xl leading-loose text-white/80 max-w-md">
            {conf.ending}
          </p>
          <button
            data-testid="immersive-done"
            onClick={onExit}
            className="anim-float mt-14 px-10 py-3 border border-white/30 text-white/70 text-[11px] tracking-[0.4em] hover:border-white/70 hover:text-white/90 transition-all duration-700"
            style={{ animationDelay: '2.2s' }}
          >
            收下 · KEEP
          </button>
        </div>
      )}
    </div>
  );
}
