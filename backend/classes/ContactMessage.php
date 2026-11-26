<?php
//wiadomosci z formularza kontaktowego (tabela wiadomosci)

class ContactMessage
{
    //tematy do wyboru - takie same jak na liscie w formularzu
    public const TOPICS = ['pytanie', 'błąd na stronie', 'zgłoszenie quizu', 'inne'];

    private Database $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    //zapisuje wiadomosc i zwraca jej id
    public function create(string $name, string $email, string $topic, string $message): int
    {
        $this->db->execute(
            'INSERT INTO wiadomosci (imie, email, temat, tresc) VALUES (?, ?, ?, ?)',
            [$name, $email, $topic, $message]
        );

        return $this->db->lastInsertId();
    }
}