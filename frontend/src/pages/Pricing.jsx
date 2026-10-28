import { Link } from 'react-router-dom';
import './Pricing.css';

const LESSON_RATES = [
  { item: 'Pay per class — 1:1 lesson (30 minutes)', price: '$35 per class' },
  { item: 'Pay per class — second student from the same family', price: '$30 per class (save $5)' },
  { item: 'Pay monthly — one student (flat rate)', price: '$120 per month', highlight: true },
  { item: 'Pay monthly — second student from the same family', price: '$100 per month', highlight: true },
  { item: 'New Student Assessment (30 minutes)', price: 'Free' },
];

const PAYMENT_TERMS = [
  {
    title: 'Monthly payments',
    text: 'Due on the 1st of the month, by Zelle. If payment is more than 3 days late, a $10 late fee is applied, and classes are paused until dues are settled.',
  },
  {
    title: 'Per-class payments',
    text: 'Due before each class, by Zelle. Lessons paused until payment is received.',
  },
  {
    title: 'Discontinuing',
    text: 'If you need to discontinue, please let us know at least 7 days before the next class, by contacting the academy via WhatsApp (408) 854-0793, Email (info@shraddhasmusicacademy.com) or use the Contact form.',
  },
];

const RESCHEDULING_POLICY = [
  {
    title: "24+ hours' notice",
    text: 'Let us know 24 hours or more before your class and we will reschedule it at no charge — your payment simply moves to the new class.',
  },
  {
    title: 'Late cancellation / no-show',
    text: 'Classes cancelled with less than 24 hours’ notice, and no-shows, cannot be rescheduled and the class fee applies.',
  },
  {
    title: 'Sickness',
    text: 'If you are unwell, you may take one make-up class per month. Make-ups do not carry over to the next month.',
  },
];

export default function Pricing() {
  return (
    <section className="pricing page-section">
      <div className="container pricing__inner">
        <h1 className="pricing__heading">Lesson Pricing</h1>
        <p className="pricing__intro">
          Live 1:1 online piano classes for kids and adults — 30 minutes each. Every new student
          starts with a free 30-minute assessment session. Two ways to pay: per class, or monthly
          and save.
        </p>

        <div className="pricing__table-wrap">
          <table className="pricing__table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {LESSON_RATES.map((row) => (
                <tr key={row.item} className={row.highlight ? 'is-highlight' : ''}>
                  <td>{row.item}</td>
                  <td className="pricing__price-cell">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="pricing__section-heading">Payment Terms</h2>
        <dl className="pricing__terms-list">
          {PAYMENT_TERMS.map((term) => (
            <div key={term.title} className="pricing__terms-item">
              <dt>{term.title}</dt>
              <dd>{term.text}</dd>
            </div>
          ))}
        </dl>

        <h2 className="pricing__section-heading">Rescheduling Policy</h2>
        <dl className="pricing__terms-list">
          {RESCHEDULING_POLICY.map((term) => (
            <div key={term.title} className="pricing__terms-item">
              <dt>{term.title}</dt>
              <dd>{term.text}</dd>
            </div>
          ))}
        </dl>

        <p className="pricing__note">
          <strong>Note</strong> – Every student must complete a free assessment prior to enrolling
          in a regular class schedule. Payment information will be shared on the feedback email of
          the assessment.
        </p>

        <section className="pricing__zelle">
          <h2 className="pricing__section-heading">Pay with Zelle</h2>
          <div className="pricing__zelle-row">
            <span className="pricing__zelle-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="22" height="22" rx="6" fill="#6B4FBB" />
                <path
                  d="M7.5 7.5h9l-6 9h6"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M7.5 7.5h9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <p>Zelle information will be shared upon completion of student enrollment.</p>
          </div>
        </section>

        <section className="pricing__cta-band">
          <div>
            <h2>Ready to get started?</h2>
            <p>Book your free 30-minute assessment session today.</p>
          </div>
          <Link to="/pre-registration" className="btn btn-gold">
            Book a free assessment
          </Link>
        </section>

        <p className="pricing__contact-note">
          Questions?{' '}
          <a
            href="https://wa.me/14088540793"
            target="_blank"
            rel="noopener noreferrer"
            className="pricing__contact-whatsapp"
          >
            <img src="/assets/images/whatsapp-logo.png" alt="" />
            WhatsApp (408) 854-0793
          </a>{' '}
          · <a href="mailto:info@shraddhasmusicacademy.com">info@shraddhasmusicacademy.com</a>
        </p>
      </div>
    </section>
  );
}
