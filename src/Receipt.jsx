import Barcode from './Barcode.jsx';
import { PawStamp } from './data.jsx';

export default function Receipt({ items, count, total, orderNo, note, onReset }) {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const dateStr = d.getFullYear() + '.' + pad(d.getMonth() + 1) + '.' + pad(d.getDate());
  const timeStr = pad(d.getHours()) + ':' + pad(d.getMinutes());
  const D = <div className="border-t border-dashed border-neutral-300 my-4" />;

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
                <p className="text-[15px] tracking-[0.2em] font-semibold">OpenAINotOpenPocket</p>
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

              <div className="flex justify-between items-baseline">
                <span className="text-[13px] font-bold tracking-[0.2em]">合计 TOTAL</span>
                <span className="text-lg font-bold">$0.00</span>
              </div>
              <div className="text-[10.5px] leading-[2.1] text-neutral-600 mt-2">
                <div className="flex justify-between"><span>支付方式</span><span className="text-neutral-900">店长请客 · TREATED</span></div>
                <div className="flex justify-between"><span>找零</span><span className="text-neutral-900">$0.00</span></div>
              </div>
              {D}

              <div className="relative">
                <div className="text-center font-serif italic text-[13px] leading-[2.2] text-neutral-700 px-1">
                  世界很喧嚣，<br />
                  但此刻你是宁静的。<br />
                  <span className="text-neutral-500">您的钱包依然满载，一如您的灵魂。</span>
                </div>

                {/* 猫爪印章：盖在引言上，暗红印泥 */}
                <div
                  className="anim-stamp absolute -top-2 right-0 text-[#a63d2f] opacity-80 select-none"
                  style={{ animationDelay: '1.6s', mixBlendMode: 'multiply' }}
                >
                  <PawStamp size={72} />
                </div>
              </div>

              {/* 店长手写便签 */}
              <div className="anim-note mt-5 mx-1 border border-neutral-200 bg-[#faf9f2] px-5 py-5" style={{ animationDelay: '2.2s' }}>
                <p className="text-[9px] tracking-[0.35em] text-neutral-400 font-mono">FROM THE CAT'S DESK</p>
                <p className="mt-2 font-serif italic text-[12.5px] leading-[2] text-neutral-600">{note}</p>
              </div>
              {D}

              <Barcode seed={42} />
              <p className="text-center text-[10px] tracking-[0.4em] text-neutral-500 mt-2">谢谢惠顾 · THANK YOU</p>
              <p className="text-center text-[9px] tracking-[0.2em] text-neutral-400 mt-2">情绪一经售出 · 概不退换</p>
            </div>
            <div className="zz-bottom" />
          </div>
        </div>

        <button
          data-testid="re-shop"
          onClick={onReset}
          className="anim-float mt-12 mb-6 px-12 py-3.5 border border-neutral-900 text-neutral-900 text-[11px] tracking-[0.4em] hover:bg-neutral-900 hover:text-white transition-all duration-500"
          style={{ animationDelay: '2.8s' }}
        >
          重新购物 · SHOP AGAIN
        </button>
      </div>
    </div>
  );
}
