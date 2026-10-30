import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_NOTIFY_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../config/emailjs.js';
import './Contact.css';

const WORD_LIMIT = 1500;
const WHATSAPP_URL = 'https://wa.me/14088540793';
const WHATSAPP_DISPLAY = '(408) 854-0793';
const EMAIL = 'info@shraddhasmusicacademy.com';

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.4 7.6L3.5 20.5l1.4-4.4A8.5 8.5 0 1 1 20.5 11.5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  );
}

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const wordCount = countWords(message);
  const overLimit = wordCount > WORD_LIMIT;

  function handleSubmit(e) {
    e.preventDefault();
    if (overLimit || sending) return;

    setSending(true);
    setSendError('');

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_NOTIFY_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          reply_to: email,
          to_email: EMAIL,
          message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      .then(() => {
        setSubmitted(true);
      })
      .catch((error) => {
        console.error('EmailJS send failed:', error?.status, error?.text || error);
        setSendError('Something went wrong sending your message. Please try again.');
      })
      .finally(() => {
        setSending(false);
      });
  }

  return (
    <section className="contact page-section">
      <div className="container">
        <div className="contact__card">
          <aside className="contact__panel" aria-labelledby="contact-heading">
            <div className="contact__decor" aria-hidden="true">
              <div className="contact__staff" />
              <span className="contact__clef">𝄞</span>
              <span className="contact__note contact__note--1">♩</span>
              <span className="contact__note contact__note--2">♪</span>
              <span className="contact__note contact__note--3">♫</span>
            </div>

            <div className="contact__panel-intro">
              <h1 id="contact-heading" className="contact__heading">Let's talk piano.</h1>
              <p className="contact__intro">
                Questions about lessons, scheduling, or the curriculum? Pick whichever is easiest.
              </p>
            </div>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="contact__tile">
              <span className="contact__tile-icon contact__tile-icon--whatsapp">
                <WhatsAppIcon />
              </span>
              <span className="contact__tile-text">
                <span className="contact__tile-label">WhatsApp</span>
                <strong className="contact__tile-value contact__tile-value--phone">{WHATSAPP_DISPLAY}</strong>
              </span>
            </a>

            <a href={`mailto:${EMAIL}`} className="contact__tile">
              <span className="contact__tile-icon contact__tile-icon--email">
                <EmailIcon />
              </span>
              <span className="contact__tile-text">
                <span className="contact__tile-label">Email</span>
                <strong className="contact__tile-value contact__tile-value--email">
                  info@<wbr />shraddhasmusicacademy.com
                </strong>
              </span>
            </a>
          </aside>

          <div className="contact__form-side">
            {submitted ? (
              <div className="contact__success" role="status">
                <h2>Thanks for reaching out!</h2>
                <p>We've received your message and will get back to you soon.</p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} aria-labelledby="contact-form-heading">
                <h2 id="contact-form-heading" className="contact__form-heading">Or send a message</h2>

                <label className="contact__field">
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>

                <label className="contact__field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>

                <label className="contact__field">
                  <span>Tell me about your inquiry 1500 words or less*</span>
                  <textarea
                    name="message"
                    rows={7}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </label>

                {sendError && <p className="contact__error">{sendError}</p>}

                <div className="contact__form-footer">
                  <div className={'contact__counter' + (overLimit ? ' is-over' : '')}>
                    {wordCount} / {WORD_LIMIT} words
                    {overLimit && (
                      <span className="contact__counter-warning">
                        {' '}— please shorten your message below {WORD_LIMIT} words.
                      </span>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={overLimit || sending}>
                    {sending ? 'Sending…' : 'Send message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
