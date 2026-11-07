<?php
// Ustawienia aplikacji.
// Plik nic nie wypisuje, tylko zwraca tablicę – odczytujemy go tak:
//   $config = require __DIR__ . '/config/config.php';

return [
    // Dane do bazy – takie same jak w docker-compose.yml (usługa "db")
    'db' => [
        'host'     => 'db',         // nazwa usługi z docker-compose.yml, nie "localhost"
        'port'     => 3306,
        'name'     => 'quizownia',
        'user'     => 'quiz',
        'password' => 'quiz123',
        'charset'  => 'utf8mb4',    // polskie znaki i emoji
    ],
];
