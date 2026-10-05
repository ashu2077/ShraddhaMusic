import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../config/emailjs.js';
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
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          reply_to: email,
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
      </div>
    </section>
  );
}
