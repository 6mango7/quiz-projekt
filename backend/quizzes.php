<?php
//lista quizow z filtrami, sortowaniem i podzialem na porcje
require_once __DIR__ . '/init.php';

requireMethod('GET');

//filtry z adresu np. quizzes.php?category=1&search=pizza&sort=new&offset=12
$categoryId = (int) ($_GET['category'] ?? 0);
$search = trim($_GET['search'] ?? '');
$sort = $_GET['sort'] ?? 'popular';

//porcja: ile quizow (1-48, domyslnie 12) i od ktorego zaczac
$limit = (int) ($_GET['limit'] ?? 12);
$limit = max(1, min($limit, 48));
$offset = max(0, (int) ($_GET['offset'] ?? 0));

$quizzes = new Quiz($db);
$list = $quizzes->findAll($categoryId, $search, $sort, $limit, $offset);
$total = $quizzes->countAll($categoryId, $search);

jsonResponse([
    'quizzes' => $list,
    'total'   => $total,
    'hasMore' => $offset + count($list) < $total,
]);