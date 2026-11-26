<?php
//quizy (tabela quizy)

class Quiz
{
    private Database $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    //lista quizow do kart, categoryId 0 = wszystkie kategorie
    //sort: popular, new albo best
    public function findAll(int $categoryId, string $search, string $sort): array
    {
        //sortowanie - wybieramy jeden z naszych gotowych kawalkow sql
        $orderSql = match ($sort) {
            'new'   => 'q.data_dodania DESC, q.id DESC',
            'best'  => 'average DESC, q.rozegrania DESC, q.id DESC',
            default => 'q.rozegrania DESC, q.id DESC',
        };

        //warunki i wartosci dokladamy tylko dla wybranych filtrow
        $where = [];
        $params = [];

        if ($categoryId > 0) {
            $where[] = 'q.kategoria_id = ?';
            $params[] = $categoryId;
        }

        if ($search !== '') {
            $where[] = 'q.tytul LIKE ?';
            $params[] = '%' . $search . '%';
        }

        $whereSql = '';
        if (count($where) > 0) {
            $whereSql = 'WHERE ' . implode(' AND ', $where);
        }

        $rows = $this->db->fetchAll(
            'SELECT q.id, q.tytul AS title, q.rozegrania AS plays,
                    k.id AS category_id, k.nazwa AS category_name,
                    u.login AS author,
                    (SELECT AVG(ocena) FROM oceny WHERE quiz_id = q.id) AS average
             FROM quizy q
             JOIN kategorie k ON k.id = q.kategoria_id
             JOIN uzytkownicy u ON u.id = q.autor_id '
            . $whereSql
            . ' ORDER BY ' . $orderSql,
            $params
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
            'average'  => $row['average'] === null ? null : round((float) $row['average'], 1),
        ];
    }
}