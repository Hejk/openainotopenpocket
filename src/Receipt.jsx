import { useEffect, useRef } from 'react';
import Barcode from './Barcode.jsx';
import { PawStamp } from './data.jsx';

export default function Receipt({ items, count, total, orderNo, note, issued, claimed, onReset, onClaim }) {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const dateStr = d.getFullYear() + '.' + pad(d.getMonth() + 1) + '.' + pad(d.getDate());
  const timeStr = pad(d.getHours()) + ':' + pad(d.getMinutes());
  const D = <div className="border-t border-dashed border-neutral-300 my-4" />;
  const couponRef = useRef(null);

  /* 出票戏剧完成后（爪印 1.4s + 批注 1.9s），把取货联轻轻送到眼前 */
  useEffect(() => {
    const t = setTimeout(() => {
      const el = couponRef.current;
      if (!el) return;
      const scroller = el.closest('.overflow-y-auto');
      if (el.getBoundingClientRect().bottom <= window.innerHeight) return;      /* 已在视野内 */
      if (scroller && scroller.scrollTop > 60) return;                          /* 用户已自己滚动 */
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 3200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: 'radial-gradient(circle at 50% 18%, #f6f6f4 0%, #e7e7e4 75%)' }}>
      <div className="min-h-full flex flex-col items-center justify-center py-14 px-4">
        <p className="anim-fade font-mono text-[10px] tracking-[0.5em] text-neutral-400 mb-8">YOUR RECEIPT · 请惠存</p>

        <div className="w-full flex flex-col items-center" style={{ filter: 'drop-shadow(0 30px 45px rgba(0,0,0,0.16))' }}>
          {/* 打印机出票口 */}
          <div className="w-64 h-2.5 bg-neutral-800 rounded-full relative z-10" style={{ boxShadow: '0 3px 8px rgba(0,0,0,0.3)' }} />

          <div data-testid="receipt" className="anim-print w-[340px] max-w-full bg-white">
            <div className="zz-top" />
            <div className="px-7 pt-8 pb-7 font-mono text-neutral-900">
              <Barcode seed={17} />
              <p className="text-center text-[10px] tracking-[0.35em] text-neutral-500 mt-2">0 7240 1963 {orderNo}</p>

              <div className="mt-7 text-center">
                <p className="text-[15px] tracking-[0.2em] font-semibold">Priceless™</p>
                <p className="text-[9px] tracking-[0.6em] text-neutral-500 mt-1.5">R E C E I P T</p>
              </div>

              {D}
              <div className="text-[10.5px] leading-[2.1] text-neutral-600">
                <div className="flex justify-between"><span>订单时间</span><span className="text-neutral-900">{dateStr} {timeStr}</span></div>
                <div className="flex justify-between"><span>订单编号</span><span className="text-neutral-900">No. {orderNo}</span></div>
                <div className="flex justify-between"><span>收银员</span><span className="text-neutral-900">店长 · 一只猫</span></div>
              </div>
              {D}

              <div className="text-[11px] leading-[2.4]">
                {items.map((it) => (
                  <div key={it.id} className="flex justify-between items-baseline gap-3">
                    <span className="text-neutral-900">
                      {it.name}<span className="text-neutral-400 ml-2">×{it.qty}</span>
                    </span>
                    <span className="shrink-0">${(it.price * it.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-neutral-500 mt-1">
                  <span>件数 QTY</span><span>{count}</span>
                </div>
              </div>
              {D}

              <div className="flex justify-between items-baseline">
                <span className="text-[11px] tracking-[0.2em] text-neutral-500">小计 SUBTOTAL</span>
                <span className="text-[13px] text-neutral-500">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-baseline mt-2">
                <span className="text-[11px] tracking-[0.1em] text-neutral-500">店长特批 CAT'S DISCOUNT</span>
                <span className="text-[13px] text-neutral-500 line-through decoration-1">-${total.toFixed(2)}</span>
              </div>
              {D}

              <div className="relative">
                <div className="flex justify-between items-baseline">
                  <span className="text-[13px] font-bold tracking-[0.2em]">合计 TOTAL</span>
                  <span className="text-lg font-bold">$0.00</span>
                </div>
                <div className="text-[10.5px] leading-[2.1] text-neutral-600 mt-2">
                  <div className="flex justify-between"><span>支付方式</span><span className="text-neutral-900">店长请客 · TREATED</span></div>
                  <div className="flex justify-between"><span>找零</span><span className="text-neutral-900">$0.00</span></div>
                </div>

                {/* 猫爪印章：砰地盖在合计行上，暗红印泥 */}
                <div
                  className="anim-stamp absolute -top-4 right-6 text-[#a63d2f] opacity-90 select-none pointer-events-none"
                  style={{ animationDelay: '1.4s', mixBlendMode: 'multiply' }}
                >
                  <PawStamp size={64} />
                </div>
                {/* 店长盲盒便签：每次结账随机一句，从爪印下方浮现 */}
                <p className="anim-note mt-1 text-right font-serif italic text-[11.5px] text-[#a63d2f] opacity-80" style={{ animationDelay: '1.9s' }}>
                  {note}
                </p>
              </div>
              {D}

              <div className="text-center font-serif italic text-[13px] leading-[2.2] text-neutral-700 px-1">
                世界很喧嚣，<br />
                但此刻你是宁静的。<br />
                <span className="text-neutral-500">您的钱包依然满载，一如您的灵魂。</span>
              </div>
              {D}

              <Barcode seed={42} />
              <p className="text-center text-[10px] tracking-[0.4em] text-neutral-500 mt-2">谢谢惠顾 · THANK YOU</p>
              {issued && (
                <p className="text-center text-[10px] tracking-[0.2em] text-neutral-400 mt-2">
                  您是第 {issued} 位把宁静带走的人
                </p>
              )}
              <p className="text-center text-[9px] tracking-[0.2em] text-neutral-400 mt-2">情绪一经售出 · 概不退换</p>

              {/* ====== 取货联：钉在小票下方的虚线撕票，凭票领取 ====== */}
              <div ref={couponRef} data-testid="claim-coupon" className="mt-7 pt-5 border-t border-dashed border-neutral-300">
                <p className="font-mono text-[9px] tracking-[0.45em] text-neutral-400 text-center">取货联 · CLAIM</p>
                <div className="mt-4 flex flex-col gap-2.5">
                  {items.map((it) => (
                    <button
                      key={it.id}
                      data-testid={'claim-' + it.id}
                      onClick={() => onClaim(it.id)}
                      className={
                        'flex items-center justify-between px-4 py-3 border text-left transition-all duration-500 ' +
                        (claimed.includes(it.id)
                          ? 'border-neutral-200 text-neutral-300 cursor-default'
                          : 'border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white')
                      }
                    >
                      <span className="text-[11px] tracking-[0.15em]">{it.name}</span>
                      <span className="font-mono text-[9px] tracking-[0.3em] shrink-0 ml-3">
                        {claimed.includes(it.id) ? '已领取' : '取货 →'}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-center text-[9px] font-light text-neutral-400 leading-relaxed">
                  凭本联进入对应体验。领取后小票保留，可随时再次进入。
                </p>
              </div>
            </div>
            <div className="zz-bottom" />
          </div>
        </div>

        <button
          data-testid="re-shop"
          onClick={onReset}
          className="anim-float mt-10 mb-6 px-12 py-3.5 border border-neutral-900 text-neutral-900 text-[11px] tracking-[0.4em] hover:bg-neutral-900 hover:text-white transition-all duration-500"
          style={{ animationDelay: '2.8s' }}
        >
          重新购物 · SHOP AGAIN
        </button>
      </div>
    </div>
  );
}
