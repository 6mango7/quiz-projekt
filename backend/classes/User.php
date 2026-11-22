<?php
//operacje na tabeli uzytkownicy

class User
{
    private Database $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    //uzytkownik po id - bez hasla i emaila
    public function findById(int $id): ?array
    {
        return $this->db->fetchOne(
            'SELECT id, login FROM uzytkownicy WHERE id = ?',
            [$id]
        );
    }

    //sprawdza login/email i haslo, zwraca uzytkownika albo null
    public function checkCredentials(string $loginOrEmail, string $password): ?array
    {
        $user = $this->db->fetchOne(
            'SELECT id, login, haslo FROM uzytkownicy WHERE login = ? OR email = ?',
            [$loginOrEmail, $loginOrEmail]
        );

        if ($user === null || !password_verify($password, $user['haslo'])) {
            return null;
        }

        unset($user['haslo']); //hash hasla nie wychodzi poza klase
        return $user;
    }

    public function loginExists(string $login): bool
    {
        return $this->db->fetchOne('SELECT id FROM uzytkownicy WHERE login = ?', [$login]) !== null;
    }

    public function emailExists(string $email): bool
    {
        return $this->db->fetchOne('SELECT id FROM uzytkownicy WHERE email = ?', [$email]) !== null;
    }

    //zaklada konto i zwraca id nowego uzytkownika
    public function create(string $login, string $email, string $password): int
    {
        $this->db->execute(
            'INSERT INTO uzytkownicy (login, email, haslo) VALUES (?, ?, ?)',
            [$login, $email, password_hash($password, PASSWORD_DEFAULT)]
        );

        return $this->db->lastInsertId();
    }
}