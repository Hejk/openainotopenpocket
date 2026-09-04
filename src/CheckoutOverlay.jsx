import { CHECKOUT_STEPS } from './data.jsx';

export default function CheckoutOverlay({ step }) {
  const last = step === CHECKOUT_STEPS.length - 1;
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center anim-fade"
      style={{ background: 'radial-gradient(circle at 50% 42%, #171717 0%, #0a0a0a 72%)' }}
    >
      <div className="w-14 h-14 rounded-full border border-white/25 anim-breathe" />
      <div className="h-12 md:h-14 mt-14 flex items-center">
        <p
          key={step}
          className={
            last
              ? 'anim-msg-final text-xl md:text-3xl font-extralight text-neutral-100 tracking-[0.3em]'
              : 'anim-msg text-lg md:text-2xl font-extralight text-neutral-300 tracking-[0.25em]'
          }
        >
          {CHECKOUT_STEPS[step]}
        </p>
      </div>
      <div className="mt-10 flex items-center gap-4 font-mono text-[10px] tracking-[0.4em] text-neutral-600">
        <span>OPENAINOTOPENPOCKET</span>
        <span className="text-neutral-800">|</span>
        <span>TOTAL $0.00</span>
      </div>
      {last && (
        <p className="anim-fade mt-6 font-mono text-[10px] tracking-[0.35em] text-neutral-500" style={{ animationDelay: '500ms' }}>
          THE CAT IS TREATING YOU · 店长请客
        </p>
      )}
    </div>
  );
}
