<?php
//lista quizow z filtrami - sortowanie i porcje dodamy w kolejnych krokach
require_once __DIR__ . '/init.php';

requireMethod('GET');

//filtry z adresu np. quizzes.php?category=1&search=pizza
$categoryId = (int) ($_GET['category'] ?? 0);
$search = trim($_GET['search'] ?? '');

$quizzes = new Quiz($db);

jsonResponse($quizzes->findAll($categoryId, $search));