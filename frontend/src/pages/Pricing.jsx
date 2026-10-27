import { Link } from 'react-router-dom';
import './Pricing.css';

const LESSON_RATES = [
  { item: 'Pay per class — 1:1 lesson (45 minutes)', price: '$35 per class' },
  { item: 'Pay per class — second student from the same family', price: '$30 per class (save $5)' },
  { item: 'Pay monthly — one student (flat rate)', price: 'Coming soon', highlight: true },
  { item: 'Pay monthly — second student from the same family', price: 'Coming soon', highlight: true },
  { item: 'New Student Assessment (30 minutes)', price: 'Free' },
];

const PAYMENT_TERMS = [
  {
    title: 'Monthly payments',
    text: 'Due on the 1st of the month, by Zelle. If payment is more than 3 days late, a $10 late fee applies and lessons pause until payment is received.',
  },
  {
    title: 'Per-class payments',
    text: 'Due before each class, by Zelle. Lessons pause until payment is received.',
  },
  {
    title: 'Discontinuing',
    text: 'If you need to discontinue, please let us know at least 7 days prior to the next class, by WhatsApp or email using the Contact form on the website.',
  },
];

const RESCHEDULING_POLICY = [
  {
    title: "24+ hours' notice",
    text: 'Let us know 24 hours or more before your class and we will reschedule it at no charge — your payment simply moves to the new class.',
  },
  {
    title: 'Late cancellation / no-show',
    text: 'Classes cancelled with less than 24 hours’ notice, and no-shows, cannot be rescheduled and the class fee is due.',
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
          Live 1:1 online piano lessons for kids and adults — 45 minutes each. Every new student
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

        <section className="pricing__zelle">
          <h2 className="pricing__section-heading">Pay with Zelle</h2>
          <p>Zelle information will be shared upon completion of student enrollment.</p>
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
          Questions? WhatsApp{' '}
          <a href="tel:+14088540793">(408) 854-0793</a> ·{' '}
          <a href="mailto:info@shraddhasmusicacademy.com">info@shraddhasmusicacademy.com</a> ·{' '}
          <a href="https://www.shraddhasmusicacademy.com">www.shraddhasmusicacademy.com</a>
        </p>
      </div>
    </section>
  );
}
