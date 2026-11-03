-- Dane testowe do lokalnej bazy (docker compose):
--   10 użytkowników, 25 quizów, opcje quizów z liczbą wyborów (times_chosen),
--   głosy +1/-1 i komentarze.
--
-- Hasło każdego konta jest w komentarzu obok jego wiersza (np. demo / demo1234).
-- W bazie są zapisane jako bcrypt w formacie PHP password_hash() – sprawdzisz je
-- przez password_verify() (w Pythonie: bcrypt.checkpw).
-- Opcje quizów i quizy nie mają obrazków (image_path i cover_image_path to NULL).
-- Daty są liczone względem chwili wgrania (now() - interval ...), więc dane są zawsze "świeże".
--
-- Wgrywa się sam razem z resztą database/init, ale tylko przy tworzeniu bazy
-- (pierwsze `docker compose up` albo po `docker compose down -v`).
-- Do istniejącej bazy wgrasz go ręcznie (z głównego folderu projektu, kontener db musi działać):
--   docker compose cp database/init/03-seed.sql db:/tmp/seed.sql
--   docker compose exec db psql -U postgres -d quiz -v ON_ERROR_STOP=1 -f /tmp/seed.sql
-- (w Git Bash poprzedź drugie polecenie MSYS_NO_PATHCONV=1, inaczej zamieni /tmp na ścieżkę Windowsa)
--
-- UWAGA: skrypt najpierw czyści WSZYSTKIE tabele, więc można go uruchamiać wiele razy,
-- ale kasuje też dane dodane ręcznie. Przy wdrożeniu na produkcję usuń ten plik z database/init.

SET client_encoding = 'UTF8';

BEGIN;

TRUNCATE public.comments, public.quiz_votes, public.quiz_items, public.quizzes,
         public.user_sessions, public.users
  RESTART IDENTITY;

-- ---------- Użytkownicy ----------
INSERT INTO public.users (id, username, email, password_hash, avatar_path, created_at, updated_at)
OVERRIDING SYSTEM VALUE VALUES
  (1, 'demo', 'demo@quizownia.pl', '$2y$10$pxg/AsR2A0gLuNuKKh6.weZbLnX7YaqKFswA.w5qNySHAGfxlOWMy', NULL, now() - interval '40 days', now() - interval '40 days'), -- hasło: demo1234
  (2, 'kasia_q', 'kasiaq@example.com', '$2y$10$nB82xg46oajKiYBODZyICedi3LN6Lq.VVhzgBYcABrGau0WwWFAsK', NULL, now() - interval '120 days', now() - interval '120 days'), -- hasło: kasia123
  (3, 'tomek99', 'tomek99@example.com', '$2y$10$j91IKNx0sMjcWTRUoTZtHOURccCe4wgD3S3Fxxx9ZiH40Mia8ZZaG', NULL, now() - interval '90 days', now() - interval '90 days'), -- hasło: tomek123
  (4, 'ola.music', 'olamusic@example.com', '$2y$10$SsCkjl2jUPxqgjgI6i6fwOclzXBMOGkXdIYhmH3OgP4RhqTwaY9AW', NULL, now() - interval '60 days', now() - interval '60 days'), -- hasło: ola12345
  (5, 'michal.dev', 'michaldev@example.com', '$2y$10$XmSUO2RqT.8Aq8Xzy/rwFujKRyjXjaT0wixQDs4vm3J5lgUrqvbqm', NULL, now() - interval '75 days', now() - interval '75 days'), -- hasło: michal123
  (6, 'zuza_w_drodze', 'zuzawdrodze@example.com', '$2y$10$kQhHY3ZtpPY9UHa63FzWpeF/zgPbhDxpxS4BJ6OqXdowIsIVlk3/G', NULL, now() - interval '50 days', now() - interval '50 days'), -- hasło: zuza1234
  (7, 'bartek_gra', 'bartekgra@example.com', '$2y$10$Pch5iMkjDP1LRsqmRVaMCe1CwFzbdYcWu/GUwMHZh10bSVhFqBfxC', NULL, now() - interval '45 days', now() - interval '45 days'), -- hasło: bartek123
  (8, 'ania.kino', 'aniakino@example.com', '$2y$10$H9R97ueE5i5GCdTCFYWk7u.ltIOpcIWlb6jYniA.BC5qzuYPVjwfS', NULL, now() - interval '35 days', now() - interval '35 days'), -- hasło: ania1234
  (9, 'kuba_sport', 'kubasport@example.com', '$2y$10$yD/n696SYeUwuRxZwzMmpey5X.R6IfxEvom7GOd2OZNpS.fbqf2vS', NULL, now() - interval '80 days', now() - interval '80 days'), -- hasło: kuba1234
  (10, 'natalia.slodka', 'nataliaslodka@example.com', '$2y$10$D0g3LJy3HNPaE0ztz4A/ceEQ2cKTh.ObFaao5EvRrma/ENZDk7wr.', NULL, now() - interval '30 days', now() - interval '30 days'); -- hasło: natalia123

-- ---------- Quizy ----------
INSERT INTO public.quizzes (id, author_id, title, description, cover_image_path, created_at, updated_at)
OVERRIDING SYSTEM VALUE VALUES
  (1, 2, 'Najlepsze jedzenie świata',
   'Pizza czy pierogi? Sushi czy kebab? Wybierz swoje ulubione danie.', NULL, now() - interval '30 days', now() - interval '30 days'),
  (2, 4, 'Najsłodsze zwierzę',
   'Które zwierzę jest najsłodsze? Decyzja należy do Ciebie.', NULL, now() - interval '25 days', now() - interval '25 days'),
  (3, 1, 'Najlepsze emoji',
   'Trzydzieści dwa emoji, pięć rund i tylko jedno zostanie Twoim ulubionym.', NULL, now() - interval '18 days', now() - interval '18 days'),
  (4, 6, 'Najpiękniejsze miasto w Polsce',
   'Rynki, starówki, nadmorskie molo. Które miasto zachwyca Cię najbardziej?', NULL, now() - interval '4 days', now() - interval '4 days'),
  (5, 3, 'Najlepszy język programowania',
   'Odwieczny spór programistów. Który język wygra?', NULL, now() - interval '3 days', now() - interval '3 days'),
  (6, 7, 'Najlepszy gatunek gier',
   'Od RPG po symulatory traktora. W co grasz najchętniej?', NULL, now() - interval '12 days', now() - interval '12 days'),
  (7, 6, 'Wymarzony kierunek podróży',
   'Gdybyś jutro mógł/mogła polecieć gdziekolwiek, dokąd to by było?', NULL, now() - interval '13 days', now() - interval '13 days'),
  (8, 10, 'Najlepszy deser',
   'Słodki turniej dla łasuchów. Uwaga: zgłodniejesz.', NULL, now() - interval '9 days', now() - interval '9 days'),
  (9, 4, 'Najlepszy gatunek muzyczny',
   'Szesnaście gatunków, jeden zwycięzca. Co gra w Twoich słuchawkach?', NULL, now() - interval '8 days', now() - interval '8 days'),
  (10, 4, 'Najlepsze zwierzę domowe',
   'Kto rządzi w Twoim domu? Wybierz idealnego pupila.', NULL, now() - interval '11 days', now() - interval '11 days'),
  (11, 8, 'Najlepszy gatunek filmowy',
   'Komedia na wieczór czy horror do późna? Wybierz swój ulubiony gatunek.', NULL, now() - interval '10 days', now() - interval '10 days'),
  (12, 5, 'Bez czego nie przeżyjesz dnia?',
   'Sprzęt, który zawsze masz przy sobie. Co zostaje do końca?', NULL, now() - interval '2 days', now() - interval '2 days'),
  (13, 10, 'Najlepsza pora roku',
   'Najkrótszy turniej na stronie: cztery opcje, trzy pojedynki.', NULL, now() - interval '22 days', now() - interval '22 days'),
  (14, 5, 'Najlepszy system operacyjny',
   'Windows, macOS czy Linux? A może coś na telefon?', NULL, now() - interval '20 days', now() - interval '20 days'),
  (15, 3, 'Najlepsza dyscyplina sportu',
   'Co najchętniej oglądasz albo uprawiasz?', NULL, now() - interval '14 days', now() - interval '14 days'),
  (16, 1, 'Najlepszy owoc',
   'Szesnaście owoców, jeden zwycięzca.', NULL, now() - interval '7 days', now() - interval '7 days'),
  (17, 9, 'Najlepszy sport drużynowy',
   'Gra zespołowa ponad wszystko. Która dyscyplina jest najlepsza?', NULL, now() - interval '16 days', now() - interval '16 days'),
  (18, 3, 'Najlepszy przedmiot w szkole',
   'Wróć na chwilę do szkolnej ławki. Który przedmiot lubiłeś/lubiłaś najbardziej?', NULL, now() - interval '6 days', now() - interval '6 days'),
  (19, 9, 'Król drapieżników',
   'Lądem, wodą i powietrzem. Kto jest prawdziwym królem?', NULL, now() - interval '40 days', now() - interval '40 days'),
  (20, 7, 'Najlepsza gra planszowa lub karciana',
   'Klasyki na rodzinne wieczory. Przy której grze bawisz się najlepiej?', NULL, now() - interval '3 days', now() - interval '3 days'),
  (21, 9, 'Najlepszy sport zimowy',
   'Śnieg, lód i adrenalina. Który zimowy sport wygra?', NULL, now() - interval '6 days', now() - interval '6 days'),
  (22, 4, 'Instrument, który chcesz opanować',
   'Gdybyś mógł/mogła od jutra grać na jednym instrumencie…', NULL, now() - interval '5 days', now() - interval '5 days'),
  (23, 8, 'Najlepsza przekąska do filmu',
   'Seans bez przekąski się nie liczy. Co bierzesz do kina?', NULL, now() - interval '1.5 days', now() - interval '1.5 days'),
  (24, 2, 'Idealne wakacje',
   'Góry, morze, a może zwiedzanie? Gdzie spędzisz urlop marzeń?', NULL, now() - interval '1 days', now() - interval '1 days'),
  (25, 1, 'Supermoc idealna',
   'Możesz mieć tylko jedną. Wybieraj mądrze.', NULL, now() - interval '0.2 days', now() - interval '0.2 days');

-- ---------- Opcje quizów ----------
-- times_chosen = ile razy opcja została wybrana w pojedynku (liczby z symulowanych turniejów)
INSERT INTO public.quiz_items (id, quiz_id, name, image_path, times_chosen, created_at)
OVERRIDING SYSTEM VALUE VALUES
  -- Najlepsze jedzenie świata
  (1, 1, 'Pizza', NULL, 3046, now() - interval '30 days'),
  (2, 1, 'Sushi', NULL, 2411, now() - interval '30 days'),
  (3, 1, 'Burger', NULL, 3771, now() - interval '30 days'),
  (4, 1, 'Tacos', NULL, 3266, now() - interval '30 days'),
  (5, 1, 'Spaghetti', NULL, 1529, now() - interval '30 days'),
  (6, 1, 'Pierogi', NULL, 2281, now() - interval '30 days'),
  (7, 1, 'Ramen', NULL, 4121, now() - interval '30 days'),
  (8, 1, 'Croissant', NULL, 4717, now() - interval '30 days'),
  (9, 1, 'Curry', NULL, 2359, now() - interval '30 days'),
  (10, 1, 'Kebab', NULL, 752, now() - interval '30 days'),
  (11, 1, 'Pączek', NULL, 1011, now() - interval '30 days'),
  (12, 1, 'Gofry', NULL, 3914, now() - interval '30 days'),
  (13, 1, 'Sałatka', NULL, 2773, now() - interval '30 days'),
  (14, 1, 'Hot dog', NULL, 1516, now() - interval '30 days'),
  (15, 1, 'Kurczak', NULL, 1983, now() - interval '30 days'),
  (16, 1, 'Ser', NULL, 2048, now() - interval '30 days'),
  -- Najsłodsze zwierzę
  (17, 2, 'Pies', NULL, 2349, now() - interval '25 days'),
  (18, 2, 'Kot', NULL, 2338, now() - interval '25 days'),
  (19, 2, 'Lis', NULL, 1967, now() - interval '25 days'),
  (20, 2, 'Panda', NULL, 4462, now() - interval '25 days'),
  (21, 2, 'Pingwin', NULL, 2911, now() - interval '25 days'),
  (22, 2, 'Sowa', NULL, 4372, now() - interval '25 days'),
  (23, 2, 'Delfin', NULL, 1045, now() - interval '25 days'),
  (24, 2, 'Lew', NULL, 3912, now() - interval '25 days'),
  (25, 2, 'Koala', NULL, 1630, now() - interval '25 days'),
  (26, 2, 'Wydra', NULL, 787, now() - interval '25 days'),
  (27, 2, 'Żółw', NULL, 629, now() - interval '25 days'),
  (28, 2, 'Jeż', NULL, 1888, now() - interval '25 days'),
  (29, 2, 'Królik', NULL, 1405, now() - interval '25 days'),
  (30, 2, 'Ośmiornica', NULL, 1652, now() - interval '25 days'),
  (31, 2, 'Żyrafa', NULL, 3507, now() - interval '25 days'),
  (32, 2, 'Słoń', NULL, 1945, now() - interval '25 days'),
  -- Najlepsze emoji
  (33, 3, 'Płacz ze śmiechu', NULL, 1025, now() - interval '18 days'),
  (34, 3, 'Serduszka w oczach', NULL, 2696, now() - interval '18 days'),
  (35, 3, 'Nerwowy uśmiech', NULL, 1680, now() - interval '18 days'),
  (36, 3, 'Okulary', NULL, 1786, now() - interval '18 days'),
  (37, 3, 'Myśliciel', NULL, 2431, now() - interval '18 days'),
  (38, 3, 'Rzewny płacz', NULL, 2016, now() - interval '18 days'),
  (39, 3, 'Do góry nogami', NULL, 1795, now() - interval '18 days'),
  (40, 3, 'Śpioch', NULL, 2413, now() - interval '18 days'),
  (41, 3, 'Eksplozja mózgu', NULL, 583, now() - interval '18 days'),
  (42, 3, 'Imprezowicz', NULL, 2281, now() - interval '18 days'),
  (43, 3, 'Aniołek', NULL, 1644, now() - interval '18 days'),
  (44, 3, 'Klaun', NULL, 2148, now() - interval '18 days'),
  (45, 3, 'Czaszka', NULL, 592, now() - interval '18 days'),
  (46, 3, 'Oczka', NULL, 690, now() - interval '18 days'),
  (47, 3, 'Ogień', NULL, 1370, now() - interval '18 days'),
  (48, 3, 'Iskierki', NULL, 3076, now() - interval '18 days'),
  (49, 3, 'Sto punktów', NULL, 2820, now() - interval '18 days'),
  (50, 3, 'Kciuk w górę', NULL, 301, now() - interval '18 days'),
  (51, 3, 'Złożone dłonie', NULL, 2175, now() - interval '18 days'),
  (52, 3, 'Brawa', NULL, 1043, now() - interval '18 days'),
  (53, 3, 'Uścisk dłoni', NULL, 1246, now() - interval '18 days'),
  (54, 3, 'Serce', NULL, 2546, now() - interval '18 days'),
  (55, 3, 'Złamane serce', NULL, 504, now() - interval '18 days'),
  (56, 3, 'Konfetti', NULL, 2484, now() - interval '18 days'),
  (57, 3, 'Koza', NULL, 2864, now() - interval '18 days'),
  (58, 3, 'Rakieta', NULL, 2687, now() - interval '18 days'),
  (59, 3, 'Tęcza', NULL, 1954, now() - interval '18 days'),
  (60, 3, 'Gwiazdka', NULL, 690, now() - interval '18 days'),
  (61, 3, 'Kawa', NULL, 645, now() - interval '18 days'),
  (62, 3, 'Robot', NULL, 2095, now() - interval '18 days'),
  (63, 3, 'Duszek', NULL, 2572, now() - interval '18 days'),
  (64, 3, 'Małpka', NULL, 1635, now() - interval '18 days'),
  -- Najpiękniejsze miasto w Polsce
  (65, 4, 'Kraków', NULL, 1782, now() - interval '4 days'),
  (66, 4, 'Gdańsk', NULL, 1335, now() - interval '4 days'),
  (67, 4, 'Wrocław', NULL, 1431, now() - interval '4 days'),
  (68, 4, 'Warszawa', NULL, 1500, now() - interval '4 days'),
  (69, 4, 'Poznań', NULL, 1238, now() - interval '4 days'),
  (70, 4, 'Toruń', NULL, 1548, now() - interval '4 days'),
  (71, 4, 'Zakopane', NULL, 936, now() - interval '4 days'),
  (72, 4, 'Sopot', NULL, 1507, now() - interval '4 days'),
  (73, 4, 'Łódź', NULL, 1032, now() - interval '4 days'),
  (74, 4, 'Lublin', NULL, 440, now() - interval '4 days'),
  (75, 4, 'Szczecin', NULL, 1589, now() - interval '4 days'),
  (76, 4, 'Katowice', NULL, 640, now() - interval '4 days'),
  (77, 4, 'Białystok', NULL, 2016, now() - interval '4 days'),
  (78, 4, 'Rzeszów', NULL, 2147, now() - interval '4 days'),
  (79, 4, 'Olsztyn', NULL, 860, now() - interval '4 days'),
  (80, 4, 'Bydgoszcz', NULL, 2140, now() - interval '4 days'),
  -- Najlepszy język programowania
  (81, 5, 'Python', NULL, 863, now() - interval '3 days'),
  (82, 5, 'JavaScript', NULL, 557, now() - interval '3 days'),
  (83, 5, 'C++', NULL, 759, now() - interval '3 days'),
  (84, 5, 'Java', NULL, 1151, now() - interval '3 days'),
  (85, 5, 'Rust', NULL, 2118, now() - interval '3 days'),
  (86, 5, 'Go', NULL, 1420, now() - interval '3 days'),
  (87, 5, 'C#', NULL, 979, now() - interval '3 days'),
  (88, 5, 'TypeScript', NULL, 1175, now() - interval '3 days'),
  (89, 5, 'Kotlin', NULL, 1304, now() - interval '3 days'),
  (90, 5, 'Swift', NULL, 1561, now() - interval '3 days'),
  (91, 5, 'PHP', NULL, 1047, now() - interval '3 days'),
  (92, 5, 'Ruby', NULL, 1506, now() - interval '3 days'),
  (93, 5, 'C', NULL, 2191, now() - interval '3 days'),
  (94, 5, 'Dart', NULL, 483, now() - interval '3 days'),
  (95, 5, 'Scala', NULL, 936, now() - interval '3 days'),
  (96, 5, 'Haskell', NULL, 1989, now() - interval '3 days'),
  -- Najlepszy gatunek gier
  (97, 6, 'RPG', NULL, 1241, now() - interval '12 days'),
  (98, 6, 'Strzelanka', NULL, 1288, now() - interval '12 days'),
  (99, 6, 'Wyścigi', NULL, 1781, now() - interval '12 days'),
  (100, 6, 'Strategia', NULL, 244, now() - interval '12 days'),
  (101, 6, 'Platformówka', NULL, 400, now() - interval '12 days'),
  (102, 6, 'Bijatyka', NULL, 655, now() - interval '12 days'),
  (103, 6, 'Survival', NULL, 435, now() - interval '12 days'),
  (104, 6, 'Horror', NULL, 1514, now() - interval '12 days'),
  (105, 6, 'Symulator', NULL, 1804, now() - interval '12 days'),
  (106, 6, 'Przygodowa', NULL, 621, now() - interval '12 days'),
  (107, 6, 'Sandbox', NULL, 1670, now() - interval '12 days'),
  (108, 6, 'MOBA', NULL, 1270, now() - interval '12 days'),
  (109, 6, 'Battle royale', NULL, 1810, now() - interval '12 days'),
  (110, 6, 'Logiczna', NULL, 1392, now() - interval '12 days'),
  (111, 6, 'Rytmiczna', NULL, 1920, now() - interval '12 days'),
  (112, 6, 'Sportowa', NULL, 1572, now() - interval '12 days'),
  -- Wymarzony kierunek podróży
  (113, 7, 'Paryż', NULL, 1356, now() - interval '13 days'),
  (114, 7, 'Nowy Jork', NULL, 1040, now() - interval '13 days'),
  (115, 7, 'Tokio', NULL, 809, now() - interval '13 days'),
  (116, 7, 'Rzym', NULL, 724, now() - interval '13 days'),
  (117, 7, 'Bali', NULL, 595, now() - interval '13 days'),
  (118, 7, 'Islandia', NULL, 1383, now() - interval '13 days'),
  (119, 7, 'Alpy', NULL, 1549, now() - interval '13 days'),
  (120, 7, 'Egipt', NULL, 1217, now() - interval '13 days'),
  -- Najlepszy deser
  (121, 8, 'Lody', NULL, 1265, now() - interval '9 days'),
  (122, 8, 'Sernik', NULL, 491, now() - interval '9 days'),
  (123, 8, 'Tort czekoladowy', NULL, 505, now() - interval '9 days'),
  (124, 8, 'Szarlotka', NULL, 1156, now() - interval '9 days'),
  (125, 8, 'Naleśniki', NULL, 628, now() - interval '9 days'),
  (126, 8, 'Ciastka', NULL, 1369, now() - interval '9 days'),
  (127, 8, 'Czekolada', NULL, 363, now() - interval '9 days'),
  (128, 8, 'Budyń', NULL, 1496, now() - interval '9 days'),
  (129, 8, 'Pączek', NULL, 1737, now() - interval '9 days'),
  (130, 8, 'Gofry', NULL, 208, now() - interval '9 days'),
  (131, 8, 'Babeczka', NULL, 703, now() - interval '9 days'),
  (132, 8, 'Lizak', NULL, 1506, now() - interval '9 days'),
  (133, 8, 'Cukierki', NULL, 817, now() - interval '9 days'),
  (134, 8, 'Miód', NULL, 571, now() - interval '9 days'),
  (135, 8, 'Mochi', NULL, 1728, now() - interval '9 days'),
  (136, 8, 'Kremówka', NULL, 571, now() - interval '9 days'),
  -- Najlepszy gatunek muzyczny
  (137, 9, 'Rock', NULL, 1548, now() - interval '8 days'),
  (138, 9, 'Pop', NULL, 1068, now() - interval '8 days'),
  (139, 9, 'Rap', NULL, 881, now() - interval '8 days'),
  (140, 9, 'Jazz', NULL, 384, now() - interval '8 days'),
  (141, 9, 'Muzyka klasyczna', NULL, 955, now() - interval '8 days'),
  (142, 9, 'Elektronika', NULL, 1025, now() - interval '8 days'),
  (143, 9, 'Metal', NULL, 301, now() - interval '8 days'),
  (144, 9, 'Disco polo', NULL, 528, now() - interval '8 days'),
  (145, 9, 'Reggae', NULL, 1155, now() - interval '8 days'),
  (146, 9, 'Blues', NULL, 645, now() - interval '8 days'),
  (147, 9, 'Country', NULL, 501, now() - interval '8 days'),
  (148, 9, 'K-pop', NULL, 1548, now() - interval '8 days'),
  (149, 9, 'Funk', NULL, 427, now() - interval '8 days'),
  (150, 9, 'Soul', NULL, 1382, now() - interval '8 days'),
  (151, 9, 'Indie', NULL, 558, now() - interval '8 days'),
  (152, 9, 'Lo-fi', NULL, 1247, now() - interval '8 days'),
  -- Najlepsze zwierzę domowe
  (153, 10, 'Pies', NULL, 1317, now() - interval '11 days'),
  (154, 10, 'Kot', NULL, 637, now() - interval '11 days'),
  (155, 10, 'Chomik', NULL, 104, now() - interval '11 days'),
  (156, 10, 'Papuga', NULL, 1171, now() - interval '11 days'),
  (157, 10, 'Królik', NULL, 960, now() - interval '11 days'),
  (158, 10, 'Rybki', NULL, 699, now() - interval '11 days'),
  (159, 10, 'Żółw', NULL, 718, now() - interval '11 days'),
  (160, 10, 'Jaszczurka', NULL, 438, now() - interval '11 days'),
  -- Najlepszy gatunek filmowy
  (161, 11, 'Komedia', NULL, 708, now() - interval '10 days'),
  (162, 11, 'Horror', NULL, 1345, now() - interval '10 days'),
  (163, 11, 'Science fiction', NULL, 764, now() - interval '10 days'),
  (164, 11, 'Akcja', NULL, 327, now() - interval '10 days'),
  (165, 11, 'Romans', NULL, 1010, now() - interval '10 days'),
  (166, 11, 'Animacja', NULL, 331, now() - interval '10 days'),
  (167, 11, 'Kryminał', NULL, 451, now() - interval '10 days'),
  (168, 11, 'Fantasy', NULL, 577, now() - interval '10 days'),
  -- Bez czego nie przeżyjesz dnia?
  (169, 12, 'Smartfon', NULL, 759, now() - interval '2 days'),
  (170, 12, 'Laptop', NULL, 651, now() - interval '2 days'),
  (171, 12, 'Słuchawki', NULL, 1232, now() - interval '2 days'),
  (172, 12, 'Konsola', NULL, 581, now() - interval '2 days'),
  (173, 12, 'Smartwatch', NULL, 296, now() - interval '2 days'),
  (174, 12, 'Tablet', NULL, 331, now() - interval '2 days'),
  (175, 12, 'Głośnik', NULL, 971, now() - interval '2 days'),
  (176, 12, 'Powerbank', NULL, 630, now() - interval '2 days'),
  -- Najlepsza pora roku
  (177, 13, 'Wiosna', NULL, 809, now() - interval '22 days'),
  (178, 13, 'Lato', NULL, 787, now() - interval '22 days'),
  (179, 13, 'Jesień', NULL, 505, now() - interval '22 days'),
  (180, 13, 'Zima', NULL, 179, now() - interval '22 days'),
  -- Najlepszy system operacyjny
  (181, 14, 'Windows', NULL, 684, now() - interval '20 days'),
  (182, 14, 'macOS', NULL, 701, now() - interval '20 days'),
  (183, 14, 'Linux', NULL, 649, now() - interval '20 days'),
  (184, 14, 'Android', NULL, 345, now() - interval '20 days'),
  (185, 14, 'iOS', NULL, 690, now() - interval '20 days'),
  (186, 14, 'ChromeOS', NULL, 784, now() - interval '20 days'),
  (187, 14, 'Ubuntu', NULL, 342, now() - interval '20 days'),
  (188, 14, 'Fedora', NULL, 270, now() - interval '20 days'),
  -- Najlepsza dyscyplina sportu
  (189, 15, 'Piłka nożna', NULL, 236, now() - interval '14 days'),
  (190, 15, 'Koszykówka', NULL, 502, now() - interval '14 days'),
  (191, 15, 'Siatkówka', NULL, 456, now() - interval '14 days'),
  (192, 15, 'Tenis', NULL, 371, now() - interval '14 days'),
  (193, 15, 'Pływanie', NULL, 640, now() - interval '14 days'),
  (194, 15, 'Kolarstwo', NULL, 520, now() - interval '14 days'),
  (195, 15, 'Narciarstwo', NULL, 740, now() - interval '14 days'),
  (196, 15, 'Boks', NULL, 607, now() - interval '14 days'),
  -- Najlepszy owoc
  (197, 16, 'Jabłko', NULL, 464, now() - interval '7 days'),
  (198, 16, 'Banan', NULL, 568, now() - interval '7 days'),
  (199, 16, 'Truskawka', NULL, 379, now() - interval '7 days'),
  (200, 16, 'Arbuz', NULL, 404, now() - interval '7 days'),
  (201, 16, 'Winogrona', NULL, 503, now() - interval '7 days'),
  (202, 16, 'Ananas', NULL, 437, now() - interval '7 days'),
  (203, 16, 'Mango', NULL, 743, now() - interval '7 days'),
  (204, 16, 'Wiśnie', NULL, 179, now() - interval '7 days'),
  (205, 16, 'Brzoskwinia', NULL, 289, now() - interval '7 days'),
  (206, 16, 'Kiwi', NULL, 85, now() - interval '7 days'),
  (207, 16, 'Gruszka', NULL, 210, now() - interval '7 days'),
  (208, 16, 'Cytryna', NULL, 320, now() - interval '7 days'),
  (209, 16, 'Borówki', NULL, 466, now() - interval '7 days'),
  (210, 16, 'Kokos', NULL, 661, now() - interval '7 days'),
  (211, 16, 'Pomarańcza', NULL, 283, now() - interval '7 days'),
  (212, 16, 'Melon', NULL, 703, now() - interval '7 days'),
  -- Najlepszy sport drużynowy
  (213, 17, 'Piłka nożna', NULL, 603, now() - interval '16 days'),
  (214, 17, 'Koszykówka', NULL, 395, now() - interval '16 days'),
  (215, 17, 'Siatkówka', NULL, 383, now() - interval '16 days'),
  (216, 17, 'Piłka ręczna', NULL, 456, now() - interval '16 days'),
  (217, 17, 'Hokej', NULL, 499, now() - interval '16 days'),
  (218, 17, 'Rugby', NULL, 233, now() - interval '16 days'),
  (219, 17, 'Futbol amerykański', NULL, 358, now() - interval '16 days'),
  (220, 17, 'Baseball', NULL, 339, now() - interval '16 days'),
  -- Najlepszy przedmiot w szkole
  (221, 18, 'Matematyka', NULL, 69, now() - interval '6 days'),
  (222, 18, 'Polski', NULL, 180, now() - interval '6 days'),
  (223, 18, 'Angielski', NULL, 605, now() - interval '6 days'),
  (224, 18, 'Historia', NULL, 455, now() - interval '6 days'),
  (225, 18, 'Biologia', NULL, 457, now() - interval '6 days'),
  (226, 18, 'Chemia', NULL, 588, now() - interval '6 days'),
  (227, 18, 'Fizyka', NULL, 616, now() - interval '6 days'),
  (228, 18, 'WF', NULL, 186, now() - interval '6 days'),
  (229, 18, 'Informatyka', NULL, 530, now() - interval '6 days'),
  (230, 18, 'Geografia', NULL, 305, now() - interval '6 days'),
  (231, 18, 'Plastyka', NULL, 115, now() - interval '6 days'),
  (232, 18, 'Muzyka', NULL, 328, now() - interval '6 days'),
  (233, 18, 'Przyroda', NULL, 499, now() - interval '6 days'),
  (234, 18, 'Technika', NULL, 342, now() - interval '6 days'),
  (235, 18, 'WOS', NULL, 470, now() - interval '6 days'),
  (236, 18, 'Drugi język obcy', NULL, 555, now() - interval '6 days'),
  -- Król drapieżników
  (237, 19, 'Lew', NULL, 257, now() - interval '40 days'),
  (238, 19, 'Tygrys', NULL, 83, now() - interval '40 days'),
  (239, 19, 'Rekin', NULL, 380, now() - interval '40 days'),
  (240, 19, 'Krokodyl', NULL, 617, now() - interval '40 days'),
  (241, 19, 'Wilk', NULL, 574, now() - interval '40 days'),
  (242, 19, 'Niedźwiedź', NULL, 227, now() - interval '40 days'),
  (243, 19, 'Orzeł', NULL, 283, now() - interval '40 days'),
  (244, 19, 'Wąż', NULL, 441, now() - interval '40 days'),
  -- Najlepsza gra planszowa lub karciana
  (245, 20, 'Szachy', NULL, 399, now() - interval '3 days'),
  (246, 20, 'Warcaby', NULL, 249, now() - interval '3 days'),
  (247, 20, 'Chińczyk', NULL, 576, now() - interval '3 days'),
  (248, 20, 'Karty', NULL, 376, now() - interval '3 days'),
  (249, 20, 'Domino', NULL, 187, now() - interval '3 days'),
  (250, 20, 'Kalambury', NULL, 161, now() - interval '3 days'),
  (251, 20, 'Bierki', NULL, 241, now() - interval '3 days'),
  (252, 20, 'Memory', NULL, 380, now() - interval '3 days'),
  -- Najlepszy sport zimowy
  (253, 21, 'Narciarstwo', NULL, 325, now() - interval '6 days'),
  (254, 21, 'Snowboard', NULL, 302, now() - interval '6 days'),
  (255, 21, 'Łyżwiarstwo', NULL, 268, now() - interval '6 days'),
  (256, 21, 'Hokej', NULL, 152, now() - interval '6 days'),
  (257, 21, 'Curling', NULL, 135, now() - interval '6 days'),
  (258, 21, 'Saneczkarstwo', NULL, 564, now() - interval '6 days'),
  (259, 21, 'Skoki narciarskie', NULL, 248, now() - interval '6 days'),
  (260, 21, 'Biathlon', NULL, 489, now() - interval '6 days'),
  -- Instrument, który chcesz opanować
  (261, 22, 'Gitara', NULL, 319, now() - interval '5 days'),
  (262, 22, 'Pianino', NULL, 451, now() - interval '5 days'),
  (263, 22, 'Perkusja', NULL, 277, now() - interval '5 days'),
  (264, 22, 'Skrzypce', NULL, 270, now() - interval '5 days'),
  (265, 22, 'Trąbka', NULL, 191, now() - interval '5 days'),
  (266, 22, 'Saksofon', NULL, 82, now() - interval '5 days'),
  (267, 22, 'Banjo', NULL, 83, now() - interval '5 days'),
  (268, 22, 'Akordeon', NULL, 294, now() - interval '5 days'),
  -- Najlepsza przekąska do filmu
  (269, 23, 'Popcorn', NULL, 321, now() - interval '1.5 days'),
  (270, 23, 'Nachos', NULL, 234, now() - interval '1.5 days'),
  (271, 23, 'Chipsy', NULL, 94, now() - interval '1.5 days'),
  (272, 23, 'Żelki', NULL, 200, now() - interval '1.5 days'),
  (273, 23, 'Czekolada', NULL, 48, now() - interval '1.5 days'),
  (274, 23, 'Pizza', NULL, 226, now() - interval '1.5 days'),
  (275, 23, 'Paluszki', NULL, 186, now() - interval '1.5 days'),
  (276, 23, 'Lody', NULL, 366, now() - interval '1.5 days'),
  -- Idealne wakacje
  (277, 24, 'Plaża', NULL, 90, now() - interval '1 days'),
  (278, 24, 'Góry', NULL, 104, now() - interval '1 days'),
  (279, 24, 'Wielkie miasto', NULL, 38, now() - interval '1 days'),
  (280, 24, 'Biwak', NULL, 205, now() - interval '1 days'),
  (281, 24, 'Rejs', NULL, 241, now() - interval '1 days'),
  (282, 24, 'Tropikalna wyspa', NULL, 166, now() - interval '1 days'),
  (283, 24, 'Zamki i zabytki', NULL, 73, now() - interval '1 days'),
  (284, 24, 'Wulkany', NULL, 239, now() - interval '1 days'),
  -- Supermoc idealna
  (285, 25, 'Latanie', NULL, 52, now() - interval '0.2 days'),
  (286, 25, 'Niewidzialność', NULL, 33, now() - interval '0.2 days'),
  (287, 25, 'Podróże w czasie', NULL, 23, now() - interval '0.2 days'),
  (288, 25, 'Czytanie w myślach', NULL, 6, now() - interval '0.2 days'),
  (289, 25, 'Super szybkość', NULL, 38, now() - interval '0.2 days'),
  (290, 25, 'Teleportacja', NULL, 16, now() - interval '0.2 days'),
  (291, 25, 'Super siła', NULL, 47, now() - interval '0.2 days'),
  (292, 25, 'Wszystkie języki świata', NULL, 16, now() - interval '0.2 days');

-- ---------- Głosy (+1 / -1) ----------
INSERT INTO public.quiz_votes (user_id, quiz_id, value, created_at) VALUES
  -- Najlepsze jedzenie świata
  (1, 1, 1, now() - interval '2 days'),
  (3, 1, 1, now() - interval '20 days'),
  (4, 1, 1, now() - interval '12 days'),
  (5, 1, -1, now() - interval '25.57 days'),
  (6, 1, 1, now() - interval '5 days'),
  (8, 1, 1, now() - interval '15.8 days'),
  (9, 1, 1, now() - interval '25.96 days'),
  (10, 1, 1, now() - interval '15 days'),
  -- Najsłodsze zwierzę
  (2, 2, 1, now() - interval '18 days'),
  (3, 2, 1, now() - interval '9 days'),
  (6, 2, -1, now() - interval '4.93 days'),
  (8, 2, -1, now() - interval '0.1 days'),
  (9, 2, 1, now() - interval '3 days'),
  (10, 2, 1, now() - interval '6 days'),
  -- Najlepsze emoji
  (2, 3, 1, now() - interval '1 days'),
  (3, 3, 1, now() - interval '10.66 days'),
  (4, 3, 1, now() - interval '2 days'),
  (5, 3, 1, now() - interval '14 days'),
  (6, 3, 1, now() - interval '1.11 days'),
  (7, 3, 1, now() - interval '7 days'),
  (8, 3, 1, now() - interval '10 days'),
  (10, 3, 1, now() - interval '0.49 days'),
  -- Najpiękniejsze miasto w Polsce
  (1, 4, 1, now() - interval '3.24 days'),
  (2, 4, 1, now() - interval '3 days'),
  (3, 4, 1, now() - interval '2 days'),
  (4, 4, 1, now() - interval '0.15 days'),
  (9, 4, 1, now() - interval '1 days'),
  (10, 4, 1, now() - interval '2.58 days'),
  -- Najlepszy język programowania
  (1, 5, 1, now() - interval '1 days'),
  (4, 5, 1, now() - interval '2 days'),
  (5, 5, 1, now() - interval '1 days'),
  (9, 5, 1, now() - interval '0.85 days'),
  (10, 5, -1, now() - interval '1.98 days'),
  -- Najlepszy gatunek gier
  (2, 6, 1, now() - interval '11.32 days'),
  (3, 6, 1, now() - interval '10 days'),
  (5, 6, 1, now() - interval '6 days'),
  (6, 6, 1, now() - interval '1.33 days'),
  (8, 6, 1, now() - interval '4 days'),
  (9, 6, 1, now() - interval '2 days'),
  (10, 6, 1, now() - interval '5.78 days'),
  -- Wymarzony kierunek podróży
  (1, 7, -1, now() - interval '9.35 days'),
  (2, 7, 1, now() - interval '11 days'),
  (3, 7, 1, now() - interval '9.19 days'),
  (7, 7, 1, now() - interval '12.94 days'),
  (8, 7, 1, now() - interval '3 days'),
  (10, 7, 1, now() - interval '7 days'),
  -- Najlepszy deser
  (1, 8, 1, now() - interval '2 days'),
  (2, 8, 1, now() - interval '8 days'),
  (3, 8, 1, now() - interval '1 days'),
  (4, 8, 1, now() - interval '5 days'),
  (6, 8, 1, now() - interval '5.37 days'),
  (8, 8, -1, now() - interval '4.05 days'),
  -- Najlepszy gatunek muzyczny
  (3, 9, 1, now() - interval '7 days'),
  (6, 9, 1, now() - interval '0.81 days'),
  (7, 9, 1, now() - interval '4 days'),
  (9, 9, -1, now() - interval '6.29 days'),
  (10, 9, 1, now() - interval '3.8 days'),
  -- Najlepsze zwierzę domowe
  (1, 10, 1, now() - interval '3 days'),
  (3, 10, -1, now() - interval '7.8 days'),
  (5, 10, 1, now() - interval '4.54 days'),
  (7, 10, -1, now() - interval '2.28 days'),
  (9, 10, 1, now() - interval '5 days'),
  (10, 10, 1, now() - interval '9 days'),
  -- Najlepszy gatunek filmowy
  (3, 11, 1, now() - interval '8 days'),
  (4, 11, 1, now() - interval '8.64 days'),
  (5, 11, -1, now() - interval '7.37 days'),
  (6, 11, 1, now() - interval '4 days'),
  (7, 11, 1, now() - interval '1 days'),
  -- Bez czego nie przeżyjesz dnia?
  (2, 12, 1, now() - interval '1 days'),
  (3, 12, 1, now() - interval '1.5 days'),
  (4, 12, 1, now() - interval '0.6 days'),
  (7, 12, -1, now() - interval '0.09 days'),
  (9, 12, 1, now() - interval '0.55 days'),
  (10, 12, -1, now() - interval '0.44 days'),
  -- Najlepsza pora roku
  (2, 13, 1, now() - interval '3.76 days'),
  (3, 13, 1, now() - interval '8.68 days'),
  (6, 13, 1, now() - interval '18 days'),
  (8, 13, 1, now() - interval '4 days'),
  (9, 13, 1, now() - interval '12 days'),
  -- Najlepszy system operacyjny
  (2, 14, 1, now() - interval '3 days'),
  (3, 14, 1, now() - interval '15 days'),
  (4, 14, -1, now() - interval '9.91 days'),
  (9, 14, 1, now() - interval '6.51 days'),
  (10, 14, 1, now() - interval '13.39 days'),
  -- Najlepsza dyscyplina sportu
  (2, 15, 1, now() - interval '1.75 days'),
  (4, 15, 1, now() - interval '10 days'),
  (5, 15, 1, now() - interval '8.09 days'),
  (6, 15, 1, now() - interval '2 days'),
  (9, 15, 1, now() - interval '6 days'),
  -- Najlepszy owoc
  (2, 16, 1, now() - interval '6 days'),
  (4, 16, 1, now() - interval '3 days'),
  (6, 16, 1, now() - interval '6.07 days'),
  (10, 16, 1, now() - interval '1 days'),
  -- Najlepszy sport drużynowy
  (3, 17, 1, now() - interval '12 days'),
  (4, 17, -1, now() - interval '6.23 days'),
  (7, 17, 1, now() - interval '5 days'),
  -- Najlepszy przedmiot w szkole
  (1, 18, 1, now() - interval '1 days'),
  (2, 18, 1, now() - interval '5 days'),
  (4, 18, 1, now() - interval '0.42 days'),
  (5, 18, 1, now() - interval '3 days'),
  -- Król drapieżników
  (3, 19, 1, now() - interval '20 days'),
  (4, 19, 1, now() - interval '30 days'),
  (6, 19, 1, now() - interval '8 days'),
  -- Najlepsza gra planszowa lub karciana
  (5, 20, 1, now() - interval '2 days'),
  (9, 20, 1, now() - interval '1.1 days'),
  (10, 20, 1, now() - interval '1 days'),
  -- Najlepszy sport zimowy
  (3, 21, 1, now() - interval '2 days'),
  (6, 21, 1, now() - interval '4 days'),
  (10, 21, 1, now() - interval '1.64 days'),
  -- Instrument, który chcesz opanować
  (1, 22, -1, now() - interval '2.2 days'),
  (2, 22, 1, now() - interval '3 days'),
  (3, 22, 1, now() - interval '4 days'),
  (8, 22, -1, now() - interval '3.33 days'),
  -- Najlepsza przekąska do filmu
  (4, 23, 1, now() - interval '0.76 days'),
  (6, 23, 1, now() - interval '0.7 days'),
  (7, 23, 1, now() - interval '1 days'),
  -- Idealne wakacje
  (1, 24, 1, now() - interval '0 days'),
  (3, 24, 1, now() - interval '0.5 days'),
  (5, 24, 1, now() - interval '0.87 days'),
  (6, 24, 1, now() - interval '0.3 days'),
  (8, 24, 1, now() - interval '0.82 days'),
  (10, 24, -1, now() - interval '0.7 days'),
  -- Supermoc idealna
  (3, 25, 1, now() - interval '0.1 days'),
  (10, 25, 1, now() - interval '0.02 days');

-- ---------- Komentarze ----------
INSERT INTO public.comments (id, quiz_id, user_id, content, created_at)
OVERRIDING SYSTEM VALUE VALUES
  -- Najlepsze jedzenie świata
  (1, 1, 3, 'Pierogi w finale, tak być musi.', now() - interval '20 days'),
  (2, 1, 10, 'Croissant wygrał, jestem zachwycona.', now() - interval '15 days'),
  (3, 1, 4, 'Trudny wybór między sushi a ramenem!', now() - interval '12 days'),
  (4, 1, 7, 'Brakuje schabowego, minus jedna gwiazdka.', now() - interval '8 days'),
  (5, 1, 6, 'Grałam trzy razy i za każdym razem wygrywało co innego.', now() - interval '5 days'),
  (6, 1, 1, 'Świetny quiz, zgłodniałem.', now() - interval '2 days'),
  -- Najsłodsze zwierzę
  (7, 2, 2, 'Wydra wygrała, nie mogło być inaczej.', now() - interval '18 days'),
  (8, 2, 3, 'Fajne, ale brakuje kapibary.', now() - interval '9 days'),
  (9, 2, 10, 'Sowa kontra królik w finale. Rozczulające.', now() - interval '6 days'),
  (10, 2, 9, 'Lew powinien wygrać, ale niech będzie.', now() - interval '3 days'),
  -- Najlepsze emoji
  (11, 3, 5, '32 opcje i dalej nie wiem, które lubię najbardziej.', now() - interval '14 days'),
  (12, 3, 8, 'Czaszka w finale to idealne podsumowanie mojego tygodnia.', now() - interval '10 days'),
  (13, 3, 7, 'Koza zasłużyła na więcej.', now() - interval '7 days'),
  (14, 3, 4, 'Najlepszy quiz na nudny wykład.', now() - interval '2 days'),
  (15, 3, 2, 'Długi, ale wciąga.', now() - interval '1 days'),
  -- Najpiękniejsze miasto w Polsce
  (16, 4, 2, 'Kraków kontra Gdańsk w finale – klasyk.', now() - interval '3 days'),
  (17, 4, 3, 'Wrocław zasługuje na więcej mistrzostw.', now() - interval '2 days'),
  (18, 4, 9, 'Toruń czarnym koniem!', now() - interval '1 days'),
  (19, 4, 5, 'Fajne, ale przydałyby się zdjęcia zamiast inicjałów.', now() - interval '0.5 days'),
  -- Najlepszy język programowania
  (20, 5, 2, 'Nie znam połowy tych języków, ale było zabawnie.', now() - interval '2 days'),
  (21, 5, 4, 'Python górą.', now() - interval '2 days'),
  (22, 5, 1, 'Rust kontra C++ w finale – emocje do końca.', now() - interval '1 days'),
  (23, 5, 5, 'Haskell odpadł w pierwszej rundzie, sprawiedliwość.', now() - interval '1 days'),
  -- Najlepszy gatunek gier
  (24, 6, 3, 'RPG zawsze na pierwszym miejscu.', now() - interval '10 days'),
  (25, 6, 5, 'Sandbox powinien być wyżej.', now() - interval '6 days'),
  (26, 6, 8, 'Nie wiedziałam, że jest tyle gatunków.', now() - interval '4 days'),
  (27, 6, 9, 'Sportowe w finale!', now() - interval '2 days'),
  -- Wymarzony kierunek podróży
  (28, 7, 2, 'Tokio, kiedyś na pewno.', now() - interval '11 days'),
  (29, 7, 10, 'Islandia wygrała u mnie dwa razy z rzędu.', now() - interval '7 days'),
  (30, 7, 8, 'Paryż przereklamowany, ale i tak go wybrałam.', now() - interval '3 days'),
  -- Najlepszy deser
  (31, 8, 2, 'Sernik kontra szarlotka – najtrudniejszy wybór w życiu.', now() - interval '8 days'),
  (32, 8, 4, 'Kremówka wygrała, nawet bez obrazka.', now() - interval '5 days'),
  (33, 8, 1, 'Teraz muszę iść do cukierni.', now() - interval '2 days'),
  (34, 8, 3, 'Lody bezkonkurencyjne latem.', now() - interval '1 days'),
  -- Najlepszy gatunek muzyczny
  (35, 9, 3, 'Metal za wcześnie odpadł.', now() - interval '7 days'),
  (36, 9, 7, 'Lo-fi do grania, rock do auta.', now() - interval '4 days'),
  (37, 9, 8, 'Disco polo w półfinale? Serio?', now() - interval '2 days'),
  -- Najlepsze zwierzę domowe
  (38, 10, 10, 'Kot, oczywiście.', now() - interval '9 days'),
  (39, 10, 9, 'Pies to najlepszy przyjaciel człowieka.', now() - interval '5 days'),
  (40, 10, 1, 'Chomik doszedł do finału, jestem dumny.', now() - interval '3 days'),
  -- Najlepszy gatunek filmowy
  (41, 11, 3, 'Science fiction ponad wszystko.', now() - interval '8 days'),
  (42, 11, 6, 'Horror to nie dla mnie, ale quiz super.', now() - interval '4 days'),
  (43, 11, 7, 'Animacja wygrała, zasłużenie.', now() - interval '1 days'),
  -- Bez czego nie przeżyjesz dnia?
  (44, 12, 3, 'Słuchawki, bez nich nie wychodzę z domu.', now() - interval '1.5 days'),
  (45, 12, 2, 'Powerbank zasługuje na podium.', now() - interval '1 days'),
  (46, 12, 4, 'Smartfon wygrał. Smutna prawda.', now() - interval '0.6 days'),
  -- Najlepsza pora roku
  (47, 13, 6, 'Jesień, zawsze jesień.', now() - interval '18 days'),
  (48, 13, 9, 'Szybki, tylko trzy pojedynki.', now() - interval '12 days'),
  (49, 13, 8, 'Lato wygrało, czekam na wakacje.', now() - interval '4 days'),
  -- Najlepszy system operacyjny
  (50, 14, 3, 'Linux, nie ma dyskusji.', now() - interval '15 days'),
  (51, 14, 7, 'Windows, bo gry.', now() - interval '9 days'),
  (52, 14, 2, 'Wybrałam macOS, nie oceniajcie.', now() - interval '3 days'),
  -- Najlepsza dyscyplina sportu
  (53, 15, 4, 'Pływanie forever.', now() - interval '10 days'),
  (54, 15, 9, 'Piłka nożna musiała wygrać.', now() - interval '6 days'),
  (55, 15, 6, 'Kolarstwo w finale, super.', now() - interval '2 days'),
  -- Najlepszy owoc
  (56, 16, 2, 'Mango jest bezkonkurencyjne.', now() - interval '6 days'),
  (57, 16, 4, 'Kolorowo i smacznie.', now() - interval '3 days'),
  (58, 16, 10, 'Truskawki na zawsze.', now() - interval '1 days'),
  -- Najlepszy sport drużynowy
  (59, 17, 3, 'Siatkówka to nasz sport narodowy.', now() - interval '12 days'),
  (60, 17, 7, 'Rugby jest niedoceniane.', now() - interval '5 days'),
  -- Najlepszy przedmiot w szkole
  (61, 18, 2, 'Informatyka wygrała, co za zaskoczenie.', now() - interval '5 days'),
  (62, 18, 5, 'Matematyka w finale, szacun.', now() - interval '3 days'),
  (63, 18, 8, 'Plastyka odpadła za wcześnie.', now() - interval '2 days'),
  (64, 18, 1, 'Przypomniało mi się liceum.', now() - interval '1 days'),
  -- Król drapieżników
  (65, 19, 4, 'Dobrze, że jest też orzeł.', now() - interval '30 days'),
  (66, 19, 3, 'Rekin wygrał u mnie trzy razy.', now() - interval '20 days'),
  (67, 19, 6, 'Wilk najlepszy.', now() - interval '8 days'),
  -- Najlepsza gra planszowa lub karciana
  (68, 20, 5, 'Szachy, klasyka.', now() - interval '2 days'),
  (69, 20, 10, 'Chińczyk i rodzinne kłótnie – idealnie.', now() - interval '1 days'),
  -- Najlepszy sport zimowy
  (70, 21, 6, 'Snowboard!', now() - interval '4 days'),
  (71, 21, 3, 'Skoki narciarskie powinny wygrać.', now() - interval '2 days'),
  -- Instrument, który chcesz opanować
  (72, 22, 3, 'Perkusja!', now() - interval '4 days'),
  (73, 22, 2, 'Zawsze chciałam grać na pianinie.', now() - interval '3 days'),
  -- Najlepsza przekąska do filmu
  (74, 23, 7, 'Popcorn, bez dwóch zdań.', now() - interval '1 days'),
  (75, 23, 6, 'Nachos zasłużyły na więcej.', now() - interval '0.7 days'),
  -- Idealne wakacje
  (76, 24, 3, 'Góry > morze, koniec dyskusji.', now() - interval '0.5 days'),
  (77, 24, 6, 'Rejs w finale, marzenie.', now() - interval '0.3 days'),
  -- Supermoc idealna
  (78, 25, 3, 'Teleportacja i nigdy więcej korków.', now() - interval '0.1 days');

-- Liczniki id ustawione za ostatnim wstawionym wierszem, żeby kolejne INSERT-y działały
SELECT setval(pg_get_serial_sequence('public.users', 'id'), (SELECT max(id) FROM public.users));
SELECT setval(pg_get_serial_sequence('public.quizzes', 'id'), (SELECT max(id) FROM public.quizzes));
SELECT setval(pg_get_serial_sequence('public.quiz_items', 'id'), (SELECT max(id) FROM public.quiz_items));
SELECT setval(pg_get_serial_sequence('public.comments', 'id'), (SELECT max(id) FROM public.comments));

COMMIT;
