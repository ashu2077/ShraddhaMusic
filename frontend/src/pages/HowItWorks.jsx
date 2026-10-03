import './HowItWorks.css';

const STEPS = [
  {
    title: 'Download the app and create a profile',
    text: '',
  },
  {
    title: 'Sign up for 30 minutes free student assessment session',
    text: 'Using the scheduling feature on the app schedule a 30 minutes slot.',
  },
  {
    title: 'Complete the assessment as scheduled',
    text: 'You will receive a completed assessment via email within 24–48 hrs after the session, including instructions on how to get started.',
  },
  {
    title: 'Register for your classes on the My Music Staff app',
    text: 'To get started, select the right class and set up sessions using the scheduling feature of the app. Payment must be completed to hold the reservation.',
  },
  {
    title: 'Attend the sessions as registered',
    text: 'Any scheduling change must be made using the app.',
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
          <ol className="how__timeline">
            {STEPS.map((step, i) => (
              <li className="how__step" key={step.title}>
                <div className="how__marker-col">
                  <span className="how__marker">{i + 1}</span>
                  {i < STEPS.length - 1 && <span className="how__connector" />}
                </div>
                <div className="how__content">
                  <h3 className="how__title">{step.title}</h3>
                  {step.text && <p className="how__text">{step.text}</p>}
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
