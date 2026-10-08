import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CourseModal.css';

export default function CourseModal({ level, onClose }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  if (!level) return null;

  return (
    <div className="course-modal__backdrop" onClick={onClose}>
      <div
        className="course-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="course-modal__close" aria-label="Close" onClick={onClose}>
          ✕
        </button>

        <div className="course-modal__hero" aria-hidden="true">
          <span>Level {level.level}</span>
        </div>

        <div className="course-modal__body">
          <span className="course-modal__chip">Level {level.level}</span>
          <h2 id="course-modal-title" className="course-modal__title">
            {level.name}
          </h2>

          <div className="course-modal__meta">
            <span className="course-modal__meta-chip">{level.duration}</span>
            <span className="course-modal__meta-chip">45 min lessons</span>
          </div>

          <p className="course-modal__overview">{level.overview}</p>

          <h3 className="course-modal__subheading">What you'll learn</h3>
          <ul className="course-modal__list">
            {level.whatYoullLearn.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="course-modal__actions">
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
