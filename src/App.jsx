import { useState, useEffect } from 'react';
import React from 'react';
import { PRODUCTS, CHECKOUT_STEPS } from './data.jsx';
import { Header, Hero, ProductGrid, Footer } from './components.jsx';
import CartSidebar from './CartSidebar.jsx';
import CheckoutOverlay from './CheckoutOverlay.jsx';
import Receipt from './Receipt.jsx';
import { ensureAudio, playDing, playPaperFeed } from './audio.js';

export default function App() {
  const [phase, setPhase] = useState('shop');   // shop | checkout | receipt
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [added, setAdded] = useState(null);
  const [orderNo] = useState(() => String(Math.floor(10000 + Math.random() * 90000)));

  const count = cart.reduce((a, c) => a + c.qty, 0);
  const items = cart.map((c) => ({ ...PRODUCTS.find((p) => p.id === c.id), qty: c.qty }));
  const total = items.reduce((a, it) => a + it.price * it.qty, 0);

  useEffect(() => { window.scrollTo(0, 0); }, [phase]);

  useEffect(() => {
    const lock = cartOpen || phase === 'checkout';
    document.body.style.overflow = lock ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen, phase]);

  /* 结账流程：每 1.5s 切换一句话，最后一句停留后出票 */
  useEffect(() => {
    if (phase !== 'checkout') return;
    ensureAudio();  /* 最后一次确保上下文唤醒，出票时才能发声 */
    const isLast = step === CHECKOUT_STEPS.length - 1;
    const t = setTimeout(
      () => (isLast ? setPhase('receipt') : setStep((s) => s + 1)),
      isLast ? 2200 : 1500
    );
    return () => clearTimeout(t);
  }, [phase, step]);

  /* 出票瞬间的音效：叮 → 沙沙 */
  useEffect(() => {
    if (phase !== 'receipt') return;
    playDing();
    const t = setTimeout(playPaperFeed, 350);
    return () => clearTimeout(t);
  }, [phase]);

  const addToCart = (id) => {
    ensureAudio();  /* 用户点击时解锁音频上下文 */
    setCart((prev) => {
      const hit = prev.find((c) => c.id === id);
      return hit
        ? prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c))
        : [...prev, { id, qty: 1 }];
    });
    setAdded(id);
    setTimeout(() => setAdded((a) => (a === id ? null : a)), 1300);
  };

  const inc = (id) => setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c)));
  const dec = (id) => setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c)).filter((c) => c.qty > 0));

  const checkout = () => {
    ensureAudio();
    setCartOpen(false);
    setStep(0);
    setPhase('checkout');
  };
  const reset = () => { setCart([]); setStep(0); setPhase('shop'); };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      {phase === 'shop' && (
        <React.Fragment>
          <Header count={count} onCart={() => setCartOpen(true)} />
          <main>
            <Hero />
            <ProductGrid onAdd={addToCart} added={added} />
          </main>
          <Footer />
        </React.Fragment>
      )}

      {phase === 'checkout' && <CheckoutOverlay step={step} />}
      {phase === 'receipt' && <Receipt items={items} count={count} total={total} orderNo={orderNo} onReset={reset} />}

      <CartSidebar
        open={cartOpen && phase === 'shop'}
        items={items}
        count={count}
        total={total}
        onClose={() => setCartOpen(false)}
        onInc={inc}
        onDec={dec}
        onCheckout={checkout}
      />
    </div>
  );
}
