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
    //sort: popular, new albo best, limit i offset - ktora porcja
    public function findAll(int $categoryId, string $search, string $sort, int $limit, int $offset): array
    {
        //sortowanie - wybieramy jeden z naszych gotowych kawalkow sql
        $orderSql = match ($sort) {
            'new'   => 'q.data_dodania DESC, q.id DESC',
            'best'  => 'average DESC, q.rozegrania DESC, q.id DESC',
            default => 'q.rozegrania DESC, q.id DESC',
        };

        [$whereSql, $params] = $this->buildWhere($categoryId, $search);

        $rows = $this->db->fetchAll(
            'SELECT q.id, q.tytul AS title, q.rozegrania AS plays,
                    k.id AS category_id, k.nazwa AS category_name,
                    u.login AS author,
                    (SELECT AVG(ocena) FROM oceny WHERE quiz_id = q.id) AS average
             FROM quizy q
             JOIN kategorie k ON k.id = q.kategoria_id
             JOIN uzytkownicy u ON u.id = q.autor_id '
            . $whereSql
            . ' ORDER BY ' . $orderSql
            . ' LIMIT ' . $limit . ' OFFSET ' . $offset,
            $params
        );

        $quizzes = [];
        foreach ($rows as $row) {
            $quizzes[] = $this->toCard($row);
        }

        return $quizzes;
    }

    //ile quizow pasuje do filtrow (wszystkich, bez podzialu na porcje)
    public function countAll(int $categoryId, string $search): int
    {
        [$whereSql, $params] = $this->buildWhere($categoryId, $search);

        $row = $this->db->fetchOne('SELECT COUNT(*) AS total FROM quizy q ' . $whereSql, $params);

        return $row['total'];
    }

    //warunki WHERE dla filtrow - wspolne dla listy i liczenia
    private function buildWhere(int $categoryId, string $search): array
    {
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

        return [$whereSql, $params];
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