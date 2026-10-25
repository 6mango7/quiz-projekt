import { Emoji } from './Emoji'

// Sekcja "Jak działa turniej?" – trzy kroki i przykładowa drabinka na 8 opcji

// Przykładowy turniej: w każdej parze pierwsza liczba to indeks zwycięzcy (0 lub 1)
const ROUNDS = [
  {
    name: 'Ćwierćfinał',
    matches: [
      [['🍕', '🍣'], 0],
      [['🍔', '🌮'], 1],
      [['🍝', '🥟'], 1],
      [['🍜', '🥐'], 1],
    ],
  },
  {
    name: 'Półfinał',
    matches: [
      [['🍕', '🌮'], 0],
      [['🥟', '🥐'], 0],
    ],
  },
  {
    name: 'Finał',
    matches: [[['🍕', '🥟'], 1]],
  },
]

const STEPS = [
  ['Wybierz quiz', 'i zdecyduj, ile opcji weźmie udział: 4, 8, 16 albo więcej.'],
  [
    'Wybieraj w parach',
    'W każdej rundzie widzisz dwa zdjęcia. To, które klikniesz, przechodzi dalej.',
  ],
  ['Poznaj zwycięzcę', 'Na końcu zostaje jedno. Sprawdź, czy inni gracze wybrali tak samo.'],
]

export function HowItWorks() {
  return (
    <section className="home-section" aria-labelledby="how-title">
      <div className="container">
        <div className="how">
          <div>
            <h2 id="how-title">Jak działa turniej?</h2>
            <ol className="how-steps">
              {STEPS.map(([title, text]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bracket" role="img" aria-label="Przykładowa drabinka turnieju na 8 opcji">
            {ROUNDS.map((round) => (
              <div key={round.name} className="bracket-col">
                <h3>{round.name}</h3>
                <div className="bracket-matches">
                  {round.matches.map(([pair, winner]) => (
                    <div key={pair.join()} className="bracket-match">
                      {pair.map((emoji, i) => (
                        <span key={emoji} className={`bracket-slot ${i === winner ? 'win' : ''}`}>
                          <Emoji char={emoji} />
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="bracket-col bracket-col-champion">
              <h3>Zwycięzca</h3>
              <div className="bracket-matches">
                <div className="bracket-champion">
                  <Emoji char="👑" className="bracket-crown" />
                  <Emoji char="🥟" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
