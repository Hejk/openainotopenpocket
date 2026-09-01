import React from 'react';
import { BagIcon } from './data.jsx';

export default function CartSidebar({ open, items, count, onClose, onInc, onDec, onCheckout }) {
  return (
    <React.Fragment>
      <div
        onClick={onClose}
        className={'fixed inset-0 z-40 transition-opacity duration-700 ' + (open ? 'opacity-100' : 'opacity-0 pointer-events-none')}
        style={{ background: 'rgba(10,10,10,0.28)', backdropFilter: 'blur(3px)' }}
      />
      <aside
        data-testid="cart-panel"
        className={
          'fixed top-0 right-0 z-50 h-full w-full sm:w-[430px] bg-white flex flex-col transition-transform duration-700 ' +
          (open ? 'translate-x-0' : 'translate-x-full')
        }
        style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
      >
        <div className="flex items-center justify-between px-8 h-20 border-b border-neutral-100 shrink-0">
          <div>
            <span className="text-sm font-light tracking-[0.3em]">购物车</span>
            <span className="ml-3 font-mono text-[10px] tracking-[0.3em] text-neutral-400">CART ({count})</span>
          </div>
          <button
            data-testid="cart-close"
            onClick={onClose}
            aria-label="关闭"
            className="w-9 h-9 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors duration-500"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1"><path d="M1 1l12 12M13 1L1 13" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center anim-fade">
              <div className="text-neutral-200"><BagIcon size={56} /></div>
              <p className="mt-8 text-sm font-light text-neutral-500">空空如也。</p>
              <p className="mt-2 text-[12px] font-light text-neutral-400">您的焦虑，暂未结账。</p>
            </div>
          ) : (
            <ul>
              {items.map((it) => (
                <li key={it.id} className="py-8 border-b border-neutral-100 anim-fade">
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="text-[15px] font-light text-neutral-900 leading-relaxed">{it.name}</h4>
                    <span className="font-mono text-sm font-light text-neutral-900 shrink-0">$0.00</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <button onClick={() => onDec(it.id)} aria-label="减少数量" className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors duration-300 text-sm">−</button>
                      <span className="font-mono text-xs text-neutral-900 w-4 text-center">{it.qty}</span>
                      <button onClick={() => onInc(it.id)} aria-label="增加数量" className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors duration-300 text-sm">+</button>
                    </div>
                    <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-300">{it.en}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-8 py-7 border-t border-neutral-100 shrink-0">
          <div className="flex items-baseline justify-between mb-5">
            <span className="text-[11px] font-mono tracking-[0.3em] text-neutral-400">合计 TOTAL</span>
            <span className="text-2xl font-extralight">$0.00</span>
          </div>
          <button
            data-testid="checkout-btn"
            onClick={onCheckout}
            disabled={count === 0}
            className="w-full py-4 bg-neutral-900 text-white text-[11px] tracking-[0.4em] hover:bg-black transition-all duration-500 disabled:opacity-25 disabled:cursor-not-allowed"
          >
            去结算 · CHECKOUT
          </button>
          <p className="mt-4 text-center text-[10px] font-light text-neutral-400 tracking-wider">本店仅支持「宁静」支付</p>
        </div>
      </aside>
    </React.Fragment>
  );
}
