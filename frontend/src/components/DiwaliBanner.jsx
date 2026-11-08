import { useEffect, useState } from 'react';
import './DiwaliBanner.css';

/*
 * Seasonal Diwali greeting, shown on every page under the header.
 * It hides itself automatically after SHOW_UNTIL, and visitors can close it
 * (remembered for the rest of their visit). Its festive fonts load only
 * while the banner is showing.
 */

const SHOW_UNTIL = new Date('2026-11-13T00:00:00'); // through the five days of Diwali
const DISMISS_KEY = 'diwali-2026-dismissed';
const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Yatra+One&family=Kalam:wght@400;700&display=swap';

function isDismissed() {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

function Diya({ className }) {
  return (
    <svg className={'diwali__diya ' + (className || '')} viewBox="0 0 64 64" aria-hidden="true">
      <path className="diwali__flame" d="M32 6c5 8 8 12 8 18a8 8 0 0 1-16 0c0-6 3-10 8-18z" />
      <path className="diwali__flame-core" d="M32 16c2.5 4 4 6 4 9a4 4 0 0 1-8 0c0-3 1.5-5 4-9z" />
      <path className="diwali__lamp" d="M6 38h52c-2 12-12 20-26 20S8 50 6 38z" />
      <path className="diwali__lamp-rim" d="M4 36h56v4H4z" />
      <circle className="diwali__lamp-dot" cx="20" cy="47" r="2" />
      <circle className="diwali__lamp-dot" cx="32" cy="50" r="2" />
      <circle className="diwali__lamp-dot" cx="44" cy="47" r="2" />
    </svg>
  );
}

export default function DiwaliBanner() {
  const [visible, setVisible] = useState(() => new Date() < SHOW_UNTIL && !isDismissed());

  useEffect(() => {
    if (!visible || document.querySelector(`link[href="${FONT_HREF}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, [visible]);

  if (!visible) return null;

  function close() {
    setVisible(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* storage unavailable: just hide for now */
    }
  }

  return (
    <section className="diwali" aria-label="Happy Diwali">
      <div className="diwali__inner">
        <Diya className="diwali__diya--left" />
        <div className="diwali__text">
          <p className="diwali__title">
            <span lang="hi">शुभ दीपावली</span>
            <span className="diwali__sep" aria-hidden="true">✦</span>
            Happy Diwali!
          </p>
          <p className="diwali__wish">May the festival of lights fill your home with joy, warmth and music.</p>
        </div>
        <Diya className="diwali__diya--right" />
      </div>
      <button type="button" className="diwali__close" aria-label="Close Diwali greeting" onClick={close}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </section>
  );
}
