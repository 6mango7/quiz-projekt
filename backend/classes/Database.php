<?php
//obiekt tworzony raz w init.php, potem uzywamy w klasach 
class Database
{
    private mysqli $connection;

    public function __construct()
    {
        // każdy błąd bazy rzuca wyjątek, zamiast po cichu zwracać false
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        $this->connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME); //credentiale z config.php
        $this->connection->set_charset('utf8mb4');
    }

    //SELECTY
    public function fetchAll(string $sql, array $params = []): array
    {
        $result = $this->connection->execute_query($sql, $params);
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    public function fetchOne(string $sql, array $params = []): ?array
    {
        $result = $this->connection->execute_query($sql, $params);
        return $result->fetch_assoc();
    }

    // INSERT, UPDATE, DELETE
    public function execute(string $sql, array $params = []): int
    {
        $this->connection->execute_query($sql, $params);
        return $this->connection->affected_rows;
    }

    //przydatne przy rejestracji   
    public function lastInsertId(): int
    {
        return $this->connection->insert_id;
    }
}