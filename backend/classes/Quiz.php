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
                    (SELECT AVG(ocena) FROM oceny WHERE quiz_id = q.id) AS average,
                    (SELECT COUNT(*) FROM opcje WHERE quiz_id = q.id) AS option_count
             FROM quizy q
             JOIN kategorie k ON k.id = q.kategoria_id
             JOIN uzytkownicy u ON u.id = q.autor_id '
            . $whereSql
            . ' ORDER BY ' . $orderSql
            . ' LIMIT ' . $limit . ' OFFSET ' . $offset,
            $params
        );

        //okladki dla calej porcji naraz
        $covers = $this->findCovers(array_column($rows, 'id'));

        $quizzes = [];
        foreach ($rows as $row) {
            $quizzes[] = $this->toCard($row, $covers[$row['id']] ?? []);
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

    //jeden quiz po id albo null - do strony quizu
    public function findById(int $id): ?array
    {
        $row = $this->db->fetchOne(
            'SELECT q.id, q.tytul AS title, q.opis AS description, q.rozegrania AS plays,
                    q.data_dodania AS created_at, q.autor_id AS author_id,
                    k.id AS category_id, k.nazwa AS category_name,
                    u.login AS author,
                    (SELECT AVG(ocena) FROM oceny WHERE quiz_id = q.id) AS average
             FROM quizy q
             JOIN kategorie k ON k.id = q.kategoria_id
             JOIN uzytkownicy u ON u.id = q.autor_id
             WHERE q.id = ?',
            [$id]
        );

        if ($row === null) {
            return null;
        }

        return [
            'id'          => $row['id'],
            'title'       => $row['title'],
            'description' => $row['description'],
            'category'    => [
                'id'   => $row['category_id'],
                'name' => $row['category_name'],
            ],
            'author'      => $row['author'],
            'authorId'    => $row['author_id'],
            'createdAt'   => $row['created_at'],
            'plays'       => $row['plays'],
            'average'     => $this->formatAverage($row['average']),
        ];
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

    //dwie pierwsze opcje kazdego quizu - na okladke karty
    //jedno zapytanie dla calej porcji zamiast osobnego dla kazdego quizu
    private function findCovers(array $quizIds): array
    {
        if (count($quizIds) === 0) {
            return [];
        }

        //tyle znakow zapytania ile quizow, np. "?, ?, ?"
        $placeholders = implode(', ', array_fill(0, count($quizIds), '?'));

        $rows = $this->db->fetchAll(
            'SELECT quiz_id, nazwa AS name, obrazek AS image
             FROM opcje
             WHERE quiz_id IN (' . $placeholders . ')
             ORDER BY quiz_id, id',
            $quizIds
        );

        //grupujemy po quizie i zostawiamy po dwie pierwsze opcje
        $covers = [];
        foreach ($rows as $row) {
            $quizId = $row['quiz_id'];

            if (count($covers[$quizId] ?? []) < 2) {
                $covers[$quizId][] = ['name' => $row['name'], 'image' => $row['image']];
            }
        }

        return $covers;
    }

    //zamienia plaski wiersz z bazy na ksztalt ktorego oczekuje front
    private function toCard(array $row, array $cover): array
    {
        return [
            'id'          => $row['id'],
            'title'       => $row['title'],
            'category'    => [
                'id'   => $row['category_id'],
                'name' => $row['category_name'],
            ],
            'author'      => $row['author'],
            'plays'       => $row['plays'],
            'average'     => $this->formatAverage($row['average']),
            'optionCount' => $row['option_count'],
            'cover'       => $cover,
        ];
    }

    //srednia z bazy (tekst albo null) na liczbe z jednym miejscem po przecinku
    private function formatAverage(?string $average): ?float
    {
        if ($average === null) {
            return null;
        }

        return round((float) $average, 1);
    }
}