import './Watermark.css';

const WATERMARK_ICONS = [
  { top: '3%', left: '10%', size: 136, rotate: -18 },
  { top: '6%', left: '82%', size: 120, rotate: -40 },
  { top: '18%', left: '45%', size: 160, rotate: 55 },
  { top: '28%', left: '8%', size: 112, rotate: -60 },
  { top: '32%', left: '70%', size: 144, rotate: 42 },
  { top: '45%', left: '28%', size: 128, rotate: 15 },
  { top: '50%', left: '90%', size: 152, rotate: -28 },
  { top: '62%', left: '12%', size: 136, rotate: 48 },
  { top: '68%', left: '55%', size: 120, rotate: -8 },
  { top: '78%', left: '82%', size: 144, rotate: 25 },
  { top: '88%', left: '20%', size: 128, rotate: -22 },
  { top: '95%', left: '65%', size: 152, rotate: 30 },
];

export default function Watermark() {
  return (
    <div className="watermark" aria-hidden="true">
      {WATERMARK_ICONS.map((icon, i) => (
        <img
          key={i}
          src="/assets/images/logo2.png"
          alt=""
          className="watermark__icon"
          style={{
            top: icon.top,
            left: icon.left,
            width: icon.size,
            transform: `rotate(${icon.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
