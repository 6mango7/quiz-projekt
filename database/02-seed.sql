-- =========================================================
--  Quizownia – dane testowe
--
--  10 kont, 25 quizów z opcjami i 78 ocen z komentarzami.
--  Hasło każdego konta jest w komentarzu obok (np. demo / demo1234).
--  Obrazki opcji to emoji z folderu frontend/img/emoji.
--  Daty są liczone od chwili wgrania (NOW() - INTERVAL ...), więc dane są zawsze "świeże".
-- =========================================================

SET NAMES utf8mb4;
USE quizownia;

-- ---------- Kategorie ----------
INSERT INTO kategorie (id, nazwa, ikona) VALUES
  (1, 'jedzenie', 'img/emoji/1f354.svg'),
  (2, 'zwierzęta', 'img/emoji/1f43e.svg'),
  (3, 'technologia', 'img/emoji/1f4bb.svg'),
  (4, 'sport', 'img/emoji/26bd.svg'),
  (5, 'podróże', 'img/emoji/2708.svg'),
  (6, 'muzyka', 'img/emoji/1f3b5.svg'),
  (7, 'filmy i seriale', 'img/emoji/1f3ac.svg'),
  (8, 'gry', 'img/emoji/1f3ae.svg'),
  (9, 'inne', 'img/emoji/2728.svg');

-- ---------- Użytkownicy ----------
INSERT INTO uzytkownicy (id, login, email, haslo, opis, data_rejestracji) VALUES
  (1, 'demo', 'demo@quizownia.pl', '$2y$10$pxg/AsR2A0gLuNuKKh6.weZbLnX7YaqKFswA.w5qNySHAGfxlOWMy', 'Konto testowe – możesz się na nie zalogować i sprawdzić wszystko.', NOW() - INTERVAL 57600 MINUTE), -- hasło: demo1234
  (2, 'kasia_q', 'kasiaq@example.com', '$2y$10$nB82xg46oajKiYBODZyICedi3LN6Lq.VVhzgBYcABrGau0WwWFAsK', 'Robię quizy o jedzeniu i podróżach.', NOW() - INTERVAL 172800 MINUTE), -- hasło: kasia123
  (3, 'tomek99', 'tomek99@example.com', '$2y$10$j91IKNx0sMjcWTRUoTZtHOURccCe4wgD3S3Fxxx9ZiH40Mia8ZZaG', 'Programista, gracz, fan sportu.', NOW() - INTERVAL 129600 MINUTE), -- hasło: tomek123
  (4, 'ola.music', 'olamusic@example.com', '$2y$10$SsCkjl2jUPxqgjgI6i6fwOclzXBMOGkXdIYhmH3OgP4RhqTwaY9AW', 'Muzyka i zwierzaki.', NOW() - INTERVAL 86400 MINUTE), -- hasło: ola12345
  (5, 'michal.dev', 'michaldev@example.com', '$2y$10$XmSUO2RqT.8Aq8Xzy/rwFujKRyjXjaT0wixQDs4vm3J5lgUrqvbqm', 'Linux, kawa i dobre klawiatury.', NOW() - INTERVAL 108000 MINUTE), -- hasło: michal123
  (6, 'zuza_w_drodze', 'zuzawdrodze@example.com', '$2y$10$kQhHY3ZtpPY9UHa63FzWpeF/zgPbhDxpxS4BJ6OqXdowIsIVlk3/G', 'Zwiedzam, fotografuję, porównuję miasta.', NOW() - INTERVAL 72000 MINUTE), -- hasło: zuza1234
  (7, 'bartek_gra', 'bartekgra@example.com', '$2y$10$Pch5iMkjDP1LRsqmRVaMCe1CwFzbdYcWu/GUwMHZh10bSVhFqBfxC', 'Gram we wszystko, od szachów po RPG.', NOW() - INTERVAL 64800 MINUTE), -- hasło: bartek123
  (8, 'ania.kino', 'aniakino@example.com', '$2y$10$H9R97ueE5i5GCdTCFYWk7u.ltIOpcIWlb6jYniA.BC5qzuYPVjwfS', 'Dwa filmy dziennie to minimum.', NOW() - INTERVAL 50400 MINUTE), -- hasło: ania1234
  (9, 'kuba_sport', 'kubasport@example.com', '$2y$10$yD/n696SYeUwuRxZwzMmpey5X.R6IfxEvom7GOd2OZNpS.fbqf2vS', 'Piłka, rower, siłownia.', NOW() - INTERVAL 115200 MINUTE), -- hasło: kuba1234
  (10, 'natalia.slodka', 'nataliaslodka@example.com', '$2y$10$D0g3LJy3HNPaE0ztz4A/ceEQ2cKTh.ObFaao5EvRrma/ENZDk7wr.', 'Piekę, testuję, oceniam desery.', NOW() - INTERVAL 43200 MINUTE); -- hasło: natalia123

-- ---------- Quizy ----------
INSERT INTO quizy (id, autor_id, kategoria_id, tytul, opis, rozegrania, data_dodania) VALUES
  (1, 2, 1, 'Najlepsze jedzenie świata', 'Pizza czy pierogi? Sushi czy kebab? Wybierz swoje ulubione danie.', 3240, NOW() - INTERVAL 43200 MINUTE),
  (2, 4, 2, 'Najsłodsze zwierzę', 'Które zwierzę jest najsłodsze? Decyzja należy do Ciebie.', 2810, NOW() - INTERVAL 36000 MINUTE),
  (3, 1, 9, 'Najlepsze emoji', 'Trzydzieści dwa emoji, pięć rund i tylko jedno zostanie Twoim ulubionym.', 2210, NOW() - INTERVAL 25920 MINUTE),
  (4, 6, 5, 'Najpiękniejsze miasto w Polsce', 'Rynki, starówki, nadmorskie molo. Które miasto zachwyca Cię najbardziej?', 1720, NOW() - INTERVAL 5760 MINUTE),
  (5, 3, 3, 'Najlepszy język programowania', 'Odwieczny spór programistów. Który język wygra?', 1530, NOW() - INTERVAL 4320 MINUTE),
  (6, 7, 8, 'Najlepszy gatunek gier', 'Od RPG po symulatory traktora. W co grasz najchętniej?', 1450, NOW() - INTERVAL 17280 MINUTE),
  (7, 6, 5, 'Wymarzony kierunek podróży', 'Gdybyś jutro mógł/mogła polecieć gdziekolwiek, dokąd to by było?', 1340, NOW() - INTERVAL 18720 MINUTE),
  (8, 10, 1, 'Najlepszy deser', 'Słodki turniej dla łasuchów. Uwaga: zgłodniejesz.', 1180, NOW() - INTERVAL 12960 MINUTE),
  (9, 4, 6, 'Najlepszy gatunek muzyczny', 'Szesnaście gatunków, jeden zwycięzca. Co gra w Twoich słuchawkach?', 1090, NOW() - INTERVAL 11520 MINUTE),
  (10, 4, 2, 'Najlepsze zwierzę domowe', 'Kto rządzi w Twoim domu? Wybierz idealnego pupila.', 960, NOW() - INTERVAL 15840 MINUTE),
  (11, 8, 7, 'Najlepszy gatunek filmowy', 'Komedia na wieczór czy horror do późna? Wybierz swój ulubiony gatunek.', 880, NOW() - INTERVAL 14400 MINUTE),
  (12, 5, 3, 'Bez czego nie przeżyjesz dnia?', 'Sprzęt, który zawsze masz przy sobie. Co zostaje do końca?', 870, NOW() - INTERVAL 2880 MINUTE),
  (13, 10, 9, 'Najlepsza pora roku', 'Najkrótszy turniej na stronie: cztery opcje, trzy pojedynki.', 760, NOW() - INTERVAL 31680 MINUTE),
  (14, 5, 3, 'Najlepszy system operacyjny', 'Windows, macOS czy Linux? A może coś na telefon?', 690, NOW() - INTERVAL 28800 MINUTE),
  (15, 3, 4, 'Najlepsza dyscyplina sportu', 'Co najchętniej oglądasz albo uprawiasz?', 640, NOW() - INTERVAL 20160 MINUTE),
  (16, 1, 1, 'Najlepszy owoc', 'Szesnaście owoców, jeden zwycięzca.', 520, NOW() - INTERVAL 10080 MINUTE),
  (17, 9, 4, 'Najlepszy sport drużynowy', 'Gra zespołowa ponad wszystko. Która dyscyplina jest najlepsza?', 520, NOW() - INTERVAL 23040 MINUTE),
  (18, 3, 9, 'Najlepszy przedmiot w szkole', 'Wróć na chwilę do szkolnej ławki. Który przedmiot lubiłeś/lubiłaś najbardziej?', 480, NOW() - INTERVAL 8640 MINUTE),
  (19, 9, 2, 'Król drapieżników', 'Lądem, wodą i powietrzem. Kto jest prawdziwym królem?', 450, NOW() - INTERVAL 57600 MINUTE),
  (20, 7, 8, 'Najlepsza gra planszowa lub karciana', 'Klasyki na rodzinne wieczory. Przy której grze bawisz się najlepiej?', 410, NOW() - INTERVAL 4320 MINUTE),
  (21, 9, 4, 'Najlepszy sport zimowy', 'Śnieg, lód i adrenalina. Który zimowy sport wygra?', 380, NOW() - INTERVAL 8640 MINUTE),
  (22, 4, 6, 'Instrument, który chcesz opanować', 'Gdybyś mógł/mogła od jutra grać na jednym instrumencie…', 310, NOW() - INTERVAL 7200 MINUTE),
  (23, 8, 7, 'Najlepsza przekąska do filmu', 'Seans bez przekąski się nie liczy. Co bierzesz do kina?', 260, NOW() - INTERVAL 2160 MINUTE),
  (24, 2, 5, 'Idealne wakacje', 'Góry, morze, a może zwiedzanie? Gdzie spędzisz urlop marzeń?', 180, NOW() - INTERVAL 1440 MINUTE),
  (25, 1, 9, 'Supermoc idealna', 'Możesz mieć tylko jedną. Wybieraj mądrze.', 37, NOW() - INTERVAL 288 MINUTE);

-- ---------- Opcje quizów (z wynikami rozegranych turniejów) ----------
-- Najlepsze jedzenie świata
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (1, 'Pizza', 'img/emoji/1f355.svg', 5664, 3046, 207),
  (1, 'Sushi', 'img/emoji/1f363.svg', 5016, 2411, 143),
  (1, 'Burger', 'img/emoji/1f354.svg', 6208, 3771, 350),
  (1, 'Tacos', 'img/emoji/1f32e.svg', 5741, 3266, 298),
  (1, 'Spaghetti', 'img/emoji/1f35d.svg', 4290, 1529, 65),
  (1, 'Pierogi', 'img/emoji/1f95f.svg', 5028, 2281, 104),
  (1, 'Ramen', 'img/emoji/1f35c.svg', 6506, 4121, 376),
  (1, 'Croissant', 'img/emoji/1f950.svg', 6830, 4717, 661),
  (1, 'Curry', 'img/emoji/1f35b.svg', 4990, 2359, 78),
  (1, 'Kebab', 'img/emoji/1f959.svg', 3603, 752, 0),
  (1, 'Pączek', 'img/emoji/1f369.svg', 3771, 1011, 26),
  (1, 'Gofry', 'img/emoji/1f9c7.svg', 6273, 3914, 454),
  (1, 'Sałatka', 'img/emoji/1f957.svg', 5340, 2773, 220),
  (1, 'Hot dog', 'img/emoji/1f32d.svg', 4277, 1516, 39),
  (1, 'Kurczak', 'img/emoji/1f357.svg', 4808, 1983, 78),
  (1, 'Ser', 'img/emoji/1f9c0.svg', 4653, 2048, 143);

-- Najsłodsze zwierzę
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (2, 'Pies', 'img/emoji/1f436.svg', 4665, 2349, 112),
  (2, 'Kot', 'img/emoji/1f431.svg', 4755, 2338, 146),
  (2, 'Lis', 'img/emoji/1f98a.svg', 4462, 1967, 67),
  (2, 'Panda', 'img/emoji/1f43c.svg', 6373, 4462, 573),
  (2, 'Pingwin', 'img/emoji/1f427.svg', 5159, 2911, 247),
  (2, 'Sowa', 'img/emoji/1f989.svg', 6216, 4372, 629),
  (2, 'Delfin', 'img/emoji/1f42c.svg', 3507, 1045, 22),
  (2, 'Lew', 'img/emoji/1f981.svg', 5957, 3912, 405),
  (2, 'Koala', 'img/emoji/1f428.svg', 3968, 1630, 56),
  (2, 'Wydra', 'img/emoji/1f9a6.svg', 3158, 787, 0),
  (2, 'Żółw', 'img/emoji/1f422.svg', 3203, 629, 0),
  (2, 'Jeż', 'img/emoji/1f994.svg', 4282, 1888, 124),
  (2, 'Królik', 'img/emoji/1f430.svg', 3822, 1405, 34),
  (2, 'Ośmiornica', 'img/emoji/1f419.svg', 4080, 1652, 56),
  (2, 'Żyrafa', 'img/emoji/1f992.svg', 5665, 3507, 259),
  (2, 'Słoń', 'img/emoji/1f418.svg', 4327, 1945, 79);

-- Najlepsze emoji
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (3, 'Płacz ze śmiechu', 'img/emoji/1f602.svg', 2829, 1025, 18),
  (3, 'Serduszka w oczach', 'img/emoji/1f60d.svg', 4376, 2696, 115),
  (3, 'Nerwowy uśmiech', 'img/emoji/1f605.svg', 3448, 1680, 71),
  (3, 'Okulary', 'img/emoji/1f60e.svg', 3536, 1786, 62),
  (3, 'Myśliciel', 'img/emoji/1f914.svg', 4164, 2431, 106),
  (3, 'Rzewny płacz', 'img/emoji/1f62d.svg', 3784, 2016, 106),
  (3, 'Do góry nogami', 'img/emoji/1f643.svg', 3536, 1795, 80),
  (3, 'Śpioch', 'img/emoji/1f634.svg', 4208, 2413, 80),
  (3, 'Eksplozja mózgu', 'img/emoji/1f92f.svg', 2413, 583, 0),
  (3, 'Imprezowicz', 'img/emoji/1f973.svg', 4119, 2281, 80),
  (3, 'Aniołek', 'img/emoji/1f607.svg', 3465, 1644, 18),
  (3, 'Klaun', 'img/emoji/1f921.svg', 3845, 2148, 97),
  (3, 'Czaszka', 'img/emoji/1f480.svg', 2387, 592, 0),
  (3, 'Oczka', 'img/emoji/1f440.svg', 2528, 690, 0),
  (3, 'Ogień', 'img/emoji/1f525.svg', 3182, 1370, 27),
  (3, 'Iskierki', 'img/emoji/2728.svg', 4729, 3076, 212),
  (3, 'Sto punktów', 'img/emoji/1f4af.svg', 4473, 2820, 150),
  (3, 'Kciuk w górę', 'img/emoji/1f44d.svg', 2228, 301, 0),
  (3, 'Złożone dłonie', 'img/emoji/1f64f.svg', 3925, 2175, 53),
  (3, 'Brawa', 'img/emoji/1f44f.svg', 2820, 1043, 0),
  (3, 'Uścisk dłoni', 'img/emoji/1f91d.svg', 3032, 1246, 35),
  (3, 'Serce', 'img/emoji/2764.svg', 4270, 2546, 124),
  (3, 'Złamane serce', 'img/emoji/1f494.svg', 2298, 504, 0),
  (3, 'Konfetti', 'img/emoji/1f389.svg', 4226, 2484, 88),
  (3, 'Koza', 'img/emoji/1f410.svg', 4517, 2864, 186),
  (3, 'Rakieta', 'img/emoji/1f680.svg', 4411, 2687, 133),
  (3, 'Tęcza', 'img/emoji/1f308.svg', 3739, 1954, 88),
  (3, 'Gwiazdka', 'img/emoji/2b50.svg', 2572, 690, 0),
  (3, 'Kawa', 'img/emoji/2615.svg', 2475, 645, 9),
  (3, 'Robot', 'img/emoji/1f916.svg', 3810, 2095, 80),
  (3, 'Duszek', 'img/emoji/1f47b.svg', 4208, 2572, 159),
  (3, 'Małpka', 'img/emoji/1f648.svg', 3421, 1635, 35);

-- Najpiękniejsze miasto w Polsce
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (4, 'Kraków', NULL, 3137, 1782, 165),
  (4, 'Gdańsk', NULL, 2690, 1335, 103),
  (4, 'Wrocław', NULL, 2780, 1431, 124),
  (4, 'Warszawa', NULL, 2876, 1500, 124),
  (4, 'Poznań', NULL, 2621, 1238, 103),
  (4, 'Toruń', NULL, 2952, 1548, 110),
  (4, 'Zakopane', NULL, 2394, 936, 62),
  (4, 'Sopot', NULL, 2958, 1507, 83),
  (4, 'Łódź', NULL, 2463, 1032, 41),
  (4, 'Lublin', NULL, 1933, 440, 14),
  (4, 'Szczecin', NULL, 2924, 1589, 96),
  (4, 'Katowice', NULL, 2105, 640, 14),
  (4, 'Białystok', NULL, 3357, 2016, 206),
  (4, 'Rzeszów', NULL, 3378, 2147, 241),
  (4, 'Olsztyn', NULL, 2325, 860, 7),
  (4, 'Bydgoszcz', NULL, 3385, 2140, 227);

-- Najlepszy język programowania
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (5, 'Python', NULL, 2160, 863, 37),
  (5, 'JavaScript', NULL, 1891, 557, 12),
  (5, 'C++', NULL, 2111, 759, 18),
  (5, 'Java', NULL, 2436, 1151, 43),
  (5, 'Rust', NULL, 3170, 2118, 257),
  (5, 'Go', NULL, 2674, 1420, 116),
  (5, 'C#', NULL, 2264, 979, 43),
  (5, 'TypeScript', NULL, 2460, 1175, 86),
  (5, 'Kotlin', NULL, 2540, 1304, 104),
  (5, 'Swift', NULL, 2809, 1561, 110),
  (5, 'PHP', NULL, 2368, 1047, 37),
  (5, 'Ruby', NULL, 2754, 1506, 104),
  (5, 'C', NULL, 3225, 2191, 275),
  (5, 'Dart', NULL, 1812, 483, 12),
  (5, 'Scala', NULL, 2271, 936, 55),
  (5, 'Haskell', NULL, 3127, 1989, 220);

-- Najlepszy gatunek gier
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (6, 'RPG', 'img/emoji/2694.svg', 2488, 1241, 75),
  (6, 'Strzelanka', 'img/emoji/1f3af.svg', 2529, 1288, 75),
  (6, 'Wyścigi', 'img/emoji/1f3ce.svg', 2952, 1781, 168),
  (6, 'Strategia', 'img/emoji/265f.svg', 1537, 244, 0),
  (6, 'Platformówka', 'img/emoji/1f344.svg', 1705, 400, 0),
  (6, 'Bijatyka', 'img/emoji/1f94a.svg', 1960, 655, 12),
  (6, 'Survival', 'img/emoji/1f3d5.svg', 1734, 435, 0),
  (6, 'Horror', 'img/emoji/1f9df.svg', 2726, 1514, 116),
  (6, 'Symulator', 'img/emoji/1f69c.svg', 2935, 1804, 168),
  (6, 'Przygodowa', 'img/emoji/1f5fa.svg', 1920, 621, 23),
  (6, 'Sandbox', 'img/emoji/26cf.svg', 2883, 1670, 133),
  (6, 'MOBA', NULL, 2482, 1270, 87),
  (6, 'Battle royale', 'img/emoji/1fa82.svg', 2958, 1810, 180),
  (6, 'Logiczna', 'img/emoji/1f9e9.svg', 2622, 1392, 81),
  (6, 'Rytmiczna', 'img/emoji/1f3b5.svg', 3080, 1920, 168),
  (6, 'Sportowa', 'img/emoji/26bd.svg', 2720, 1572, 162);

-- Wymarzony kierunek podróży
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (7, 'Paryż', 'img/emoji/1f5fc.svg', 2369, 1356, 204),
  (7, 'Nowy Jork', 'img/emoji/1f5fd.svg', 2112, 1040, 177),
  (7, 'Tokio', 'img/emoji/1f3ef.svg', 1962, 809, 86),
  (7, 'Rzym', 'img/emoji/1f3db.svg', 1924, 724, 70),
  (7, 'Bali', 'img/emoji/1f3dd.svg', 1774, 595, 86),
  (7, 'Islandia', 'img/emoji/1f30b.svg', 2407, 1383, 230),
  (7, 'Alpy', 'img/emoji/1f3d4.svg', 2482, 1549, 300),
  (7, 'Egipt', 'img/emoji/1f42a.svg', 2316, 1217, 188);

-- Najlepszy deser
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (8, 'Lody', 'img/emoji/1f366.svg', 2157, 1265, 127),
  (8, 'Sernik', 'img/emoji/1f370.svg', 1458, 491, 9),
  (8, 'Tort czekoladowy', 'img/emoji/1f382.svg', 1492, 505, 14),
  (8, 'Szarlotka', 'img/emoji/1f967.svg', 2096, 1156, 99),
  (8, 'Naleśniki', 'img/emoji/1f95e.svg', 1624, 628, 14),
  (8, 'Ciastka', 'img/emoji/1f36a.svg', 2247, 1369, 127),
  (8, 'Czekolada', 'img/emoji/1f36b.svg', 1378, 363, 9),
  (8, 'Budyń', 'img/emoji/1f36e.svg', 2417, 1496, 146),
  (8, 'Pączek', 'img/emoji/1f369.svg', 2582, 1737, 175),
  (8, 'Gofry', 'img/emoji/1f9c7.svg', 1237, 208, 0),
  (8, 'Babeczka', 'img/emoji/1f9c1.svg', 1685, 703, 33),
  (8, 'Lizak', 'img/emoji/1f36d.svg', 2374, 1506, 146),
  (8, 'Cukierki', 'img/emoji/1f36c.svg', 1794, 817, 52),
  (8, 'Miód', 'img/emoji/1f36f.svg', 1600, 571, 5),
  (8, 'Mochi', 'img/emoji/1f361.svg', 2511, 1728, 212),
  (8, 'Kremówka', NULL, 1576, 571, 9);

-- Najlepszy gatunek muzyczny
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (9, 'Rock', 'img/emoji/1f3b8.svg', 2272, 1548, 205),
  (9, 'Pop', 'img/emoji/1f3a4.svg', 1936, 1068, 65),
  (9, 'Rap', 'img/emoji/1f3a7.svg', 1753, 881, 57),
  (9, 'Jazz', 'img/emoji/1f3b7.svg', 1343, 384, 9),
  (9, 'Muzyka klasyczna', 'img/emoji/1f3bb.svg', 1840, 955, 48),
  (9, 'Elektronika', 'img/emoji/1f39b.svg', 1905, 1025, 78),
  (9, 'Metal', 'img/emoji/1f918.svg', 1264, 301, 4),
  (9, 'Disco polo', 'img/emoji/1f57a.svg', 1474, 528, 13),
  (9, 'Reggae', NULL, 2014, 1155, 109),
  (9, 'Blues', NULL, 1570, 645, 22),
  (9, 'Country', 'img/emoji/1f920.svg', 1448, 501, 22),
  (9, 'K-pop', NULL, 2333, 1548, 170),
  (9, 'Funk', NULL, 1404, 427, 4),
  (9, 'Soul', NULL, 2189, 1382, 144),
  (9, 'Indie', NULL, 1482, 558, 26),
  (9, 'Lo-fi', NULL, 2080, 1247, 113);

-- Najlepsze zwierzę domowe
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (10, 'Pies', 'img/emoji/1f415.svg', 1905, 1317, 296),
  (10, 'Kot', 'img/emoji/1f408.svg', 1413, 637, 81),
  (10, 'Chomik', 'img/emoji/1f439.svg', 995, 104, 0),
  (10, 'Papuga', 'img/emoji/1f99c.svg', 1828, 1171, 223),
  (10, 'Królik', 'img/emoji/1f407.svg', 1705, 960, 142),
  (10, 'Rybki', 'img/emoji/1f420.svg', 1475, 699, 108),
  (10, 'Żółw', 'img/emoji/1f422.svg', 1490, 718, 96),
  (10, 'Jaszczurka', 'img/emoji/1f98e.svg', 1279, 438, 15);

-- Najlepszy gatunek filmowy
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (11, 'Komedia', 'img/emoji/1f602.svg', 1408, 708, 95),
  (11, 'Horror', 'img/emoji/1f47b.svg', 1799, 1345, 352),
  (11, 'Science fiction', 'img/emoji/1f680.svg', 1447, 764, 109),
  (11, 'Akcja', 'img/emoji/1f4a5.svg', 1112, 327, 14),
  (11, 'Romans', 'img/emoji/1f495.svg', 1637, 1010, 183),
  (11, 'Animacja', 'img/emoji/1f3a8.svg', 1123, 331, 18),
  (11, 'Kryminał', 'img/emoji/1f575.svg', 1211, 451, 21),
  (11, 'Fantasy', 'img/emoji/1f9d9.svg', 1288, 577, 88);

-- Bez czego nie przeżyjesz dnia?
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (12, 'Smartfon', 'img/emoji/1f4f1.svg', 1434, 759, 125),
  (12, 'Laptop', 'img/emoji/1f4bb.svg', 1350, 651, 84),
  (12, 'Słuchawki', 'img/emoji/1f3a7.svg', 1709, 1232, 299),
  (12, 'Konsola', 'img/emoji/1f3ae.svg', 1305, 581, 63),
  (12, 'Smartwatch', 'img/emoji/231a.svg', 1061, 296, 14),
  (12, 'Tablet', NULL, 1110, 331, 21),
  (12, 'Głośnik', 'img/emoji/1f50a.svg', 1608, 971, 171),
  (12, 'Powerbank', 'img/emoji/1f50b.svg', 1322, 630, 94);

-- Najlepsza pora roku
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (13, 'Wiosna', 'img/emoji/1f337.svg', 1262, 809, 307),
  (13, 'Lato', 'img/emoji/2600.svg', 1277, 787, 271),
  (13, 'Jesień', 'img/emoji/1f342.svg', 1107, 505, 158),
  (13, 'Zima', 'img/emoji/2744.svg', 915, 179, 24);

-- Najlepszy system operacyjny
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (14, 'Windows', NULL, 1203, 684, 119),
  (14, 'macOS', NULL, 1228, 701, 130),
  (14, 'Linux', NULL, 1181, 649, 105),
  (14, 'Android', NULL, 972, 345, 14),
  (14, 'iOS', NULL, 1217, 690, 130),
  (14, 'ChromeOS', NULL, 1278, 784, 141),
  (14, 'Ubuntu', NULL, 969, 342, 30),
  (14, 'Fedora', NULL, 883, 270, 22);

-- Najlepsza dyscyplina sportu
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (15, 'Piłka nożna', 'img/emoji/26bd.svg', 814, 236, 13),
  (15, 'Koszykówka', 'img/emoji/1f3c0.svg', 1044, 502, 61),
  (15, 'Siatkówka', 'img/emoji/1f3d0.svg', 965, 456, 69),
  (15, 'Tenis', 'img/emoji/1f3be.svg', 914, 371, 51),
  (15, 'Pływanie', 'img/emoji/1f3ca.svg', 1111, 640, 118),
  (15, 'Kolarstwo', 'img/emoji/1f6b4.svg', 1037, 520, 74),
  (15, 'Narciarstwo', 'img/emoji/26f7.svg', 1170, 740, 148),
  (15, 'Boks', 'img/emoji/1f94a.svg', 1085, 607, 105);

-- Najlepszy owoc
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (16, 'Jabłko', 'img/emoji/1f34e.svg', 876, 464, 31),
  (16, 'Banan', 'img/emoji/1f34c.svg', 961, 568, 58),
  (16, 'Truskawka', 'img/emoji/1f353.svg', 792, 379, 25),
  (16, 'Arbuz', 'img/emoji/1f349.svg', 830, 404, 25),
  (16, 'Winogrona', 'img/emoji/1f347.svg', 903, 503, 40),
  (16, 'Ananas', 'img/emoji/1f34d.svg', 842, 437, 37),
  (16, 'Mango', 'img/emoji/1f96d.svg', 1119, 743, 85),
  (16, 'Wiśnie', 'img/emoji/1f352.svg', 639, 179, 6),
  (16, 'Brzoskwinia', 'img/emoji/1f351.svg', 730, 289, 8),
  (16, 'Kiwi', 'img/emoji/1f95d.svg', 522, 85, 0),
  (16, 'Gruszka', 'img/emoji/1f350.svg', 659, 210, 4),
  (16, 'Cytryna', 'img/emoji/1f34b.svg', 757, 320, 10),
  (16, 'Borówki', 'img/emoji/1fad0.svg', 901, 466, 27),
  (16, 'Kokos', 'img/emoji/1f965.svg', 1048, 661, 62),
  (16, 'Pomarańcza', 'img/emoji/1f34a.svg', 740, 283, 10),
  (16, 'Melon', 'img/emoji/1f348.svg', 1067, 703, 89);

-- Najlepszy sport drużynowy
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (17, 'Piłka nożna', 'img/emoji/26bd.svg', 948, 603, 133),
  (17, 'Koszykówka', 'img/emoji/1f3c0.svg', 807, 395, 56),
  (17, 'Siatkówka', 'img/emoji/1f3d0.svg', 811, 383, 54),
  (17, 'Piłka ręczna', 'img/emoji/1f93e.svg', 844, 456, 85),
  (17, 'Hokej', 'img/emoji/1f3d2.svg', 905, 499, 77),
  (17, 'Rugby', 'img/emoji/1f3c9.svg', 678, 233, 27),
  (17, 'Futbol amerykański', 'img/emoji/1f3c8.svg', 778, 358, 44),
  (17, 'Baseball', 'img/emoji/26be.svg', 759, 339, 44);

-- Najlepszy przedmiot w szkole
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (18, 'Matematyka', 'img/emoji/2797.svg', 493, 69, 0),
  (18, 'Polski', 'img/emoji/1f4d6.svg', 612, 180, 0),
  (18, 'Angielski', 'img/emoji/1f4ac.svg', 950, 605, 73),
  (18, 'Historia', 'img/emoji/1f4dc.svg', 849, 455, 27),
  (18, 'Biologia', 'img/emoji/1f9ec.svg', 831, 457, 50),
  (18, 'Chemia', 'img/emoji/1f9ea.svg', 975, 588, 54),
  (18, 'Fizyka', 'img/emoji/269b.svg', 1000, 616, 56),
  (18, 'WF', 'img/emoji/1f3c3.svg', 607, 186, 0),
  (18, 'Informatyka', 'img/emoji/1f4bb.svg', 885, 530, 56),
  (18, 'Geografia', 'img/emoji/1f30d.svg', 712, 305, 12),
  (18, 'Plastyka', 'img/emoji/1f3a8.svg', 534, 115, 0),
  (18, 'Muzyka', 'img/emoji/1f3b5.svg', 728, 328, 17),
  (18, 'Przyroda', 'img/emoji/1f331.svg', 879, 499, 36),
  (18, 'Technika', 'img/emoji/1f527.svg', 755, 342, 12),
  (18, 'WOS', NULL, 862, 470, 35),
  (18, 'Drugi język obcy', 'img/emoji/1f5e8.svg', 929, 555, 54);

-- Król drapieżników
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (19, 'Lew', 'img/emoji/1f981.svg', 639, 257, 27),
  (19, 'Tygrys', 'img/emoji/1f405.svg', 504, 83, 0),
  (19, 'Rekin', 'img/emoji/1f988.svg', 747, 380, 52),
  (19, 'Krokodyl', 'img/emoji/1f40a.svg', 896, 617, 133),
  (19, 'Wilk', 'img/emoji/1f43a.svg', 862, 574, 115),
  (19, 'Niedźwiedź', 'img/emoji/1f43b.svg', 621, 227, 20),
  (19, 'Orzeł', 'img/emoji/1f985.svg', 670, 283, 29),
  (19, 'Wąż', 'img/emoji/1f40d.svg', 785, 441, 74);

-- Najlepsza gra planszowa lub karciana
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (20, 'Szachy', 'img/emoji/265f.svg', 713, 399, 66),
  (20, 'Warcaby', NULL, 602, 249, 26),
  (20, 'Chińczyk', 'img/emoji/1f3b2.svg', 804, 576, 133),
  (20, 'Karty', 'img/emoji/1f0cf.svg', 686, 376, 62),
  (20, 'Domino', NULL, 541, 187, 13),
  (20, 'Kalambury', 'img/emoji/1f3ad.svg', 512, 161, 18),
  (20, 'Bierki', NULL, 589, 241, 25),
  (20, 'Memory', 'img/emoji/1f9e0.svg', 690, 380, 67);

-- Najlepszy sport zimowy
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (21, 'Narciarstwo', 'img/emoji/26f7.svg', 638, 325, 46),
  (21, 'Snowboard', 'img/emoji/1f3c2.svg', 616, 302, 46),
  (21, 'Łyżwiarstwo', 'img/emoji/26f8.svg', 600, 268, 23),
  (21, 'Hokej', 'img/emoji/1f3d2.svg', 497, 152, 11),
  (21, 'Curling', 'img/emoji/1f94c.svg', 486, 135, 8),
  (21, 'Saneczkarstwo', 'img/emoji/1f6f7.svg', 792, 564, 129),
  (21, 'Skoki narciarskie', NULL, 591, 248, 18),
  (21, 'Biathlon', NULL, 746, 489, 100);

-- Instrument, który chcesz opanować
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (22, 'Gitara', 'img/emoji/1f3b8.svg', 551, 319, 56),
  (22, 'Pianino', 'img/emoji/1f3b9.svg', 631, 451, 107),
  (22, 'Perkusja', 'img/emoji/1f941.svg', 516, 277, 46),
  (22, 'Skrzypce', 'img/emoji/1f3bb.svg', 521, 270, 32),
  (22, 'Trąbka', 'img/emoji/1f3ba.svg', 454, 191, 19),
  (22, 'Saksofon', 'img/emoji/1f3b7.svg', 360, 82, 2),
  (22, 'Banjo', 'img/emoji/1fa95.svg', 363, 83, 4),
  (22, 'Akordeon', 'img/emoji/1fa97.svg', 538, 294, 45);

-- Najlepsza przekąska do filmu
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (23, 'Popcorn', 'img/emoji/1f37f.svg', 501, 321, 60),
  (23, 'Nachos', NULL, 441, 234, 31),
  (23, 'Chipsy', NULL, 336, 94, 2),
  (23, 'Żelki', 'img/emoji/1f36c.svg', 419, 200, 26),
  (23, 'Czekolada', 'img/emoji/1f36b.svg', 287, 48, 0),
  (23, 'Pizza', 'img/emoji/1f355.svg', 434, 226, 30),
  (23, 'Paluszki', NULL, 402, 186, 26),
  (23, 'Lody', 'img/emoji/1f366.svg', 528, 366, 84);

-- Idealne wakacje
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (24, 'Plaża', 'img/emoji/1f3d6.svg', 256, 90, 6),
  (24, 'Góry', 'img/emoji/1f3d4.svg', 263, 104, 10),
  (24, 'Wielkie miasto', 'img/emoji/1f3d9.svg', 200, 38, 1),
  (24, 'Biwak', 'img/emoji/1f3d5.svg', 334, 205, 40),
  (24, 'Rejs', 'img/emoji/1f6a2.svg', 355, 241, 51),
  (24, 'Tropikalna wyspa', 'img/emoji/1f3dd.svg', 311, 166, 19),
  (24, 'Zamki i zabytki', 'img/emoji/1f3f0.svg', 235, 73, 5),
  (24, 'Wulkany', 'img/emoji/1f30b.svg', 358, 239, 48);

-- Supermoc idealna
INSERT INTO opcje (quiz_id, nazwa, obrazek, pojedynki, wygrane, mistrzostwa) VALUES
  (25, 'Latanie', 'img/emoji/2708.svg', 72, 52, 12),
  (25, 'Niewidzialność', 'img/emoji/1f47b.svg', 61, 33, 5),
  (25, 'Podróże w czasie', 'img/emoji/23f3.svg', 55, 23, 1),
  (25, 'Czytanie w myślach', 'img/emoji/1f9e0.svg', 39, 6, 0),
  (25, 'Super szybkość', 'img/emoji/26a1.svg', 68, 38, 5),
  (25, 'Teleportacja', 'img/emoji/1f300.svg', 49, 16, 1),
  (25, 'Super siła', 'img/emoji/1f4aa.svg', 69, 47, 11),
  (25, 'Wszystkie języki świata', 'img/emoji/1f5e3.svg', 49, 16, 2);

-- ---------- Oceny i komentarze ----------
INSERT INTO oceny (quiz_id, uzytkownik_id, ocena, komentarz, data_dodania) VALUES
  (1, 3, 5, 'Pierogi w finale, tak być musi.', NOW() - INTERVAL 28800 MINUTE),
  (1, 10, 5, 'Croissant wygrał, jestem zachwycona.', NOW() - INTERVAL 21600 MINUTE),
  (1, 4, 4, 'Trudny wybór między sushi a ramenem!', NOW() - INTERVAL 17280 MINUTE),
  (1, 7, 3, 'Brakuje schabowego, minus jedna gwiazdka.', NOW() - INTERVAL 11520 MINUTE),
  (1, 6, 4, 'Grałam trzy razy i za każdym razem wygrywało co innego.', NOW() - INTERVAL 7200 MINUTE),
  (1, 1, 5, 'Świetny quiz, zgłodniałem.', NOW() - INTERVAL 2880 MINUTE),
  (2, 2, 5, 'Wydra wygrała, nie mogło być inaczej.', NOW() - INTERVAL 25920 MINUTE),
  (2, 3, 4, 'Fajne, ale brakuje kapibary.', NOW() - INTERVAL 12960 MINUTE),
  (2, 10, 5, 'Sowa kontra królik w finale. Rozczulające.', NOW() - INTERVAL 8640 MINUTE),
  (2, 9, 4, 'Lew powinien wygrać, ale niech będzie.', NOW() - INTERVAL 4320 MINUTE),
  (3, 5, 5, '32 opcje i dalej nie wiem, które lubię najbardziej.', NOW() - INTERVAL 20160 MINUTE),
  (3, 8, 5, 'Czaszka w finale to idealne podsumowanie mojego tygodnia.', NOW() - INTERVAL 14400 MINUTE),
  (3, 7, 4, 'Koza zasłużyła na więcej.', NOW() - INTERVAL 10080 MINUTE),
  (3, 4, 5, 'Najlepszy quiz na nudny wykład.', NOW() - INTERVAL 2880 MINUTE),
  (3, 2, 4, 'Długi, ale wciąga.', NOW() - INTERVAL 1440 MINUTE),
  (4, 2, 5, 'Kraków kontra Gdańsk w finale – klasyk.', NOW() - INTERVAL 4320 MINUTE),
  (4, 3, 4, 'Wrocław zasługuje na więcej mistrzostw.', NOW() - INTERVAL 2880 MINUTE),
  (4, 9, 5, 'Toruń czarnym koniem!', NOW() - INTERVAL 1440 MINUTE),
  (4, 5, 3, 'Fajne, ale przydałyby się zdjęcia zamiast inicjałów.', NOW() - INTERVAL 720 MINUTE),
  (5, 2, 3, 'Nie znam połowy tych języków, ale było zabawnie.', NOW() - INTERVAL 2880 MINUTE),
  (5, 4, 4, 'Python górą.', NOW() - INTERVAL 2880 MINUTE),
  (5, 1, 5, 'Rust kontra C++ w finale – emocje do końca.', NOW() - INTERVAL 1440 MINUTE),
  (5, 5, 5, 'Haskell odpadł w pierwszej rundzie, sprawiedliwość.', NOW() - INTERVAL 1440 MINUTE),
  (6, 3, 5, 'RPG zawsze na pierwszym miejscu.', NOW() - INTERVAL 14400 MINUTE),
  (6, 5, 4, 'Sandbox powinien być wyżej.', NOW() - INTERVAL 8640 MINUTE),
  (6, 8, 4, 'Nie wiedziałam, że jest tyle gatunków.', NOW() - INTERVAL 5760 MINUTE),
  (6, 9, 5, 'Sportowe w finale!', NOW() - INTERVAL 2880 MINUTE),
  (7, 2, 5, 'Tokio, kiedyś na pewno.', NOW() - INTERVAL 15840 MINUTE),
  (7, 10, 5, 'Islandia wygrała u mnie dwa razy z rzędu.', NOW() - INTERVAL 10080 MINUTE),
  (7, 8, 4, 'Paryż przereklamowany, ale i tak go wybrałam.', NOW() - INTERVAL 4320 MINUTE),
  (8, 2, 5, 'Sernik kontra szarlotka – najtrudniejszy wybór w życiu.', NOW() - INTERVAL 11520 MINUTE),
  (8, 4, 5, 'Kremówka wygrała, nawet bez obrazka.', NOW() - INTERVAL 7200 MINUTE),
  (8, 1, 4, 'Teraz muszę iść do cukierni.', NOW() - INTERVAL 2880 MINUTE),
  (8, 3, 4, 'Lody bezkonkurencyjne latem.', NOW() - INTERVAL 1440 MINUTE),
  (9, 3, 4, 'Metal za wcześnie odpadł.', NOW() - INTERVAL 10080 MINUTE),
  (9, 7, 5, 'Lo-fi do grania, rock do auta.', NOW() - INTERVAL 5760 MINUTE),
  (9, 8, 3, 'Disco polo w półfinale? Serio?', NOW() - INTERVAL 2880 MINUTE),
  (10, 10, 5, 'Kot, oczywiście.', NOW() - INTERVAL 12960 MINUTE),
  (10, 9, 5, 'Pies to najlepszy przyjaciel człowieka.', NOW() - INTERVAL 7200 MINUTE),
  (10, 1, 4, 'Chomik doszedł do finału, jestem dumny.', NOW() - INTERVAL 4320 MINUTE),
  (11, 3, 5, 'Science fiction ponad wszystko.', NOW() - INTERVAL 11520 MINUTE),
  (11, 6, 4, 'Horror to nie dla mnie, ale quiz super.', NOW() - INTERVAL 5760 MINUTE),
  (11, 7, 5, 'Animacja wygrała, zasłużenie.', NOW() - INTERVAL 1440 MINUTE),
  (12, 3, 5, 'Słuchawki, bez nich nie wychodzę z domu.', NOW() - INTERVAL 2160 MINUTE),
  (12, 2, 4, 'Powerbank zasługuje na podium.', NOW() - INTERVAL 1440 MINUTE),
  (12, 4, 4, 'Smartfon wygrał. Smutna prawda.', NOW() - INTERVAL 864 MINUTE),
  (13, 6, 5, 'Jesień, zawsze jesień.', NOW() - INTERVAL 25920 MINUTE),
  (13, 9, 4, 'Szybki, tylko trzy pojedynki.', NOW() - INTERVAL 17280 MINUTE),
  (13, 8, 5, 'Lato wygrało, czekam na wakacje.', NOW() - INTERVAL 5760 MINUTE),
  (14, 3, 5, 'Linux, nie ma dyskusji.', NOW() - INTERVAL 21600 MINUTE),
  (14, 7, 3, 'Windows, bo gry.', NOW() - INTERVAL 12960 MINUTE),
  (14, 2, 4, 'Wybrałam macOS, nie oceniajcie.', NOW() - INTERVAL 4320 MINUTE),
  (15, 4, 4, 'Pływanie forever.', NOW() - INTERVAL 14400 MINUTE),
  (15, 9, 5, 'Piłka nożna musiała wygrać.', NOW() - INTERVAL 8640 MINUTE),
  (15, 6, 4, 'Kolarstwo w finale, super.', NOW() - INTERVAL 2880 MINUTE),
  (16, 2, 4, 'Mango jest bezkonkurencyjne.', NOW() - INTERVAL 8640 MINUTE),
  (16, 4, 5, 'Kolorowo i smacznie.', NOW() - INTERVAL 4320 MINUTE),
  (16, 10, 5, 'Truskawki na zawsze.', NOW() - INTERVAL 1440 MINUTE),
  (17, 3, 4, 'Siatkówka to nasz sport narodowy.', NOW() - INTERVAL 17280 MINUTE),
  (17, 7, 5, 'Rugby jest niedoceniane.', NOW() - INTERVAL 7200 MINUTE),
  (18, 2, 4, 'Informatyka wygrała, co za zaskoczenie.', NOW() - INTERVAL 7200 MINUTE),
  (18, 5, 5, 'Matematyka w finale, szacun.', NOW() - INTERVAL 4320 MINUTE),
  (18, 8, 3, 'Plastyka odpadła za wcześnie.', NOW() - INTERVAL 2880 MINUTE),
  (18, 1, 4, 'Przypomniało mi się liceum.', NOW() - INTERVAL 1440 MINUTE),
  (19, 4, 4, 'Dobrze, że jest też orzeł.', NOW() - INTERVAL 43200 MINUTE),
  (19, 3, 5, 'Rekin wygrał u mnie trzy razy.', NOW() - INTERVAL 28800 MINUTE),
  (19, 6, 4, 'Wilk najlepszy.', NOW() - INTERVAL 11520 MINUTE),
  (20, 5, 5, 'Szachy, klasyka.', NOW() - INTERVAL 2880 MINUTE),
  (20, 10, 4, 'Chińczyk i rodzinne kłótnie – idealnie.', NOW() - INTERVAL 1440 MINUTE),
  (21, 6, 5, 'Snowboard!', NOW() - INTERVAL 5760 MINUTE),
  (21, 3, 4, 'Skoki narciarskie powinny wygrać.', NOW() - INTERVAL 2880 MINUTE),
  (22, 3, 4, 'Perkusja!', NOW() - INTERVAL 5760 MINUTE),
  (22, 2, 5, 'Zawsze chciałam grać na pianinie.', NOW() - INTERVAL 4320 MINUTE),
  (23, 7, 5, 'Popcorn, bez dwóch zdań.', NOW() - INTERVAL 1440 MINUTE),
  (23, 6, 4, 'Nachos zasłużyły na więcej.', NOW() - INTERVAL 1008 MINUTE),
  (24, 3, 5, 'Góry > morze, koniec dyskusji.', NOW() - INTERVAL 720 MINUTE),
  (24, 6, 5, 'Rejs w finale, marzenie.', NOW() - INTERVAL 432 MINUTE),
  (25, 3, 5, 'Teleportacja i nigdy więcej korków.', NOW() - INTERVAL 144 MINUTE);
