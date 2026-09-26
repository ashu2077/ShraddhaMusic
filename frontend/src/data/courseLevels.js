/**
 * Level matrix data per the handoff (Courseware / 3a). Level, Name, Category,
 * Age and Duration are the client-approved copy from the README's table.
 * Core Focus, Milestone, and the modal's overview/what-you'll-learn copy
 * weren't supplied (they live in the `info` array of the wireframes file,
 * which wasn't part of this upload) — placeholders are flagged below.
 */
export const COURSE_LEVELS = [
  {
    level: 0,
    name: 'Foundations',
    category: 'Early Beginner',
    age: 'Ages 4–6 (or absolute beginners)',
    duration: '6–8 weeks (45 min/week)',
    coreFocus: 'Content pending from client',
    milestone: 'Content pending from client',
    overview:
      'An introduction to the keyboard, note names, and steady rhythm through playful, hands-on activities suited to very young beginners.',
    whatYoullLearn: [
      'Keyboard geography and proper hand position',
      'Steady beat and simple rhythm patterns',
      'First short pieces played hands separately',
    ],
  },
  {
    level: 1,
    name: 'Beginning Reading',
    category: 'Beginner',
    age: 'Ages 5–7',
    duration: '6–8 weeks (45 min/week)',
    coreFocus: 'Content pending from client',
    milestone: 'Content pending from client',
    overview:
      'Introduces staff notation and note reading in a fixed hand position, building toward confident single-hand playing.',
    whatYoullLearn: [
      'Reading notes on the staff in a five-finger position',
      'Basic note values and simple time signatures',
      'Short pieces played hands together',
    ],
  },
  {
    level: 2,
    name: 'Expanding Hand Position & Reading',
    category: 'Late Beginner / Early Intermediate',
    age: 'Ages 6–8',
    duration: '6–8 weeks (45 min/week)',
    coreFocus: 'Content pending from client',
    milestone: 'Content pending from client',
    overview:
      'Moves beyond a fixed hand position, introducing wider intervals, position shifts, and more expressive two-handed playing.',
    whatYoullLearn: [
      'Reading beyond the five-finger position',
      'Hand shifts and simple crossovers',
      'Dynamics and phrasing in short pieces',
    ],
  },
  {
    level: 3,
    name: 'Building Independence',
    category: 'Intermediate',
    age: 'Ages 8–10',
    duration: '6–8 weeks (45 min/week)',
    coreFocus: 'Content pending from client',
    milestone: 'Content pending from client',
    overview:
      'Develops independent hand coordination and self-directed practice habits, preparing students for more advanced repertoire.',
    whatYoullLearn: [
      'Independent rhythmic patterns between hands',
      'Intermediate repertoire with varied dynamics',
      'Self-directed practice and sight-reading strategies',
    ],
  },
];

export const FILTERS = ['All', 'Beginner', 'Intermediate'];

export function matchesFilter(level, filter) {
  if (filter === 'All') return true;
  return level.category.toLowerCase().includes(filter.toLowerCase());
}
