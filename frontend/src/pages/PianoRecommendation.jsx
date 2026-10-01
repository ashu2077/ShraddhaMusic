import './PianoRecommendation.css';

const PIANOS = [
  {
    name: 'Roland FP-10',
    price: '$599',
    specs: [
      '88 keys',
      'Weighted keys',
      'Only 4 buttons',
      'Bluetooth MIDI and USB capability',
      'Has headphone jack',
      'Has a metronome',
      'Stable for beginner piano players',
    ],
  },
  {
    name: 'Pianote Prima',
    price: '$599',
    specs: ['88 keys', '200 sounds and rhythms', 'Metronome', 'Double up sounds', 'Has Bluetooth'],
  },
  {
    name: 'Casio PX-S1100',
    price: '$579',
    specs: ['88 keys', 'Textured keys — gives grip', 'Bluetooth, MIDI'],
  },
];

export default function PianoRecommendation() {
  return (
    <section className="piano-rec page-section">
      <div className="container">
        <p className="piano-rec__caption">Buyer's Guide</p>
        <h1 className="piano-rec__heading">Best Beginner Pianos</h1>
        <p className="piano-rec__intro">
          A quick comparison of keyboards we recommend for new students getting set up at home.
        </p>

        <div className="piano-rec__grid">
          {PIANOS.map((piano, i) => (
            <div className={'piano-card' + (piano.note ? ' is-not-recommended' : '')} key={piano.name}>
              <div className="piano-card__header">
                <span className="piano-card__number">{i + 1}</span>
                <div className="piano-card__title">
                  <h2 className="piano-card__name">{piano.name}</h2>
                  <span className="piano-card__price">{piano.price}</span>
                </div>
              </div>

              {piano.note && <p className="piano-card__note">{piano.note}</p>}

              <ul className="piano-card__specs">
                {piano.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
