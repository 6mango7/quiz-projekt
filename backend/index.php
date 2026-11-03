<?php
// Tymczasowy plik startowy backendu – sprawdza, czy PHP widzi bazę danych.
// Otwórz http://localhost:8000 (albo http://localhost:8080/api/ przez frontend).
// Gdy zaczniecie pisać API, zastąpcie go czymś swoim.
require_once 'includes/db.php';

$wynik = mysqli_query($polaczenie, 'SELECT COUNT(*) AS ile FROM quizy');
$ile = mysqli_fetch_assoc($wynik)['ile'];

header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    'php'           => phpversion(),
    'baza'          => 'połączono',
    'quizy_w_bazie' => (int) $ile,
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
