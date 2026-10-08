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
    duration: '8-10 weeks',
    coreFocus: 'Basic staff reading and five-finger hand positions',
    milestone:
      'Student reads and plays simple 5-finger melodies hands-together with correct rhythm, and can name lines/spaces on the treble staff.',
    overview: 'Introduce basic staff reading and five-finger hand positions.',
    whatYoullLearn: [
      'The grand staff: lines and spaces, with the usual mnemonics',
      'Middle C position — both thumbs sharing middle C, right hand reaching up to G, left hand down to F',
      'Quarter, half and whole notes and their rests',
      'Dynamics: p and f',
      'Hands separately, then simple parallel-motion pieces together',
      '4/4 and 3/4 as counting exercises',
    ],
  },
  {
    level: 2,
    name: 'Expanding Hand Position & Reading',
    category: 'Late Beginner / Early Intermediate',
    duration: '8-10 classes',
    coreFocus: 'Move beyond fixed 5-finger position; introduce basic technique and musicality.',
    milestone:
      'Comfortable reading beyond 5-finger position, can play a simple scale hands separately, understands basic dynamics and articulation.',
    overview: 'Move beyond fixed 5-finger position; introduce basic technique and musicality.',
    whatYoullLearn: [
      'Reading ledger lines around Middle C',
      'Introducing simple hand position shifts (moving out of strict 5-finger position)',
      'Basic two-note (interval) chords and simple I-V (tonic-dominant) accompaniment patterns',
      'Eighth notes and simple syncopation',
      'Legato vs. staccato touch',
      'Sharps, flats, and the concept of the chromatic scale (informally)',
      'Basic major scale (C major hands separately, then together)',
      "Introducing simple pedaling (if the student's feet reach, or using a stool)",
    ],
  },
  {
    level: 3,
    name: 'Building Independence',
    category: 'Intermediate',
    duration: '8-10 classes',
    coreFocus: 'Musical independence, expanded technique, and music theory fundamentals',
    milestone: 'Content pending from client',
    overview:
      'More musical independence, expanded technique, and introduction to music theory fundamentals.',
    whatYoullLearn: [
      'Major and minor scales (1 octave, hands separately and together)',
      'Basic chords: I, IV, V in C and G major; simple triads',
      'Key signatures: introduce 1–2 sharps/flats (G major, F major)',
      'Basic music theory: intervals, whole/half steps, simple chord function',
      'More complex rhythms: dotted notes, simple compound time (6/8)',
      'Phrasing and expression — shaping a musical line, not just "getting the notes right"',
    ],
  },
];

export const FILTERS = ['All', 'Beginner', 'Intermediate'];

export function matchesFilter(level, filter) {
  if (filter === 'All') return true;
  return level.category.toLowerCase().includes(filter.toLowerCase());
}
