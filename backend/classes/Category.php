<?php
//kategorie quizow (tabela kategorie)

class Category
{
    private Database $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    //wszystkie kategorie - kolejnosc jak w bazie, "inne" na koncu
    public function findAll(): array
    {
        return $this->db->fetchAll('SELECT id, nazwa AS name FROM kategorie ORDER BY id');
    }
}