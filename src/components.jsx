import { PRODUCTS, BagIcon } from './data.jsx';

export function Header({ count, onCart }) {
  return (
    <header className="fixed top-0 inset-x-0 z-30 bg-white/85 backdrop-blur-md border-b border-neutral-200/70">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <span className="text-[13px] tracking-[0.22em] font-medium text-neutral-900 select-none">
          Priceless<sup className="text-[8px] align-super">™</sup><span className="text-neutral-400">.</span>
        </span>
        <button
          data-testid="cart-btn"
          aria-label="购物车"
          onClick={onCart}
          className="relative p-2 -m-2 text-neutral-800 hover:text-black transition-colors duration-500"
        >
          <BagIcon />
          {count > 0 && (
            <span
              key={count}
              className="anim-pop absolute top-0 right-0 min-w-[17px] h-[17px] px-1 rounded-full bg-neutral-900 text-white text-[10px] font-mono flex items-center justify-center"
            >
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="pt-40 pb-24 md:pt-52 md:pb-32 px-8 text-center">
      <p className="anim-fade-up text-[10px] md:text-[11px] font-mono tracking-[0.55em] text-neutral-400" style={{ animationDelay: '100ms' }}>
        EMOTIONAL LUXURY · EST. 2026
      </p>
      <h1 className="anim-fade-up mt-8 font-extralight text-4xl md:text-6xl lg:text-7xl leading-tight tracking-wide" style={{ animationDelay: '250ms' }}>
        情绪，<br />现已上架。
      </h1>
      <p className="anim-fade-up mt-10 text-sm md:text-[15px] font-light text-neutral-500 leading-loose max-w-md mx-auto" style={{ animationDelay: '450ms' }}>
        纯粹的宁静。无条件的偏爱。<br />
        100% 灵魂提取。
      </p>
      <div className="anim-fade-up mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-mono tracking-[0.3em] text-neutral-400" style={{ animationDelay: '600ms' }}>
        <span>EMOTIONS IN STOCK</span>
        <span className="text-neutral-300">·</span>
        <span>NO ADS</span>
        <span className="text-neutral-300">·</span>
        <span className="anim-breathe inline-block" style={{ animationDuration: '4s' }}>WORTH EVERY PENNY</span>
      </div>
      <div className="anim-line mt-16 md:mt-24 mx-auto bg-neutral-200" style={{ height: '1px', width: 'min(560px, 80%)' }} />
    </section>
  );
}

function ProductCard({ p, i, onAdd, added }) {
  const isAdded = added === p.id;
  return (
    <article
      className="anim-fade-up group flex flex-col border border-neutral-200/80 hover:border-neutral-900 p-8 md:p-10 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.12)]"
      style={{ animationDelay: (350 + i * 160) + 'ms' }}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[11px] text-neutral-300">{p.no}</span>
        <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-400">{p.en}</span>
      </div>

      <div className="mt-10 mb-12 flex justify-center text-neutral-300 group-hover:text-neutral-900 transition-colors duration-700">
        <div className="anim-breathe" style={{ animationDelay: (i * 700) + 'ms' }}>{p.glyph}</div>
      </div>

      <h3 className="text-lg font-light tracking-wide text-neutral-900 leading-relaxed">{p.name}</h3>
      <p className="mt-3 text-[13px] font-light text-neutral-400 leading-loose">{p.desc}</p>

      <div className="mt-8 pt-6 border-t border-neutral-100 flex items-baseline justify-between">
        <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400">PRICE</span>
        <span className="text-xl font-extralight">${p.price.toFixed(2)}</span>
      </div>

      <button
        data-testid={'add-btn-' + p.id}
        onClick={() => onAdd(p.id)}
        className={
          'mt-6 py-3.5 text-[11px] tracking-[0.35em] border transition-all duration-500 ' +
          (isAdded
            ? 'bg-neutral-900 text-white border-neutral-900'
            : 'border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white')
        }
      >
        {isAdded ? '已收下 · THANK YOU' : '加入购物车 · ADD'}
      </button>
    </article>
  );
}

export function ProductGrid({ onAdd, added }) {
  return (
    <section className="max-w-6xl mx-auto px-8 pb-32 md:pb-44">
      <div className="anim-fade-up flex items-baseline justify-between pb-8" style={{ animationDelay: '250ms' }}>
        <h2 className="text-sm font-light tracking-[0.3em] text-neutral-900">
          今日贩售
          <span className="ml-3 font-mono text-[10px] tracking-[0.3em] text-neutral-300">NOW SELLING</span>
        </h2>
        <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 hidden sm:block">共 3 件 · 全球限量 · 售完即止</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} p={p} i={i} onAdd={onAdd} added={added} />
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-neutral-100 py-16 px-8 text-center">
      <p className="anim-fade text-[13px] tracking-[0.2em] font-light text-neutral-900">
        Priceless<sup className="text-[8px] align-super">™</sup><span className="text-neutral-400">.</span>
      </p>
      <p className="anim-fade mt-5 text-[11px] font-light text-neutral-400 tracking-wider" style={{ animationDelay: '150ms' }}>
        世界很喧嚣，所幸宁静无价。
      </p>
      <div className="anim-fade mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-mono tracking-[0.25em] text-neutral-400" style={{ animationDelay: '300ms' }}>
        <span>配送 · 情绪即时送达</span>
        <span className="text-neutral-300">/</span>
        <span>售后 · 概不退换</span>
        <span className="text-neutral-300">/</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
