import { useMemo, useRef, useState } from 'react';
import { PRE_REGISTRATION_ENDPOINT_URL } from '../config/preRegistration.js';
import './PreRegistration.css';

const INSTRUMENT_DEFAULT = 'Keyboard';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function pad(n) {
  return String(n).padStart(2, '0');
}

function maskDate(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (digits.length > 4) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

function maskPhone(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  const area = digits.slice(0, 3);
  const mid = digits.slice(3, 6);
  const last = digits.slice(6, 10);
  let out = area;
  if (mid) out += `-${mid}`;
  if (last) out += `-${last}`;
  return out;
}

function parseMMDDYYYY(str) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(str);
  if (!m) return null;
  const month = Number(m[1]);
  const day = Number(m[2]);
  const year = Number(m[3]);
  const d = new Date(year, month - 1, day);
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return null;
  return d;
}

function calculateAge(dob) {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const hadBirthdayThisYear =
    today.getMonth() > dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  if (!hadBirthdayThisYear) age -= 1;
  return age;
}

const RELATIONSHIP_OPTIONS = ['Parent', 'Guardian', 'Other'];

const INITIAL_FORM = {
  studentName: '',
  dob: '',
  lessonGoals: '',
  parentName: '',
  parentEmail: '',
  parentPhone: '',
  mailingAddress: '',
  relationship: '',
};

export default function PreRegistration() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const dobPickerRef = useRef(null);

  const parsedDob = useMemo(() => parseMMDDYYYY(form.dob), [form.dob]);
  const age = parsedDob && parsedDob <= new Date() ? calculateAge(parsedDob) : '';
  const dobIso = parsedDob
    ? `${parsedDob.getFullYear()}-${pad(parsedDob.getMonth() + 1)}-${pad(parsedDob.getDate())}`
    : '';

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function openDatePicker() {
    const el = dobPickerRef.current;
    if (!el) return;
    if (typeof el.showPicker === 'function') {
      try {
        el.showPicker();
        return;
      } catch {
        // fall through to click()
      }
    }
    el.click();
  }

  function handleDatePickerChange(e) {
    const value = e.target.value; // yyyy-mm-dd
    if (!value) return;
    const [y, m, d] = value.split('-');
    update('dob', `${m}/${d}/${y}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (sending) return;
    setSendError('');

    if (!parsedDob || parsedDob > new Date()) {
      setSendError('Please enter a valid date of birth in mm/dd/yyyy format.');
      return;
    }
    if (!EMAIL_REGEX.test(form.parentEmail)) {
      setSendError('Please enter a valid email address.');
      return;
    }
    if (form.parentPhone.replace(/\D/g, '').length !== 10) {
      setSendError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!form.relationship) {
      setSendError('Please select the relationship to the student.');
      return;
    }
    if (!PRE_REGISTRATION_ENDPOINT_URL) {
      setSendError('This form is not yet connected. Please contact the academy directly.');
      return;
    }

    setSending(true);

    fetch(PRE_REGISTRATION_ENDPOINT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        studentFullName: form.studentName,
        studentDob: form.dob,
        studentAge: age,
        instrument: INSTRUMENT_DEFAULT,
        lessonGoals: form.lessonGoals,
        parentFullName: form.parentName,
        parentEmail: form.parentEmail,
        parentPhone: form.parentPhone,
        mailingAddress: form.mailingAddress,
        relationship: form.relationship,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setSubmitted(true);
          setForm(INITIAL_FORM);
        } else {
          setSendError(data.error || 'Something went wrong submitting the form. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Pre-registration submit failed:', error);
        setSendError('Something went wrong submitting the form. Please try again.');
      })
      .finally(() => {
        setSending(false);
      });
  }

  return (
    <section className="prereg page-section">
      <div className="container prereg__inner">
        <h1 className="prereg__heading">New Student Pre-registration</h1>
        <p className="prereg__intro">
          Share a few details about the student and primary contact so we can get the enrollment process
          started.
        </p>

        <form className="prereg__form" onSubmit={handleSubmit}>
          <h2 className="prereg__section-heading">Student Information</h2>

          <label className="prereg__field">
            <span>Full name</span>
            <input
              type="text"
              value={form.studentName}
              onChange={(e) => update('studentName', e.target.value)}
              required
            />
          </label>

          <div className="prereg__field-row">
            <label className="prereg__field">
              <span>Date of birth (mm/dd/yyyy)</span>
              <div className="prereg__dob-row">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="mm/dd/yyyy"
                  value={form.dob}
                  onChange={(e) => update('dob', maskDate(e.target.value))}
                  required
                />
                <button
                  type="button"
                  className="prereg__calendar-btn"
                  aria-label="Open calendar"
                  onClick={openDatePicker}
                >
                  📅
                </button>
                <input
                  ref={dobPickerRef}
                  type="date"
                  value={dobIso}
                  onChange={handleDatePickerChange}
                  className="prereg__hidden-date-input"
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </div>
            </label>

            <label className="prereg__field">
              <span>Student age</span>
              <input type="text" value={age} readOnly disabled className="prereg__readonly-input" />
            </label>
          </div>

          <label className="prereg__field">
            <span>Instrument(s) learning</span>
            <input type="text" value={INSTRUMENT_DEFAULT} disabled className="prereg__readonly-input" />
          </label>

          <label className="prereg__field">
            <span>Lesson goals/preferences</span>
            <textarea
              rows={4}
              value={form.lessonGoals}
              onChange={(e) => update('lessonGoals', e.target.value)}
            />
          </label>

          <h2 className="prereg__section-heading">Primary Contact (Parent/Guardian)</h2>

          <label className="prereg__field">
            <span>Full name</span>
            <input
              type="text"
              value={form.parentName}
              onChange={(e) => update('parentName', e.target.value)}
              required
            />
          </label>

          <label className="prereg__field">
            <span>Email address</span>
            <input
              type="email"
              value={form.parentEmail}
              onChange={(e) => update('parentEmail', e.target.value)}
              required
            />
          </label>

          <label className="prereg__field">
            <span>Phone number</span>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="555-123-4567"
              value={form.parentPhone}
              onChange={(e) => update('parentPhone', maskPhone(e.target.value))}
              required
            />
          </label>

          <label className="prereg__field">
            <span>Mailing address</span>
            <textarea
              rows={3}
              value={form.mailingAddress}
              onChange={(e) => update('mailingAddress', e.target.value)}
              required
            />
          </label>

          <label className="prereg__field">
            <span>Relationship to student</span>
            <select
              value={form.relationship}
              onChange={(e) => update('relationship', e.target.value)}
              required
            >
              <option value="" disabled>
                Select one
              </option>
              {RELATIONSHIP_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          {sendError && <p className="prereg__error">{sendError}</p>}

          <button type="submit" className="btn btn-gold" disabled={sending}>
            {sending ? 'Submitting…' : 'Submit'}
          </button>
        </form>
      </div>

      {submitted && (
        <div className="prereg-modal__backdrop" onClick={() => setSubmitted(false)}>
          <div
            className="prereg-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="prereg-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="prereg-modal-title" className="prereg-modal__title">
              Thank you!
            </h2>
            <p className="prereg-modal__text">
              Thank you for the information. The academy will send you an email with next steps.
            </p>
            <button type="button" className="btn btn-gold" onClick={() => setSubmitted(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
