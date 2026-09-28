import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const MAX_LOOPS = 5;

const HERO_NOTES = [
  { top: '6%', left: '58%', size: 30, rotate: -12, symbol: '♪' },
  { top: '12%', left: '88%', size: 48, rotate: 8, symbol: '♫' },
  { top: '28%', left: '72%', size: 22, rotate: 20, symbol: '♩' },
  { top: '38%', left: '92%', size: 34, rotate: -6, symbol: '♬' },
  { top: '52%', left: '62%', size: 26, rotate: 14, symbol: '♪' },
  { top: '64%', left: '82%', size: 40, rotate: -18, symbol: '♫' },
  { top: '80%', left: '68%', size: 24, rotate: 10, symbol: '♩' },
  { top: '85%', left: '94%', size: 30, rotate: -8, symbol: '♪' },
  { top: '10%', left: '10%', size: 20, rotate: 16, symbol: '♬' },
  { top: '70%', left: '6%', size: 26, rotate: -14, symbol: '♫' },
];

const CTA_NOTES = [
  { top: '15%', left: '8%', size: 26, rotate: -10, symbol: '♪' },
  { top: '65%', left: '14%', size: 34, rotate: 12, symbol: '♫' },
  { top: '20%', left: '90%', size: 30, rotate: 8, symbol: '♬' },
  { top: '70%', left: '86%', size: 22, rotate: -16, symbol: '♩' },
];

function MusicNotesBackground({ notes, className }) {
  return (
    <div className={className} aria-hidden="true">
      {notes.map((note, i) => (
        <span
          key={i}
          className="music-note"
          style={{
            top: note.top,
            left: note.left,
            fontSize: note.size,
            transform: `rotate(${note.rotate}deg)`,
          }}
        >
          {note.symbol}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const playCountRef = useRef(0);

  function handleVideoEnded(e) {
    playCountRef.current += 1;
    const video = e.currentTarget;
    if (playCountRef.current < MAX_LOOPS) {
      video.currentTime = 0;
      video.play();
    }
  }

  return (
    <>
      <section className="intro-video">
        <div className="intro-video__frame">
          <video
            autoPlay
            muted
            controls
            playsInline
            poster="/assets/images/video-poster.svg"
            src="/assets/videos/intro-piano.mp4"
            onEnded={handleVideoEnded}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="hero page-section">
        <MusicNotesBackground notes={HERO_NOTES} className="hero__notes-bg" />
        <div className="container hero__inner">
          <p className="hero__eyebrow">Online Piano Lessons for Ages 4–10</p>
          <h1 className="hero__title">Piano lessons your child will actually look forward to.</h1>
          <p className="hero__subtext">
            Live, one-on-one online piano instruction designed for young beginners — building
            sight-reading, coordination and rhythm through a curriculum built around how kids
            actually learn.
          </p>
          <p className="hero__note">
            For new students only schedule a 30 minutes free assessment session. Click How it
            works and follow instructions
          </p>
          <div className="hero__ctas">
            <Link to="/courseware" className="btn btn-primary">
              View courses
            </Link>
            <Link to="/how-it-works" className="btn btn-secondary">
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <MusicNotesBackground notes={CTA_NOTES} className="cta-band__notes-bg" />
        <div className="container cta-band__inner">
          <h2>Any questions please contact us.</h2>
          <Link to="/contact" className="btn btn-gold">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
