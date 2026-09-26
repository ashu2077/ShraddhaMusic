import { useState } from 'react';
import { COURSE_LEVELS, FILTERS, matchesFilter } from '../data/courseLevels.js';
import CourseModal from '../components/CourseModal.jsx';
import './Courseware.css';

export default function Courseware() {
  const [filter, setFilter] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState(null);

  const visibleLevels = COURSE_LEVELS.filter((level) => matchesFilter(level, filter));

  function handleFilterChange(next) {
    setFilter(next);
    setSelectedLevel(null);
  }

  return (
    <section className="courseware page-section">
      <div className="container">
        <div className="courseware__intro">
          <div>
            <p className="courseware__caption">Curriculum</p>
            <h1 className="courseware__heading">Little Keys Piano Curriculum</h1>
            <p className="courseware__sub">Levels Overview &amp; Breakdown</p>
          </div>

          <div className="courseware__filters" role="group" aria-label="Filter by level">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={'courseware__filter-btn' + (filter === f ? ' is-active' : '')}
                onClick={() => handleFilterChange(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="courseware__summary">
          <h2>Executive Summary &amp; Level Matrix</h2>
          <p>
            A comprehensive comparison of all course levels across age, proficiency category,
            duration, core focus, and advancement milestones.
          </p>
        </div>

        <div className="courseware__table-wrap">
          <table className="courseware__table">
            <thead>
              <tr>
                <th>Level</th>
                <th>Level Name</th>
                <th>Category</th>
                <th>Target Age</th>
                <th>Duration</th>
                <th>Core Focus</th>
                <th>Milestone / Advancement Criteria</th>
              </tr>
            </thead>
            <tbody>
              {visibleLevels.map((level, i) => (
                <tr key={level.level} className={i % 2 === 1 ? 'is-alt' : ''}>
                  <td>
                    <span className="courseware__level-badge">{level.level}</span>
                  </td>
                  <td className="courseware__level-name">{level.name}</td>
                  <td>{level.category}</td>
                  <td>{level.age}</td>
                  <td>{level.duration}</td>
                  <td>{level.coreFocus}</td>
                  <td>{level.milestone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="courseware__grid">
          {visibleLevels.map((level) => (
            <div className="course-tile" key={level.level}>
              <div className="course-tile__image" aria-hidden="true">
                ♪
              </div>
              <div className="course-tile__body">
                <div className="course-tile__row-top">
                  <span className="course-tile__chip">Level {level.level}</span>
                  <span className="course-tile__number">#{level.level}</span>
                </div>

                <dl className="course-tile__facts">
                  <div>
                    <dt>Level Name</dt>
                    <dd>{level.name}</dd>
                  </div>
                  <div>
                    <dt>Category</dt>
                    <dd>{level.category}</dd>
                  </div>
                  <div>
                    <dt>Target Age</dt>
                    <dd>{level.age}</dd>
                  </div>
                  <div>
                    <dt>Duration</dt>
                    <dd>{level.duration}</dd>
                  </div>
                </dl>

                <button type="button" className="course-tile__link" onClick={() => setSelectedLevel(level)}>
                  View details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CourseModal level={selectedLevel} onClose={() => setSelectedLevel(null)} />
    </section>
  );
}
