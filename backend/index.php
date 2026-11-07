<?php
//sprawdza czy backend dziala i widzi baze
require_once __DIR__ . '/init.php';

$result = $db->fetchOne('SELECT COUNT(*) AS total FROM quizy');

jsonResponse([
    'php'      => phpversion(),
    'database' => 'connected',
    'quizzes'  => $result['total'],
]);