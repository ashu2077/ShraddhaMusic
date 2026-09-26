import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <>
      <section className="intro-video">
        <div className="intro-video__frame">
          <video
            muted
            loop
            controls
            playsInline
            poster="/assets/images/video-poster.svg"
            src="/assets/videos/intro-piano.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="hero page-section">
        <div className="container hero__inner">
          <p className="hero__eyebrow">Online Piano Lessons for Ages 4–10</p>
          <h1 className="hero__title">Piano lessons your child will actually look forward to.</h1>
          <p className="hero__subtext">
            Live, one-on-one online piano instruction designed for young beginners — building
            sight-reading, coordination and rhythm through a curriculum built around how kids
            actually learn.
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
        <div className="container cta-band__inner">
          <h2>Start with a free assessment session.</h2>
          <p>Meet your instructor and get a personalized recommendation for your child.</p>
          <Link to="/contact" className="btn btn-gold">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
