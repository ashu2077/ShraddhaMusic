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
          <h2 className="about__heading">Teaching philosophy</h2>
          <p className="about__philosophy">
            Foundational musical education is most successful when it balances engagement with
            structural rigor. At Shraddha's Music Academy, we equip young learners with core musical
            competencies, including fluent sight-reading, two-handed coordination, and nuanced
            rhythmic expression. We achieve this through a customized curriculum tailored to the
            cognitive learning styles of young children, leveraging interactive application, active
            listening exercises, and progressive achievements to systematically build fundamental
            skills and self-assurance.
          </p>

          <h2 className="about__heading">Know the musician</h2>
          <ul className="about__list">
            <li>Bio detail pending from client.</li>
            <li>Bio detail pending from client.</li>
            <li>Bio detail pending from client.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
