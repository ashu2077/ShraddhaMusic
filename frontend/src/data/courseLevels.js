/**
 * Level matrix data per the handoff (Courseware / 3a). Level, Name, Category,
 * and Duration are the client-approved copy from the README's table.
 * Core Focus, Milestone, and the modal's overview/what-you'll-learn copy
 * weren't supplied (they live in the `info` array of the wireframes file,
 * which wasn't part of this upload) — placeholders are flagged below.
 */
export const COURSE_LEVELS = [
  {
    level: 0,
    name: 'Foundations',
    category: 'Early Beginner',
    duration: '8-10 weeks',
    coreFocus: 'Instrument comfort, rhythm, and listening skills',
    milestone:
      'Student can find any note in the C-D-E and F-G-A-B groups, keeps a steady beat, and can play a 3–5 note rote song with both hands separately.',
    overview: 'Build comfort with the instrument, basic rhythm, and listening skills before reading music.',
    whatYoullLearn: [
      'Proper sitting posture, hand shape ("holding a ball"), finger numbers (1–5 both hands)',
      'Keyboard geography: identifying groups of 2 black keys and 3 black keys',
      "Finding all the C's, D's, F's using the black key groups",
      'High/low, loud/soft (forte/piano as concepts, not terms yet)',
      'Steady beat: clapping, tapping on knees, walking to a beat',
      'Simple call-and-response echo games (teacher plays 3 notes, student repeats)',
      'Introduce quarter notes and quarter rests as "walk" and "stop" (Kodály/Orff-style rhythm syllables work well: "ta" and "rest")',
    ],
  },
  {
    level: 1,
    name: 'Beginning Reading',
    category: 'Beginner',
    duration: '8-10 classes',
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
    duration: '8-10 classes',
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
    duration: '8-10 classes',
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
