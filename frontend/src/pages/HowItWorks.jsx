import { Link } from 'react-router-dom';
import './HowItWorks.css';

const STEPS = [
  {
    title: 'Submit an assessment request',
    text: "Complete the assessment request form with the student's information.",
    note: "Note: Students under 18 should register using a parent or guardian's email address.",
    cta: { label: 'Start Assessment Request Form', to: '/pre-registration' },
  },
  {
    title: 'Choose a time',
    text: 'Pick the time slots when registering for free assessment. The academy will confirm one of the your slots via email.',
  },
  {
    title: 'Receive your meeting link',
    text: "Once your time is confirmed, you'll receive a Microsoft Teams link for the assessment.",
  },
  {
    title: 'Complete the assessment',
    text: 'At the scheduled time, the student and SMA will meet online to complete the assessment.',
  },
  {
    title: 'Receive your personalized class plan',
    text: "Following the assessment, you'll receive a personalized class plan by email. Once you have it, you can book your sessions by choosing from available slots on the email.",
    note: 'Please note: Classes cannot be scheduled until you have received your personalized class plan.',
  },
  {
    title: 'Payment',
    text: 'Payment is made via zelle and information is sent on the class plan email the student/parent received after free assessment. Payment is due before start of classes.',
  },
  {
    title: 'Begin your 1:1 sessions',
    text: 'Start your lessons at your scheduled times.',
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
                  {step.text && <p className="how__text">{step.text}</p>}
                  {step.note && <p className="how__note-warning">{step.note}</p>}
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
