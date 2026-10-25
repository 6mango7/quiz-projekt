// Dane przykładowe wgrywane przy pierwszym uruchomieniu.
// Zmiana SEED_VERSION spowoduje ponowne wgranie danych u wszystkich
// (UWAGA: kasuje wtedy konta, quizy i oceny dodane w przeglądarce).

import { createTournament, currentPair, pickWinner, availableSizes } from '../utils/tournament'

export const SEED_VERSION = 2

const DAY = 24 * 3600 * 1000

// Prosty generator liczb losowych z ziarnem – dzięki niemu dane są zawsze takie same
function createRandom(seed) {
  let a = seed >>> 0
  return function random() {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ---------- Użytkownicy ----------
// [id, nazwa, hasło, kolor, opis, ile dni temu dołączył]
const USERS = [
  [
    'u-demo',
    'demo',
    'demo1234',
    '#e2b714',
    'Konto testowe – możesz się na nie zalogować i sprawdzić wszystko.',
    40,
  ],
  ['u-kasia', 'kasia_q', 'kasia123', '#ca4754', 'Robię quizy o jedzeniu i podróżach.', 120],
  ['u-tomek', 'tomek99', 'tomek123', '#5b8def', 'Programista, gracz, fan sportu.', 90],
  ['u-ola', 'ola.music', 'ola12345', '#8bbf5f', 'Muzyka i zwierzaki.', 60],
  ['u-michal', 'michal.dev', 'michal123', '#2bb3a3', 'Linux, kawa i dobre klawiatury.', 75],
  [
    'u-zuza',
    'zuza_w_drodze',
    'zuza1234',
    '#c678dd',
    'Zwiedzam, fotografuję, porównuję miasta.',
    50,
  ],
  ['u-bartek', 'bartek_gra', 'bartek123', '#e07b39', 'Gram we wszystko, od szachów po RPG.', 45],
  ['u-ania', 'ania.kino', 'ania1234', '#ca4754', 'Dwa filmy dziennie to minimum.', 35],
  ['u-kuba', 'kuba_sport', 'kuba1234', '#5b8def', 'Piłka, rower, siłownia.', 80],
  ['u-natalia', 'natalia.slodka', 'natalia123', '#e07b39', 'Piekę, testuję, oceniam desery.', 30],
]

// ---------- Quizy ----------
// Opcje to [emoji, nazwa]. Emoji służy jako obrazek; null = kolorowy kafelek z inicjałami.
const QUIZZES = [
  {
    id: 'q-jedzenie',
    title: 'Najlepsze jedzenie świata',
    description: 'Pizza czy pierogi? Sushi czy kebab? Wybierz swoje ulubione danie.',
    category: 'food',
    authorId: 'u-kasia',
    days: 30,
    plays: 3240,
    candidates: [
      ['🍕', 'Pizza'],
      ['🍣', 'Sushi'],
      ['🍔', 'Burger'],
      ['🌮', 'Tacos'],
      ['🍝', 'Spaghetti'],
      ['🥟', 'Pierogi'],
      ['🍜', 'Ramen'],
      ['🥐', 'Croissant'],
      ['🍛', 'Curry'],
      ['🥙', 'Kebab'],
      ['🍩', 'Pączek'],
      ['🧇', 'Gofry'],
      ['🥗', 'Sałatka'],
      ['🌭', 'Hot dog'],
      ['🍗', 'Kurczak'],
      ['🧀', 'Ser'],
    ],
  },
  {
    id: 'q-zwierzeta',
    title: 'Najsłodsze zwierzę',
    description: 'Które zwierzę jest najsłodsze? Decyzja należy do Ciebie.',
    category: 'animals',
    authorId: 'u-ola',
    days: 25,
    plays: 2810,
    candidates: [
      ['🐶', 'Pies'],
      ['🐱', 'Kot'],
      ['🦊', 'Lis'],
      ['🐼', 'Panda'],
      ['🐧', 'Pingwin'],
      ['🦉', 'Sowa'],
      ['🐬', 'Delfin'],
      ['🦁', 'Lew'],
      ['🐨', 'Koala'],
      ['🦦', 'Wydra'],
      ['🐢', 'Żółw'],
      ['🦔', 'Jeż'],
      ['🐰', 'Królik'],
      ['🐙', 'Ośmiornica'],
      ['🦒', 'Żyrafa'],
      ['🐘', 'Słoń'],
    ],
  },
  {
    id: 'q-emoji',
    title: 'Najlepsze emoji',
    description: 'Trzydzieści dwa emoji, pięć rund i tylko jedno zostanie Twoim ulubionym.',
    category: 'other',
    authorId: 'u-demo',
    days: 18,
    plays: 2210,
    candidates: [
      ['😂', 'Płacz ze śmiechu'],
      ['😍', 'Serduszka w oczach'],
      ['😅', 'Nerwowy uśmiech'],
      ['😎', 'Okulary'],
      ['🤔', 'Myśliciel'],
      ['😭', 'Rzewny płacz'],
      ['🙃', 'Do góry nogami'],
      ['😴', 'Śpioch'],
      ['🤯', 'Eksplozja mózgu'],
      ['🥳', 'Imprezowicz'],
      ['😇', 'Aniołek'],
      ['🤡', 'Klaun'],
      ['💀', 'Czaszka'],
      ['👀', 'Oczka'],
      ['🔥', 'Ogień'],
      ['✨', 'Iskierki'],
      ['💯', 'Sto punktów'],
      ['👍', 'Kciuk w górę'],
      ['🙏', 'Złożone dłonie'],
      ['👏', 'Brawa'],
      ['🤝', 'Uścisk dłoni'],
      ['❤️', 'Serce'],
      ['💔', 'Złamane serce'],
      ['🎉', 'Konfetti'],
      ['🐐', 'Koza'],
      ['🚀', 'Rakieta'],
      ['🌈', 'Tęcza'],
      ['⭐', 'Gwiazdka'],
      ['☕', 'Kawa'],
      ['🤖', 'Robot'],
      ['👻', 'Duszek'],
      ['🙈', 'Małpka'],
    ],
  },
  {
    id: 'q-miasta',
    title: 'Najpiękniejsze miasto w Polsce',
    description: 'Rynki, starówki, nadmorskie molo. Które miasto zachwyca Cię najbardziej?',
    category: 'travel',
    authorId: 'u-zuza',
    days: 4,
    plays: 1720,
    candidates: [
      [null, 'Kraków'],
      [null, 'Gdańsk'],
      [null, 'Wrocław'],
      [null, 'Warszawa'],
      [null, 'Poznań'],
      [null, 'Toruń'],
      [null, 'Zakopane'],
      [null, 'Sopot'],
      [null, 'Łódź'],
      [null, 'Lublin'],
      [null, 'Szczecin'],
      [null, 'Katowice'],
      [null, 'Białystok'],
      [null, 'Rzeszów'],
      [null, 'Olsztyn'],
      [null, 'Bydgoszcz'],
    ],
  },
  {
    id: 'q-jezyki',
    title: 'Najlepszy język programowania',
    description: 'Odwieczny spór programistów. Który język wygra?',
    category: 'tech',
    authorId: 'u-tomek',
    days: 3,
    plays: 1530,
    candidates: [
      [null, 'Python'],
      [null, 'JavaScript'],
      [null, 'C++'],
      [null, 'Java'],
      [null, 'Rust'],
      [null, 'Go'],
      [null, 'C#'],
      [null, 'TypeScript'],
      [null, 'Kotlin'],
      [null, 'Swift'],
      [null, 'PHP'],
      [null, 'Ruby'],
      [null, 'C'],
      [null, 'Dart'],
      [null, 'Scala'],
      [null, 'Haskell'],
    ],
  },
  {
    id: 'q-gry',
    title: 'Najlepszy gatunek gier',
    description: 'Od RPG po symulatory traktora. W co grasz najchętniej?',
    category: 'games',
    authorId: 'u-bartek',
    days: 12,
    plays: 1450,
    candidates: [
      ['⚔️', 'RPG'],
      ['🎯', 'Strzelanka'],
      ['🏎️', 'Wyścigi'],
      ['♟️', 'Strategia'],
      ['🍄', 'Platformówka'],
      ['🥊', 'Bijatyka'],
      ['🏕️', 'Survival'],
      ['🧟', 'Horror'],
      ['🚜', 'Symulator'],
      ['🗺️', 'Przygodowa'],
      ['⛏️', 'Sandbox'],
      [null, 'MOBA'],
      ['🪂', 'Battle royale'],
      ['🧩', 'Logiczna'],
      ['🎵', 'Rytmiczna'],
      ['⚽', 'Sportowa'],
    ],
  },
  {
    id: 'q-kierunki',
    title: 'Wymarzony kierunek podróży',
    description: 'Gdybyś jutro mógł/mogła polecieć gdziekolwiek, dokąd to by było?',
    category: 'travel',
    authorId: 'u-zuza',
    days: 13,
    plays: 1340,
    candidates: [
      ['🗼', 'Paryż'],
      ['🗽', 'Nowy Jork'],
      ['🏯', 'Tokio'],
      ['🏛️', 'Rzym'],
      ['🏝️', 'Bali'],
      ['🌋', 'Islandia'],
      ['🏔️', 'Alpy'],
      ['🐪', 'Egipt'],
    ],
  },
  {
    id: 'q-desery',
    title: 'Najlepszy deser',
    description: 'Słodki turniej dla łasuchów. Uwaga: zgłodniejesz.',
    category: 'food',
    authorId: 'u-natalia',
    days: 9,
    plays: 1180,
    candidates: [
      ['🍦', 'Lody'],
      ['🍰', 'Sernik'],
      ['🎂', 'Tort czekoladowy'],
      ['🥧', 'Szarlotka'],
      ['🥞', 'Naleśniki'],
      ['🍪', 'Ciastka'],
      ['🍫', 'Czekolada'],
      ['🍮', 'Budyń'],
      ['🍩', 'Pączek'],
      ['🧇', 'Gofry'],
      ['🧁', 'Babeczka'],
      ['🍭', 'Lizak'],
      ['🍬', 'Cukierki'],
      ['🍯', 'Miód'],
      ['🍡', 'Mochi'],
      [null, 'Kremówka'],
    ],
  },
  {
    id: 'q-muzyka',
    title: 'Najlepszy gatunek muzyczny',
    description: 'Szesnaście gatunków, jeden zwycięzca. Co gra w Twoich słuchawkach?',
    category: 'music',
    authorId: 'u-ola',
    days: 8,
    plays: 1090,
    candidates: [
      ['🎸', 'Rock'],
      ['🎤', 'Pop'],
      ['🎧', 'Rap'],
      ['🎷', 'Jazz'],
      ['🎻', 'Muzyka klasyczna'],
      ['🎛️', 'Elektronika'],
      ['🤘', 'Metal'],
      ['🕺', 'Disco polo'],
      [null, 'Reggae'],
      [null, 'Blues'],
      ['🤠', 'Country'],
      [null, 'K-pop'],
      [null, 'Funk'],
      [null, 'Soul'],
      [null, 'Indie'],
      [null, 'Lo-fi'],
    ],
  },
  {
    id: 'q-pupile',
    title: 'Najlepsze zwierzę domowe',
    description: 'Kto rządzi w Twoim domu? Wybierz idealnego pupila.',
    category: 'animals',
    authorId: 'u-ola',
    days: 11,
    plays: 960,
    candidates: [
      ['🐕', 'Pies'],
      ['🐈', 'Kot'],
      ['🐹', 'Chomik'],
      ['🦜', 'Papuga'],
      ['🐇', 'Królik'],
      ['🐠', 'Rybki'],
      ['🐢', 'Żółw'],
      ['🦎', 'Jaszczurka'],
    ],
  },
  {
    id: 'q-filmy',
    title: 'Najlepszy gatunek filmowy',
    description: 'Komedia na wieczór czy horror do późna? Wybierz swój ulubiony gatunek.',
    category: 'movies',
    authorId: 'u-ania',
    days: 10,
    plays: 880,
    candidates: [
      ['😂', 'Komedia'],
      ['👻', 'Horror'],
      ['🚀', 'Science fiction'],
      ['💥', 'Akcja'],
      ['💕', 'Romans'],
      ['🎨', 'Animacja'],
      ['🕵️', 'Kryminał'],
      ['🧙', 'Fantasy'],
    ],
  },
  {
    id: 'q-sprzet',
    title: 'Bez czego nie przeżyjesz dnia?',
    description: 'Sprzęt, który zawsze masz przy sobie. Co zostaje do końca?',
    category: 'tech',
    authorId: 'u-michal',
    days: 2,
    plays: 870,
    candidates: [
      ['📱', 'Smartfon'],
      ['💻', 'Laptop'],
      ['🎧', 'Słuchawki'],
      ['🎮', 'Konsola'],
      ['⌚', 'Smartwatch'],
      [null, 'Tablet'],
      ['🔊', 'Głośnik'],
      ['🔋', 'Powerbank'],
    ],
  },
  {
    id: 'q-pory',
    title: 'Najlepsza pora roku',
    description: 'Najkrótszy turniej na stronie: cztery opcje, trzy pojedynki.',
    category: 'other',
    authorId: 'u-natalia',
    days: 22,
    plays: 760,
    candidates: [
      ['🌷', 'Wiosna'],
      ['☀️', 'Lato'],
      ['🍂', 'Jesień'],
      ['❄️', 'Zima'],
    ],
  },
  {
    id: 'q-systemy',
    title: 'Najlepszy system operacyjny',
    description: 'Windows, macOS czy Linux? A może coś na telefon?',
    category: 'tech',
    authorId: 'u-michal',
    days: 20,
    plays: 690,
    candidates: [
      [null, 'Windows'],
      [null, 'macOS'],
      [null, 'Linux'],
      [null, 'Android'],
      [null, 'iOS'],
      [null, 'ChromeOS'],
      [null, 'Ubuntu'],
      [null, 'Fedora'],
    ],
  },
  {
    id: 'q-sport',
    title: 'Najlepsza dyscyplina sportu',
    description: 'Co najchętniej oglądasz albo uprawiasz?',
    category: 'sport',
    authorId: 'u-tomek',
    days: 14,
    plays: 640,
    candidates: [
      ['⚽', 'Piłka nożna'],
      ['🏀', 'Koszykówka'],
      ['🏐', 'Siatkówka'],
      ['🎾', 'Tenis'],
      ['🏊', 'Pływanie'],
      ['🚴', 'Kolarstwo'],
      ['⛷️', 'Narciarstwo'],
      ['🥊', 'Boks'],
    ],
  },
  {
    id: 'q-owoce',
    title: 'Najlepszy owoc',
    description: 'Szesnaście owoców, jeden zwycięzca.',
    category: 'food',
    authorId: 'u-demo',
    days: 7,
    plays: 520,
    candidates: [
      ['🍎', 'Jabłko'],
      ['🍌', 'Banan'],
      ['🍓', 'Truskawka'],
      ['🍉', 'Arbuz'],
      ['🍇', 'Winogrona'],
      ['🍍', 'Ananas'],
      ['🥭', 'Mango'],
      ['🍒', 'Wiśnie'],
      ['🍑', 'Brzoskwinia'],
      ['🥝', 'Kiwi'],
      ['🍐', 'Gruszka'],
      ['🍋', 'Cytryna'],
      ['🫐', 'Borówki'],
      ['🥥', 'Kokos'],
      ['🍊', 'Pomarańcza'],
      ['🍈', 'Melon'],
    ],
  },
  {
    id: 'q-druzynowe',
    title: 'Najlepszy sport drużynowy',
    description: 'Gra zespołowa ponad wszystko. Która dyscyplina jest najlepsza?',
    category: 'sport',
    authorId: 'u-kuba',
    days: 16,
    plays: 520,
    candidates: [
      ['⚽', 'Piłka nożna'],
      ['🏀', 'Koszykówka'],
      ['🏐', 'Siatkówka'],
      ['🤾', 'Piłka ręczna'],
      ['🏒', 'Hokej'],
      ['🏉', 'Rugby'],
      ['🏈', 'Futbol amerykański'],
      ['⚾', 'Baseball'],
    ],
  },
  {
    id: 'q-przedmioty',
    title: 'Najlepszy przedmiot w szkole',
    description: 'Wróć na chwilę do szkolnej ławki. Który przedmiot lubiłeś/lubiłaś najbardziej?',
    category: 'other',
    authorId: 'u-tomek',
    days: 6,
    plays: 480,
    candidates: [
      ['➗', 'Matematyka'],
      ['📖', 'Polski'],
      ['💬', 'Angielski'],
      ['📜', 'Historia'],
      ['🧬', 'Biologia'],
      ['🧪', 'Chemia'],
      ['⚛️', 'Fizyka'],
      ['🏃', 'WF'],
      ['💻', 'Informatyka'],
      ['🌍', 'Geografia'],
      ['🎨', 'Plastyka'],
      ['🎵', 'Muzyka'],
      ['🌱', 'Przyroda'],
      ['🔧', 'Technika'],
      [null, 'WOS'],
      ['🗨️', 'Drugi język obcy'],
    ],
  },
  {
    id: 'q-drapiezniki',
    title: 'Król drapieżników',
    description: 'Lądem, wodą i powietrzem. Kto jest prawdziwym królem?',
    category: 'animals',
    authorId: 'u-kuba',
    days: 40,
    plays: 450,
    candidates: [
      ['🦁', 'Lew'],
      ['🐅', 'Tygrys'],
      ['🦈', 'Rekin'],
      ['🐊', 'Krokodyl'],
      ['🐺', 'Wilk'],
      ['🐻', 'Niedźwiedź'],
      ['🦅', 'Orzeł'],
      ['🐍', 'Wąż'],
    ],
  },
  {
    id: 'q-planszowe',
    title: 'Najlepsza gra planszowa lub karciana',
    description: 'Klasyki na rodzinne wieczory. Przy której grze bawisz się najlepiej?',
    category: 'games',
    authorId: 'u-bartek',
    days: 3,
    plays: 410,
    candidates: [
      ['♟️', 'Szachy'],
      [null, 'Warcaby'],
      ['🎲', 'Chińczyk'],
      ['🃏', 'Karty'],
      [null, 'Domino'],
      ['🎭', 'Kalambury'],
      [null, 'Bierki'],
      ['🧠', 'Memory'],
    ],
  },
  {
    id: 'q-zimowe',
    title: 'Najlepszy sport zimowy',
    description: 'Śnieg, lód i adrenalina. Który zimowy sport wygra?',
    category: 'sport',
    authorId: 'u-kuba',
    days: 6,
    plays: 380,
    candidates: [
      ['⛷️', 'Narciarstwo'],
      ['🏂', 'Snowboard'],
      ['⛸️', 'Łyżwiarstwo'],
      ['🏒', 'Hokej'],
      ['🥌', 'Curling'],
      ['🛷', 'Saneczkarstwo'],
      [null, 'Skoki narciarskie'],
      [null, 'Biathlon'],
    ],
  },
  {
    id: 'q-instrumenty',
    title: 'Instrument, który chcesz opanować',
    description: 'Gdybyś mógł/mogła od jutra grać na jednym instrumencie…',
    category: 'music',
    authorId: 'u-ola',
    days: 5,
    plays: 310,
    candidates: [
      ['🎸', 'Gitara'],
      ['🎹', 'Pianino'],
      ['🥁', 'Perkusja'],
      ['🎻', 'Skrzypce'],
      ['🎺', 'Trąbka'],
      ['🎷', 'Saksofon'],
      ['🪕', 'Banjo'],
      ['🪗', 'Akordeon'],
    ],
  },
  {
    id: 'q-przekaski',
    title: 'Najlepsza przekąska do filmu',
    description: 'Seans bez przekąski się nie liczy. Co bierzesz do kina?',
    category: 'movies',
    authorId: 'u-ania',
    days: 1.5,
    plays: 260,
    candidates: [
      ['🍿', 'Popcorn'],
      [null, 'Nachos'],
      [null, 'Chipsy'],
      ['🍬', 'Żelki'],
      ['🍫', 'Czekolada'],
      ['🍕', 'Pizza'],
      [null, 'Paluszki'],
      ['🍦', 'Lody'],
    ],
  },
  {
    id: 'q-wakacje',
    title: 'Idealne wakacje',
    description: 'Góry, morze, a może zwiedzanie? Gdzie spędzisz urlop marzeń?',
    category: 'travel',
    authorId: 'u-kasia',
    days: 1,
    plays: 180,
    candidates: [
      ['🏖️', 'Plaża'],
      ['🏔️', 'Góry'],
      ['🏙️', 'Wielkie miasto'],
      ['🏕️', 'Biwak'],
      ['🚢', 'Rejs'],
      ['🏝️', 'Tropikalna wyspa'],
      ['🏰', 'Zamki i zabytki'],
      ['🌋', 'Wulkany'],
    ],
  },
  {
    id: 'q-supermoce',
    title: 'Supermoc idealna',
    description: 'Możesz mieć tylko jedną. Wybieraj mądrze.',
    category: 'other',
    authorId: 'u-demo',
    days: 0.2,
    plays: 37,
    candidates: [
      ['✈️', 'Latanie'],
      ['👻', 'Niewidzialność'],
      ['⏳', 'Podróże w czasie'],
      ['🧠', 'Czytanie w myślach'],
      ['⚡', 'Super szybkość'],
      ['🌀', 'Teleportacja'],
      ['💪', 'Super siła'],
      ['🗣️', 'Wszystkie języki świata'],
    ],
  },
]

// ---------- Oceny i komentarze ----------
// [quiz, użytkownik, ocena 1–5, komentarz, ile dni temu]
const REVIEWS = [
  ['q-jedzenie', 'u-tomek', 5, 'Pierogi w finale, tak być musi.', 20],
  ['q-jedzenie', 'u-natalia', 5, 'Croissant wygrał, jestem zachwycona.', 15],
  ['q-jedzenie', 'u-ola', 4, 'Trudny wybór między sushi a ramenem!', 12],
  ['q-jedzenie', 'u-bartek', 3, 'Brakuje schabowego, minus jedna gwiazdka.', 8],
  ['q-jedzenie', 'u-zuza', 4, 'Grałam trzy razy i za każdym razem wygrywało co innego.', 5],
  ['q-jedzenie', 'u-demo', 5, 'Świetny quiz, zgłodniałem.', 2],

  ['q-zwierzeta', 'u-kasia', 5, 'Wydra wygrała, nie mogło być inaczej.', 18],
  ['q-zwierzeta', 'u-tomek', 4, 'Fajne, ale brakuje kapibary.', 9],
  ['q-zwierzeta', 'u-natalia', 5, 'Sowa kontra królik w finale. Rozczulające.', 6],
  ['q-zwierzeta', 'u-kuba', 4, 'Lew powinien wygrać, ale niech będzie.', 3],

  ['q-emoji', 'u-michal', 5, '32 opcje i dalej nie wiem, które lubię najbardziej.', 14],
  ['q-emoji', 'u-ania', 5, 'Czaszka w finale to idealne podsumowanie mojego tygodnia.', 10],
  ['q-emoji', 'u-bartek', 4, 'Koza zasłużyła na więcej.', 7],
  ['q-emoji', 'u-ola', 5, 'Najlepszy quiz na nudny wykład.', 2],
  ['q-emoji', 'u-kasia', 4, 'Długi, ale wciąga.', 1],

  ['q-miasta', 'u-kasia', 5, 'Kraków kontra Gdańsk w finale – klasyk.', 3],
  ['q-miasta', 'u-tomek', 4, 'Wrocław zasługuje na więcej mistrzostw.', 2],
  ['q-miasta', 'u-kuba', 5, 'Toruń czarnym koniem!', 1],
  ['q-miasta', 'u-michal', 3, 'Fajne, ale przydałyby się zdjęcia zamiast inicjałów.', 0.5],

  ['q-jezyki', 'u-kasia', 3, 'Nie znam połowy tych języków, ale było zabawnie.', 2],
  ['q-jezyki', 'u-ola', 4, 'Python górą.', 2],
  ['q-jezyki', 'u-demo', 5, 'Rust kontra C++ w finale – emocje do końca.', 1],
  ['q-jezyki', 'u-michal', 5, 'Haskell odpadł w pierwszej rundzie, sprawiedliwość.', 1],

  ['q-gry', 'u-tomek', 5, 'RPG zawsze na pierwszym miejscu.', 10],
  ['q-gry', 'u-michal', 4, 'Sandbox powinien być wyżej.', 6],
  ['q-gry', 'u-ania', 4, 'Nie wiedziałam, że jest tyle gatunków.', 4],
  ['q-gry', 'u-kuba', 5, 'Sportowe w finale!', 2],

  ['q-kierunki', 'u-kasia', 5, 'Tokio, kiedyś na pewno.', 11],
  ['q-kierunki', 'u-natalia', 5, 'Islandia wygrała u mnie dwa razy z rzędu.', 7],
  ['q-kierunki', 'u-ania', 4, 'Paryż przereklamowany, ale i tak go wybrałam.', 3],

  ['q-desery', 'u-kasia', 5, 'Sernik kontra szarlotka – najtrudniejszy wybór w życiu.', 8],
  ['q-desery', 'u-ola', 5, 'Kremówka wygrała, nawet bez obrazka.', 5],
  ['q-desery', 'u-demo', 4, 'Teraz muszę iść do cukierni.', 2],
  ['q-desery', 'u-tomek', 4, 'Lody bezkonkurencyjne latem.', 1],

  ['q-muzyka', 'u-tomek', 4, 'Metal za wcześnie odpadł.', 7],
  ['q-muzyka', 'u-bartek', 5, 'Lo-fi do grania, rock do auta.', 4],
  ['q-muzyka', 'u-ania', 3, 'Disco polo w półfinale? Serio?', 2],

  ['q-pupile', 'u-natalia', 5, 'Kot, oczywiście.', 9],
  ['q-pupile', 'u-kuba', 5, 'Pies to najlepszy przyjaciel człowieka.', 5],
  ['q-pupile', 'u-demo', 4, 'Chomik doszedł do finału, jestem dumny.', 3],

  ['q-filmy', 'u-tomek', 5, 'Science fiction ponad wszystko.', 8],
  ['q-filmy', 'u-zuza', 4, 'Horror to nie dla mnie, ale quiz super.', 4],
  ['q-filmy', 'u-bartek', 5, 'Animacja wygrała, zasłużenie.', 1],

  ['q-sprzet', 'u-tomek', 5, 'Słuchawki, bez nich nie wychodzę z domu.', 1.5],
  ['q-sprzet', 'u-kasia', 4, 'Powerbank zasługuje na podium.', 1],
  ['q-sprzet', 'u-ola', 4, 'Smartfon wygrał. Smutna prawda.', 0.6],

  ['q-pory', 'u-zuza', 5, 'Jesień, zawsze jesień.', 18],
  ['q-pory', 'u-kuba', 4, 'Szybki, tylko trzy pojedynki.', 12],
  ['q-pory', 'u-ania', 5, 'Lato wygrało, czekam na wakacje.', 4],

  ['q-systemy', 'u-tomek', 5, 'Linux, nie ma dyskusji.', 15],
  ['q-systemy', 'u-bartek', 3, 'Windows, bo gry.', 9],
  ['q-systemy', 'u-kasia', 4, 'Wybrałam macOS, nie oceniajcie.', 3],

  ['q-sport', 'u-ola', 4, 'Pływanie forever.', 10],
  ['q-sport', 'u-kuba', 5, 'Piłka nożna musiała wygrać.', 6],
  ['q-sport', 'u-zuza', 4, 'Kolarstwo w finale, super.', 2],

  ['q-owoce', 'u-kasia', 4, 'Mango jest bezkonkurencyjne.', 6],
  ['q-owoce', 'u-ola', 5, 'Kolorowo i smacznie.', 3],
  ['q-owoce', 'u-natalia', 5, 'Truskawki na zawsze.', 1],

  ['q-druzynowe', 'u-tomek', 4, 'Siatkówka to nasz sport narodowy.', 12],
  ['q-druzynowe', 'u-bartek', 5, 'Rugby jest niedoceniane.', 5],

  ['q-przedmioty', 'u-kasia', 4, 'Informatyka wygrała, co za zaskoczenie.', 5],
  ['q-przedmioty', 'u-michal', 5, 'Matematyka w finale, szacun.', 3],
  ['q-przedmioty', 'u-ania', 3, 'Plastyka odpadła za wcześnie.', 2],
  ['q-przedmioty', 'u-demo', 4, 'Przypomniało mi się liceum.', 1],

  ['q-drapiezniki', 'u-ola', 4, 'Dobrze, że jest też orzeł.', 30],
  ['q-drapiezniki', 'u-tomek', 5, 'Rekin wygrał u mnie trzy razy.', 20],
  ['q-drapiezniki', 'u-zuza', 4, 'Wilk najlepszy.', 8],

  ['q-planszowe', 'u-michal', 5, 'Szachy, klasyka.', 2],
  ['q-planszowe', 'u-natalia', 4, 'Chińczyk i rodzinne kłótnie – idealnie.', 1],

  ['q-zimowe', 'u-zuza', 5, 'Snowboard!', 4],
  ['q-zimowe', 'u-tomek', 4, 'Skoki narciarskie powinny wygrać.', 2],

  ['q-instrumenty', 'u-tomek', 4, 'Perkusja!', 4],
  ['q-instrumenty', 'u-kasia', 5, 'Zawsze chciałam grać na pianinie.', 3],

  ['q-przekaski', 'u-bartek', 5, 'Popcorn, bez dwóch zdań.', 1],
  ['q-przekaski', 'u-zuza', 4, 'Nachos zasłużyły na więcej.', 0.7],

  ['q-wakacje', 'u-tomek', 5, 'Góry > morze, koniec dyskusji.', 0.5],
  ['q-wakacje', 'u-zuza', 5, 'Rejs w finale, marzenie.', 0.3],

  ['q-supermoce', 'u-tomek', 5, 'Teleportacja i nigdy więcej korków.', 0.1],
]

// Symuluje rozegrane turnieje, żeby ranking nie był pusty.
// Liczy maks. 250 gier, a wynik skaluje do podanej liczby rozegrań (szybciej).
function simulateStats(candidates, plays, random) {
  const weights = Object.fromEntries(candidates.map((c) => [c.id, 0.15 + random() * 2.5]))
  const stats = Object.fromEntries(
    candidates.map((c) => [c.id, { matches: 0, wins: 0, championships: 0 }]),
  )
  const sizes = availableSizes(candidates.length)
  const simulated = Math.min(plays, 250)

  for (let game = 0; game < simulated; game++) {
    // większość graczy wybiera największy turniej
    const size = random() < 0.7 ? sizes.at(-1) : sizes[Math.floor(random() * sizes.length)]
    let tournament = createTournament(candidates, size, random)

    while (!tournament.champion) {
      const [a, b] = currentPair(tournament)
      const chanceA = weights[a.id] / (weights[a.id] + weights[b.id])
      tournament = pickWinner(tournament, random() < chanceA ? a.id : b.id)
    }

    for (const match of tournament.history) {
      stats[match.winnerId].matches++
      stats[match.winnerId].wins++
      stats[match.loserId].matches++
    }
    stats[tournament.champion.id].championships++
  }

  const scale = plays / simulated
  for (const s of Object.values(stats)) {
    s.matches = Math.round(s.matches * scale)
    s.wins = Math.round(s.wins * scale)
    s.championships = Math.round(s.championships * scale)
  }
  return stats
}

export function createSeedData() {
  const now = Date.now()
  const random = createRandom(2026)
  const ago = (days) => new Date(now - days * DAY).toISOString()

  const users = USERS.map(([id, username, password, color, bio, days]) => ({
    id,
    username,
    email: `${username.replace(/[^a-z0-9]/gi, '')}@example.com`,
    password,
    bio,
    color,
    createdAt: ago(days),
  }))
  // konto demo ma "ładny" e-mail, który widać w ustawieniach
  users[0].email = 'demo@quizownia.pl'

  const quizzes = QUIZZES.map(({ days, candidates, ...quiz }) => {
    const list = candidates.map(([emoji, name], i) => ({
      id: `${quiz.id}-${i + 1}`,
      name,
      emoji,
      image: null,
    }))
    return {
      ...quiz,
      candidates: list,
      stats: simulateStats(list, quiz.plays, random),
      createdAt: ago(days),
      updatedAt: ago(days),
    }
  })

  const reviews = REVIEWS.map(([quizId, userId, rating, comment, days], i) => ({
    id: `r-${i + 1}`,
    quizId,
    userId,
    rating,
    comment,
    createdAt: ago(days),
  }))

  return { users, quizzes, reviews }
}
