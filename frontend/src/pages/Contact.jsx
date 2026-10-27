import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_NOTIFY_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../config/emailjs.js';
import './Contact.css';

const WORD_LIMIT = 1500;

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
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
          to_email: 'info@shraddhasmusicacademy.com',
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

  if (submitted) {
    return (
      <section className="contact page-section">
        <div className="container contact__success">
          <h1>Thanks for reaching out!</h1>
          <p>We've received your message and will get back to you soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="contact page-section">
      <div className="container contact__inner">
        <h1 className="contact__heading">Contact</h1>
        <p className="contact__intro">
          Questions about lessons, scheduling, or the curriculum? Send us a message below.
        </p>

        <form className="contact__form" onSubmit={handleSubmit}>
          <label className="contact__field">
            <span>Name</span>
            <input
              type="text"
              name="name"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="contact__field">
            <span>Tell me about your inquiry 1500 words or less*</span>
            <textarea
              name="message"
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>

          <div className={'contact__counter' + (overLimit ? ' is-over' : '')}>
            {wordCount} / {WORD_LIMIT} words
            {overLimit && <span className="contact__counter-warning"> — please shorten your message below {WORD_LIMIT} words.</span>}
          </div>

          {sendError && <p className="contact__error">{sendError}</p>}

          <button type="submit" className="btn btn-primary" disabled={overLimit || sending}>
            {sending ? 'Sending…' : 'Send message'}
          </button>
        </form>

        <p className="contact__email-note">
          Academy can also be reached via email directly by info@shraddhasmusicacademy.com
        </p>

        <a
          href="https://wa.me/14088540793"
          target="_blank"
          rel="noopener noreferrer"
          className="contact__whatsapp"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M12 3C7.03 3 3 7.03 3 12c0 1.77.52 3.42 1.42 4.8L3 21l4.33-1.38A8.93 8.93 0 0 0 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M8.8 8.6c.2-.45.4-.46.6-.47.16 0 .35 0 .5.01.17.01.4-.06.62.48.24.6.8 2.06.87 2.21.08.15.13.33.02.53-.1.2-.16.32-.31.49-.16.17-.33.38-.47.51-.16.15-.32.3-.14.6.19.3.82 1.36 1.77 2.2 1.22 1.08 2.24 1.42 2.55 1.58.3.15.48.13.65-.08.18-.2.76-.89.96-1.2.2-.3.4-.25.66-.15.27.1 1.72.82 2.02.96.3.15.5.22.57.35.08.14.08.78-.19 1.53-.28.75-1.6 1.44-2.21 1.47-.6.03-1.18.26-3.95-.83-3.33-1.32-5.4-4.76-5.57-4.98-.16-.22-1.33-1.77-1.33-3.38 0-1.6.84-2.4 1.14-2.73Z"
              fill="currentColor"
            />
          </svg>
          <span>You can also reach us on WhatsApp: (408) 854-0793</span>
        </a>
      </div>
    </section>
  );
}
