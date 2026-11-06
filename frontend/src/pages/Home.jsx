import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

/*
 * Home — "Clear first screen" layout.
 * The headline, pitch and main button are visible straight away, next to an
 * introduction to Shraddha. Getting started and pricing follow right away,
 * then the course levels, why it works, and the intro video (which only
 * loads when someone presses play). Every section links to a next page.
 */

const TRUST = ['Free 30-minute assessment', '45-minute live lessons', 'From $35 a class'];

const WHY = [
  {
    title: 'Games that make you think',
    text: 'Notation, rhythm and both hands, learned through play instead of repetition.',
  },
  {
    title: 'Listening that opens your ears',
    text: 'Ear-training exercises so you hear music, not just read it.',
  },
  {
    title: 'Small wins, real confidence',
    text: 'Victories, big and small, that stack up into genuine confidence.',
  },
];

const LEVELS = [
  { n: 0, category: 'Early beginner', name: 'Foundations', focus: 'Instrument comfort, rhythm and listening skills.' },
  { n: 1, category: 'Beginner', name: 'Beginning Reading', focus: 'Staff reading and five-finger hand positions.' },
  { n: 2, category: 'Late beginner', name: 'Expanding Hand Position', focus: 'Beyond five fingers: technique and musicality.' },
  { n: 3, category: 'Intermediate', name: 'Building Independence', focus: 'Scales, chords and music theory fundamentals.' },
];

const STEPS = [
  { title: 'Request a free assessment', text: 'Fill in a short form and pick the time slots that suit you.' },
  { title: 'Meet Shraddha online', text: 'A 30-minute session on Microsoft Teams to see where you are.' },
  { title: 'Get your class plan', text: 'Receive a personalized plan by email, then book your lessons.' },
];

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

function Play() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <section className="home-hero">
        <div className="container home-hero__inner">
          <div className="home-hero__text">
            <span className="home-hero__chip">Live 1:1 online · Open to all ages</span>
            <h1 className="home-hero__title">Piano lessons for new musicians, taught live and one-on-one</h1>
            <p className="home-hero__lead">
              Fun first, skills second. Every plan is built around how you learn, from your very first note.
            </p>
            <div className="home-hero__ctas">
              <Link to="/pre-registration" className="btn btn-gold home-hero__btn">
                Book your free 30-min assessment
              </Link>
              <Link to="/how-it-works" className="btn btn-secondary home-hero__btn">
                See how it works
              </Link>
            </div>
            <ul className="home-hero__trust">
              {TRUST.map((t) => (
                <li key={t}>
                  <Check />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <section className="home-meet" aria-labelledby="home-meet">
            <img
              src="/assets/images/instructor-photo.png"
              alt="Shraddha, founder and piano instructor"
              className="home-meet__photo"
              width="640"
              height="640"
              fetchpriority="high"
            />
            <div className="home-meet__text">
              <h2 id="home-meet" className="home-meet__title">Meet your teacher, Shraddha</h2>
              <p className="home-meet__quote">
                “Piano should never feel like work. It should feel like falling in love with something beautiful.”
              </p>
              <p className="home-meet__bio">
                She fell in love with piano at 12 and came back to it in her 30s, so she knows what it's like to
                start, and to start again.
              </p>
              <Link to="/about" className="home-meet__link">Read her story</Link>
            </div>
          </section>
        </div>
      </section>

      <div className="container home-sections">
        <section className="home-section" aria-labelledby="home-steps">
          <div className="home-section__head">
            <h2 id="home-steps" className="home-section__title">Getting started takes three steps</h2>
            <Link to="/how-it-works" className="home-section__link">See every step</Link>
          </div>
          <ol className="home-steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="home-step">
                <span className="home-step__num">{i + 1}</span>
                <span className="home-step__body">
                  <strong className="home-step__title">{s.title}</strong>
                  <span className="home-step__text">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="home-price" aria-labelledby="home-price">
          <div className="home-price__text">
            <h2 id="home-price" className="home-price__title">From $35 a class, or $120 a month</h2>
            <p className="home-price__note">
              45-minute live lessons. The first 30-minute assessment is free. <Link to="/pricing">See pricing</Link>
            </p>
          </div>
          <Link to="/pre-registration" className="btn btn-primary home-hero__btn">
            Book your free assessment
          </Link>
        </section>

        <section className="home-section" aria-labelledby="home-levels">
          <div className="home-section__head">
            <h2 id="home-levels" className="home-section__title">Where would you start?</h2>
            <Link to="/courseware" className="home-section__link">Explore all course levels</Link>
          </div>
          <div className="home-levels">
            {LEVELS.map((l) => (
              <Link key={l.n} to="/courseware" className={`home-level home-level--${l.n}`}>
                <span className="home-level__meta">
                  Level {l.n} · {l.category}
                </span>
                <strong className="home-level__name">{l.name}</strong>
                <span className="home-level__focus">{l.focus}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-section" aria-labelledby="home-why">
          <h2 id="home-why" className="home-section__title">No boring drills. Just real progress.</h2>
          <div className="home-why">
            {WHY.map((w, i) => (
              <div key={w.title} className="home-why__card">
                <span className="home-why__num">{i + 1}</span>
                <strong className="home-why__title">{w.title}</strong>
                <span className="home-why__text">{w.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="home-video" aria-label="Intro video">
          {playing ? (
            <video
              className="home-video__player"
              src="/assets/videos/intro-piano.mp4"
              poster="/assets/images/home-piano-still.jpg"
              autoPlay
              controls
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              <img
                src="/assets/images/home-piano-still.jpg"
                alt="Hands playing a grand piano"
                className="home-video__still"
                width="1200"
                height="675"
                loading="lazy"
              />
              <button type="button" className="home-video__play" onClick={() => setPlaying(true)}>
                <span className="home-video__play-icon">
                  <Play />
                </span>
                Watch the 15-second intro
              </button>
            </>
          )}
        </section>
      </div>
    </>
  );
}
