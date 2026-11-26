<?php
//quizy (tabela quizy)

class Quiz
{
    private Database $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    //lista quizow do kart
    public function findAll(): array
    {
        $rows = $this->db->fetchAll(
            'SELECT q.id, q.tytul AS title, q.rozegrania AS plays,
                    k.id AS category_id, k.nazwa AS category_name,
                    u.login AS author
             FROM quizy q
             JOIN kategorie k ON k.id = q.kategoria_id
             JOIN uzytkownicy u ON u.id = q.autor_id
             ORDER BY q.id'
        );

        $quizzes = [];
        foreach ($rows as $row) {
            $quizzes[] = $this->toCard($row);
        }

        return $quizzes;
    }

    //zamienia plaski wiersz z bazy na ksztalt ktorego oczekuje front
    private function toCard(array $row): array
    {
        return [
            'id'       => $row['id'],
            'title'    => $row['title'],
            'category' => [
                'id'   => $row['category_id'],
                'name' => $row['category_name'],
            ],
            'author'   => $row['author'],
            'plays'    => $row['plays'],
        ];
    }
}