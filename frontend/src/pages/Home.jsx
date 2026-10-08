import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const MAX_LOOPS = 5;

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
        <div className="container hero__inner">
          <h1 className="hero__title">
            Piano lessons for new musicians — taught virtually, one-on-one
            <br />
            Open to all ages
          </h1>
          <p className="hero__subtext">
            Here's the truth: learning piano should be fun first, skills second. At Shraddha's
            Music Academy, we've cracked the code. Students aren't trudging through boring
            drills—they're playing their way to real mastery: nailing notation, coordinating both
            hands flawlessly, unlocking rhythm and expression, and discovering what it feels like
            to actually play music. Every curriculum is custom-built around how you learn
            best—because no two musicians are alike. Games that make you think, listening
            exercises that blow your mind, and victories (big and small) that stack up into
            genuine confidence. That's the magic. That's how real musicians are born. One session.
            One breakthrough. One passion-fueled moment at a time.
          </p>
          <p className="hero__note">
            For new students only schedule a 30 minutes free assessment session. Click How it
            works and follow instructions
          </p>
          <div className="hero__ctas">
            <Link to="/how-it-works" className="btn btn-gold">
              Book a free trial
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-band">
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
