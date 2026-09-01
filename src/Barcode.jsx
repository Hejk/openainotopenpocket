/* 伪造条形码：确定性伪随机，黑条宽窄不一 */
export default function Barcode({ seed = 7 }) {
  let s = seed;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const bars = Array.from({ length: 46 }, () => 1 + Math.floor(rnd() * 3));
  return (
    <div className="flex items-stretch justify-center" style={{ gap: '2px', height: '44px' }}>
      {bars.map((w, i) => (
        <div key={i} className="bg-neutral-900" style={{ width: w + 'px' }} />
      ))}
    </div>
  );
}
