<?php
//oceny i komentarze quizow (tabela oceny)

class Rating
{
    private Database $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    //oceny quizu: srednia, liczba, rozklad gwiazdek i komentarze (najnowsze pierwsze)
    public function findForQuiz(int $quizId): array
    {
        $list = $this->db->fetchAll(
            'SELECT u.login, o.ocena AS rating, o.komentarz AS comment, o.data_dodania AS createdAt
             FROM oceny o
             JOIN uzytkownicy u ON u.id = o.uzytkownik_id
             WHERE o.quiz_id = ?
             ORDER BY o.data_dodania DESC, o.id DESC',
            [$quizId]
        );

        //ile razy padla kazda liczba gwiazdek
        $distribution = [1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0];
        $sum = 0;

        foreach ($list as $rating) {
            $distribution[$rating['rating']]++;
            $sum += $rating['rating'];
        }

        $count = count($list);

        return [
            'average'      => $count > 0 ? round($sum / $count, 1) : null,
            'count'        => $count,
            'distribution' => $distribution,
            'list'         => $list,
        ];
    }

    //ocena zalogowanej osoby albo null
    public function findMine(int $quizId, int $userId): ?array
    {
        return $this->db->fetchOne(
            'SELECT ocena AS rating, komentarz AS comment
             FROM oceny
             WHERE quiz_id = ? AND uzytkownik_id = ?',
            [$quizId, $userId]
        );
    }

    //dodaje ocene albo zmienia ja, jesli ta osoba juz oceniala ten quiz
    public function save(int $quizId, int $userId, int $rating, ?string $comment): void
    {
        $this->db->execute(
            'INSERT INTO oceny (quiz_id, uzytkownik_id, ocena, komentarz)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE ocena = ?, komentarz = ?, data_dodania = NOW()',
            [$quizId, $userId, $rating, $comment, $rating, $comment]
        );
    }
}