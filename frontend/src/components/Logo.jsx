import './Logo.css';

const COIN_SRC = '/assets/images/logo-coin.png';

// Gold treble-clef coin (Logo 2) that flips in 3D, next to the school name as live text.
export default function Logo({ className = '' }) {
  return (
    <span className={'logo ' + className} role="img" aria-label="Shraddha's Music Academy">
      <span className="logo__coin-stage" aria-hidden="true">
        <span className="logo__coin">
          <img src={COIN_SRC} alt="" className="logo__face" draggable="false" />
          <img src={COIN_SRC} alt="" className="logo__face logo__face--back" draggable="false" />
        </span>
      </span>
      <span className="logo__wordmark" aria-hidden="true">
        <span>Shraddha&rsquo;s</span>
        <span>Music Academy</span>
      </span>
    </span>
  );
}
