import { Link } from 'react-router-dom';
import './HowItWorks.css';

const STEPS = [
  {
    title: 'Fill out form with student information',
    text: 'Note - Minor aged student should register using parent email id.',
    warning: true,
    cta: { label: 'Start Pre-registration Form', to: '/pre-registration' },
  },
  {
    title: 'Receive an email with link to join the student portal',
    text: 'Next business day the academy will send you an email with link to complete the student portal registration.',
  },
  {
    title: 'Complete creating student profile.',
    text: '',
  },
  {
    title: 'Using the student portal on the website schedule a free assessment session.',
    text: 'Find available spot using the calendar feature.',
  },
  {
    title: 'Student and Shraddha will complete the assessment on the scheduled date',
    text: '',
  },
  {
    title: 'Receive a personalized class plan by email then start scheduling the sessions using the calendar to find available slots.',
    text: 'Note - Do not schedule classes until you receive PERSONALIZED CLASS PLAN',
    warning: true,
  },
  {
    title: 'Make the payment for the classes',
    text: 'Payment can be made through the student portal website. It will require a valid login. If you dont have a login reach the academy through the Contact page',
  },
  {
    title: 'Start 1:1 sessions',
    text: '',
  },
];

const WHAT_YOU_NEED = [
  {
    title: 'A Keyboard or Piano',
    text: "A keyboard with at least 61 keys works well for beginners (a full 88-key piano isn't necessary to start). Make sure it's turned on, positioned within view of the camera, and ready to go a few minutes before your session time.",
  },
  {
    title: 'Repertoire & Materials',
    text: "We'll let you know which songbook or sheet music to have on hand as your child progresses through the curriculum. Please have any assigned pieces printed or displayed nearby so we can reference them during the lesson.",
  },
  {
    title: 'A Comfortable Seating Setup',
    text: "A bench or chair at the right height makes a real difference for young learners — ideally with feet supported (a small stool works well if they don't yet reach the floor) and elbows roughly level with the keys. Good posture from the start helps build good habits early.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <section className="how page-section">
        <div className="container">
          <h1 className="sr-only">How online piano lessons work at Shraddha&rsquo;s Music Academy</h1>
          <ol className="how__timeline">
            {STEPS.map((step, i) => (
              <li className="how__step" key={i}>
                <div className="how__marker-col">
                  <span className="how__marker">{i + 1}</span>
                  {i < STEPS.length - 1 && <span className="how__connector" />}
                </div>
                <div className="how__content">
                  <h2 className="how__title">{step.title}</h2>
                  {step.text && (
                    <p className={step.warning ? 'how__note-warning' : 'how__text'}>{step.text}</p>
                  )}
                  {step.cta && (
                    <Link to={step.cta.to} className="btn btn-gold how__cta">
                      {step.cta.label}
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="need page-section">
        <div className="container">
          <h2 className="need__heading">What you need at Home</h2>
          <ul className="need__list">
            {WHAT_YOU_NEED.map((item) => (
              <li key={item.title}>
                <span className="need__item-title">{item.title}</span>
                <span className="need__item-text"> — {item.text}</span>
              </li>
            ))}
          </ul>
          <p className="need__closing">
            A few minutes of setup before each session — keyboard on, seating adjusted, materials
            nearby — helps us make the most of every lesson.
          </p>
        </div>
      </section>
    </>
  );
}
