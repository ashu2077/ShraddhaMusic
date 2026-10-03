import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CurriculumModal.css';

const LESSON_POINTS = [
  'One-on-one, 45-minute virtual sessions — no travel, no waiting rooms, just focused time with you.',
  'A four-level curriculum that moves at your pace, not a fixed calendar',
  'Each level broken into structured sessions, so progress is visible and consistent week to week',
  "Taught by an instructor with over a decade of personal piano training and a strong grounding in classical music, brought to life in a way that's genuinely fun for students.",
  'Level 0: Foundations — comfort at the keyboard, rhythm, and listening, before a single note is read',
];

export default function CurriculumModal({ open, onClose }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="curriculum-modal__backdrop" onClick={onClose}>
      <div
        className="curriculum-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="curriculum-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="curriculum-modal__close" aria-label="Close" onClick={onClose}>
          ✕
        </button>

        <div className="curriculum-modal__hero" aria-hidden="true">
          <img src="/assets/images/logo2.png" alt="" className="curriculum-modal__hero-icon" />
        </div>

        <div className="curriculum-modal__body">
          <h2 id="curriculum-modal-title" className="curriculum-modal__title">
            Piano Foundations Course Curriculum
          </h2>
          <p className="curriculum-modal__subtitle">
            Piano lessons for new musicians — taught virtually, one-on-one.
          </p>

          <p className="curriculum-modal__lead">Where every keystroke builds confidence.</p>

          <p className="curriculum-modal__overview">
            Learning piano should feel like play before it ever feels like practice. That's the
            heart of Shraddha's Music Academy. Our students don't just press keys; they learn to
            speak music. They read notation, play hands-together, and feel rhythm and expression
            come alive. Each student follows a custom curriculum shaped around how they learn
            best, through games, listening, and small wins that strike the right chord. Lesson by
            lesson, the confidence builds like a melody you can't stop humming.
          </p>

          <h3 className="curriculum-modal__subheading">How Lessons Work</h3>
          <ul className="curriculum-modal__list">
            {LESSON_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <div className="curriculum-modal__actions">
            <Link to="/contact" className="btn btn-primary" onClick={onClose}>
              Enquire about this course
            </Link>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
