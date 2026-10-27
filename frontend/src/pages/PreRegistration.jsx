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

const RELATIONSHIP_OPTIONS = ['Parent', 'Guardian', 'Self', 'Other'];

const ADULT_AGE = 18;

const REFERRAL_ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.5L15 12L10.5 14.5V9.5Z" fill="currentColor" />
    </svg>
  ),
  whatsapp: (
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
  ),
};

const REFERRAL_OPTIONS = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'whatsapp', label: 'WhatsApp' },
  { key: 'other', label: 'Other' },
];

const ASSESSMENT_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'];

const ASSESSMENT_TIME_SLOTS = [
  { key: 'morning', label: 'Mornings (9am-12pm)' },
  { key: 'afternoon', label: 'Afternoons (12pm-3pm)' },
  { key: 'evening', label: 'Evenings (3pm-6pm)' },
];

const INITIAL_FORM = {
  studentName: '',
  studentEmail: '',
  dob: '',
  lessonGoals: '',
  parentName: '',
  parentEmail: '',
  parentPhone: '',
  relationship: '',
};

const INITIAL_REFERRAL = { instagram: false, youtube: false, whatsapp: false, other: false };

export default function PreRegistration() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [referral, setReferral] = useState(INITIAL_REFERRAL);
  const [referralOtherText, setReferralOtherText] = useState('');
  const [availability, setAvailability] = useState({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const dobPickerRef = useRef(null);

  const parsedDob = useMemo(() => parseMMDDYYYY(form.dob), [form.dob]);
  const age = parsedDob && parsedDob <= new Date() ? calculateAge(parsedDob) : '';
  const dobIso = parsedDob
    ? `${parsedDob.getFullYear()}-${pad(parsedDob.getMonth() + 1)}-${pad(parsedDob.getDate())}`
    : '';
  const isAdultStudent = typeof age === 'number' && age >= ADULT_AGE;

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleReferral(key) {
    setReferral((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (key === 'other' && !next.other) setReferralOtherText('');
      return next;
    });
  }

  function selectAvailability(day, slotKey) {
    setAvailability((prev) => ({ ...prev, [day]: slotKey }));
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
    if (!EMAIL_REGEX.test(form.studentEmail)) {
      setSendError("Please enter a valid student email address.");
      return;
    }
    if (!isAdultStudent) {
      if (!form.parentName) {
        setSendError("Please enter the parent/guardian's full name.");
        return;
      }
      if (!EMAIL_REGEX.test(form.parentEmail)) {
        setSendError('Please enter a valid parent/guardian email address.');
        return;
      }
      if (form.parentPhone.replace(/\D/g, '').length !== 10) {
        setSendError('Please enter a valid 10-digit parent/guardian phone number.');
        return;
      }
      if (!form.relationship) {
        setSendError('Please select the relationship to the student.');
        return;
      }
    } else {
      if (form.parentEmail && !EMAIL_REGEX.test(form.parentEmail)) {
        setSendError('Please enter a valid parent/guardian email address, or leave it blank.');
        return;
      }
      if (form.parentPhone && form.parentPhone.replace(/\D/g, '').length !== 10) {
        setSendError('Please enter a valid 10-digit parent/guardian phone number, or leave it blank.');
        return;
      }
    }
    const selectedDays = ASSESSMENT_DAYS.filter((day) => availability[day]);
    if (selectedDays.length === 0) {
      setSendError('Please pick at least one day and time for your assessment.');
      return;
    }
    if (!PRE_REGISTRATION_ENDPOINT_URL) {
      setSendError('This form is not yet connected. Please contact the academy directly.');
      return;
    }

    const assessmentAvailability = selectedDays
      .map((day) => `${day}: ${ASSESSMENT_TIME_SLOTS.find((slot) => slot.key === availability[day]).label}`)
      .join('; ');

    const howDidYouFindUs = REFERRAL_OPTIONS.filter((option) => referral[option.key])
      .map((option) =>
        option.key === 'other' && referralOtherText.trim()
          ? `Other: ${referralOtherText.trim()}`
          : option.label
      )
      .join('; ');

    setSending(true);

    fetch(PRE_REGISTRATION_ENDPOINT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentFullName: form.studentName,
        studentEmail: form.studentEmail,
        studentDob: form.dob,
        studentAge: age,
        instrument: INSTRUMENT_DEFAULT,
        lessonGoals: form.lessonGoals,
        howDidYouFindUs,
        parentFullName: form.parentName,
        parentEmail: form.parentEmail,
        parentPhone: form.parentPhone,
        relationship: form.relationship,
        assessmentAvailability,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setSubmitted(true);
          setForm(INITIAL_FORM);
          setReferral(INITIAL_REFERRAL);
          setReferralOtherText('');
          setAvailability({});
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
        <h1 className="prereg__heading">New Student Assessment Request</h1>
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
            <span>Student email</span>
            <input
              type="email"
              value={form.studentEmail}
              onChange={(e) => update('studentEmail', e.target.value)}
              required
            />
          </label>

          <label className="prereg__field">
            <span>Lesson goals/preferences</span>
            <textarea
              rows={4}
              value={form.lessonGoals}
              onChange={(e) => update('lessonGoals', e.target.value)}
            />
          </label>

          <h2 className="prereg__section-heading">How did you find us?</h2>

          <div className="prereg__referral-grid" role="group" aria-label="How did you find us?">
            {REFERRAL_OPTIONS.map((option) => (
              <label key={option.key} className="prereg__referral-option">
                <input
                  type="checkbox"
                  checked={referral[option.key]}
                  onChange={() => toggleReferral(option.key)}
                />
                {REFERRAL_ICONS[option.key] && (
                  <span className="prereg__referral-icon">{REFERRAL_ICONS[option.key]}</span>
                )}
                <span>{option.label}</span>
                {option.key === 'other' && (
                  <input
                    type="text"
                    className="prereg__referral-other-input"
                    placeholder="Please specify"
                    value={referralOtherText}
                    disabled={!referral.other}
                    onChange={(e) => setReferralOtherText(e.target.value)}
                    aria-label="Please specify how you found us"
                  />
                )}
              </label>
            ))}
          </div>

          <h2 className="prereg__section-heading">Primary Contact (Parent/Guardian)</h2>

          <p className="prereg__section-note">
            {isAdultStudent
              ? 'Student is 18 or older, so this section is optional.'
              : 'Student is under 18, so this section is required.'}
          </p>

          <label className="prereg__field">
            <span>Full name</span>
            <input
              type="text"
              value={form.parentName}
              onChange={(e) => update('parentName', e.target.value)}
              required={!isAdultStudent}
            />
          </label>

          <label className="prereg__field">
            <span>Email address</span>
            <input
              type="email"
              value={form.parentEmail}
              onChange={(e) => update('parentEmail', e.target.value)}
              required={!isAdultStudent}
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
              required={!isAdultStudent}
            />
          </label>

          <label className="prereg__field">
            <span>Relationship to student</span>
            <select
              value={form.relationship}
              onChange={(e) => update('relationship', e.target.value)}
              required={!isAdultStudent}
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

          <h2 className="prereg__section-heading">Pick assessment slot(s) - all times are PST time zone</h2>

          <div className="prereg__slots-header">
            <button
              type="button"
              className="prereg__slots-reset"
              onClick={() => setAvailability({})}
            >
              Clear selections
            </button>
          </div>

          <div className="prereg__slots-wrap">
            <table className="prereg__slots-table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  {ASSESSMENT_TIME_SLOTS.map((slot) => (
                    <th scope="col" key={slot.key}>
                      {slot.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ASSESSMENT_DAYS.map((day) => (
                  <tr key={day}>
                    <th scope="row">{day}</th>
                    {ASSESSMENT_TIME_SLOTS.map((slot) => (
                      <td key={slot.key}>
                        <input
                          type="radio"
                          name={`assessment-slot-${day}`}
                          value={slot.key}
                          checked={availability[day] === slot.key}
                          onChange={() => selectAvailability(day, slot.key)}
                          aria-label={`${day} ${slot.label}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
              Thank you for the information. The academy will confirm a slot via email in 2 business days.
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
