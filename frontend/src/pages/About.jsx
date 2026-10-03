import './About.css';

export default function About() {
  return (
    <section className="about page-section">
      <div className="container about__grid">
        <div className="about__photo-col">
          <div className="about__photo-wrap">
            <img src="/assets/images/instructor-placeholder.svg" alt="Instructor portrait" className="about__photo" />
            <span className="about__chip">piano</span>
          </div>
        </div>

        <div className="about__content-col">
          <h2 className="about__heading">About Me</h2>
          <p className="about__philosophy">
            Hi, I'm Shraddha! 👋 Welcome to Shraddha's Music Academy, nestled here in the Bay Area,
            California.
          </p>
          <p className="about__philosophy">
            At 12 years old, I didn't just learn piano—I fell in love with it. Two years of
            childhood lessons planted the seed, but it was my 30s that reignited the flame with a
            year of passionate, dedicated training. What fills the spaces in between is a love
            story that never ended: years of self-discovery through music, countless hours devoted
            to mastering the pieces that move my soul, and an unshakeable commitment to staying
            close to an instrument that has become part of my very being. The piano is my muse, my
            sanctuary, and my truest expression—a place where peace whispers and joy sings.
          </p>
          <p className="about__philosophy">
            What drives me as a teacher is this: piano should never feel like work. It should feel
            like falling in love with something beautiful. It's meant to be filled with wonder,
            with small victories that feel enormous, and with the profound satisfaction of playing
            something that speaks to your heart.
          </p>
          <p className="about__philosophy">
            Whether you're taking your first timid step into music or returning to a passion
            that's been calling you back, I'm here to help you write your own love story with the
            piano. My deepest hope is that you'll discover the same transformative peace,
            unbridled joy, and burning passion that music has given me. 🎹
          </p>
          <p className="about__philosophy">Can't wait to begin this journey with you!</p>
        </div>
      </div>
    </section>
  );
}
