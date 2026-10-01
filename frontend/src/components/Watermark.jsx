import './Watermark.css';

const WATERMARK_ICONS = [
  { top: '2%', left: '8%', size: 34, rotate: -18 },
  { top: '5%', left: '42%', size: 46, rotate: 24 },
  { top: '4%', left: '78%', size: 30, rotate: -40 },
  { top: '12%', left: '20%', size: 40, rotate: 55 },
  { top: '15%', left: '60%', size: 28, rotate: -12 },
  { top: '18%', left: '92%', size: 38, rotate: 33 },
  { top: '24%', left: '5%', size: 44, rotate: -60 },
  { top: '28%', left: '48%', size: 32, rotate: 15 },
  { top: '30%', left: '85%', size: 50, rotate: -28 },
  { top: '36%', left: '28%', size: 36, rotate: 42 },
  { top: '40%', left: '68%', size: 30, rotate: -8 },
  { top: '44%', left: '10%', size: 42, rotate: 20 },
  { top: '48%', left: '90%', size: 34, rotate: -45 },
  { top: '52%', left: '38%', size: 46, rotate: 10 },
  { top: '56%', left: '58%', size: 28, rotate: -33 },
  { top: '60%', left: '16%', size: 38, rotate: 48 },
  { top: '64%', left: '80%', size: 32, rotate: -15 },
  { top: '68%', left: '45%', size: 44, rotate: 25 },
  { top: '72%', left: '6%', size: 30, rotate: -50 },
  { top: '76%', left: '72%', size: 40, rotate: 18 },
  { top: '80%', left: '30%', size: 34, rotate: -22 },
  { top: '84%', left: '94%', size: 36, rotate: 38 },
  { top: '88%', left: '14%', size: 42, rotate: -10 },
  { top: '92%', left: '55%', size: 30, rotate: 30 },
  { top: '96%', left: '82%', size: 38, rotate: -42 },
  { top: '98%', left: '24%', size: 32, rotate: 14 },
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
