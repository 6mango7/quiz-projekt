-- =========================================================
--  Quizownia – struktura bazy danych (MySQL)
--
--  Plik wgrywa się sam przy pierwszym "docker compose up".
--  Można go też zaimportować ręcznie w phpMyAdmin (zakładka Import).
-- =========================================================

SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS quizownia
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_polish_ci;

USE quizownia;

-- Konta użytkowników
CREATE TABLE uzytkownicy (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  login            VARCHAR(30)  NOT NULL,
  email            VARCHAR(100) NOT NULL,
  haslo            VARCHAR(255) NOT NULL,            -- hash z password_hash(), nigdy zwykłe hasło
  opis             VARCHAR(200) NULL,                -- kilka słów o sobie na profilu
  data_rejestracji DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY (login),
  UNIQUE KEY (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- Kategorie quizów (jedzenie, sport, ...)
CREATE TABLE kategorie (
  id    INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nazwa VARCHAR(50)  NOT NULL,
  ikona VARCHAR(100) NOT NULL,                       -- ścieżka do obrazka, np. img/emoji/1f354.svg
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- Quizy
CREATE TABLE quizy (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  autor_id     INT UNSIGNED NOT NULL,
  kategoria_id INT UNSIGNED NOT NULL,
  tytul        VARCHAR(100) NOT NULL,
  opis         TEXT         NULL,
  rozegrania   INT UNSIGNED NOT NULL DEFAULT 0,      -- ile razy ktoś zagrał do końca
  data_dodania DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  -- usunięcie konta usuwa też jego quizy
  FOREIGN KEY (autor_id) REFERENCES uzytkownicy (id) ON DELETE CASCADE,
  FOREIGN KEY (kategoria_id) REFERENCES kategorie (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- Opcje quizu, czyli "zawodnicy" w turnieju (np. Pizza, Sushi, ...)
CREATE TABLE opcje (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  quiz_id     INT UNSIGNED NOT NULL,
  nazwa       VARCHAR(60)  NOT NULL,
  obrazek     VARCHAR(255) NULL,                     -- img/emoji/... albo uploads/...; NULL = kafelek z literami
  pojedynki   INT UNSIGNED NOT NULL DEFAULT 0,       -- w ilu pojedynkach brała udział
  wygrane     INT UNSIGNED NOT NULL DEFAULT 0,       -- ile pojedynków wygrała
  mistrzostwa INT UNSIGNED NOT NULL DEFAULT 0,       -- ile razy wygrała cały turniej
  PRIMARY KEY (id),
  FOREIGN KEY (quiz_id) REFERENCES quizy (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- Oceny (1–5 gwiazdek) i komentarze – każdy może ocenić quiz tylko raz
CREATE TABLE oceny (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  quiz_id       INT UNSIGNED     NOT NULL,
  uzytkownik_id INT UNSIGNED     NOT NULL,
  ocena         TINYINT UNSIGNED NOT NULL,
  komentarz     TEXT             NULL,
  data_dodania  DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY (quiz_id, uzytkownik_id),
  CHECK (ocena BETWEEN 1 AND 5),
  FOREIGN KEY (quiz_id) REFERENCES quizy (id) ON DELETE CASCADE,
  FOREIGN KEY (uzytkownik_id) REFERENCES uzytkownicy (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- Wiadomości z formularza kontaktowego
CREATE TABLE wiadomosci (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  imie          VARCHAR(50)  NOT NULL,
  email         VARCHAR(100) NOT NULL,
  temat         VARCHAR(100) NOT NULL,
  tresc         TEXT         NOT NULL,
  data_wyslania DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
