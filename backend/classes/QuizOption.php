<?php
//opcje quizow (tabela opcje) - zawodnicy w turnieju

class QuizOption
{
    private Database $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    //ranking opcji quizu - najpierw te ktore najczesciej wygrywaly caly turniej
    public function findRanking(int $quizId): array
    {
        $rows = $this->db->fetchAll(
            'SELECT id, nazwa AS name, obrazek AS image,
                    wygrane AS wins, pojedynki AS duels, mistrzostwa AS titles
             FROM opcje
             WHERE quiz_id = ?
             ORDER BY mistrzostwa DESC, wygrane / NULLIF(pojedynki, 0) DESC, nazwa',
            [$quizId]
        );

        $options = [];
        foreach ($rows as $row) {
            $row['winRate'] = $this->winRate($row['wins'], $row['duels']);
            $options[] = $row;
        }

        return $options;
    }

    //rozmiary turnieju: 4, 8, 16... ale nie wiecej niz liczba opcji
    public static function tournamentSizes(int $optionCount): array
    {
        $sizes = [];
        for ($size = 4; $size <= $optionCount; $size *= 2) {
            $sizes[] = $size;
        }

        return $sizes;
    }

    //procent wygranych pojedynkow albo null gdy opcja jeszcze nie grala
    private function winRate(int $wins, int $duels): ?int
    {
        if ($duels === 0) {
            return null;
        }

        return (int) round($wins * 100 / $duels);
    }
}