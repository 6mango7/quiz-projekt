<?php
//jeden quiz - do strony quizu, np. quiz.php?id=1
require_once __DIR__ . '/init.php';

requireMethod('GET');

$id = (int) ($_GET['id'] ?? 0);

$quizzes = new Quiz($db);
$quiz = $quizzes->findById($id);

if ($quiz === null) {
    jsonError('Nie ma takiego quizu', 404);
}

//ranking opcji i rozmiary turnieju
$quizOptions = new QuizOption($db);
$ranking = $quizOptions->findRanking($quiz['id']);

jsonResponse([
    'quiz' => [
        'id'          => $quiz['id'],
        'title'       => $quiz['title'],
        'description' => $quiz['description'],
        'category'    => $quiz['category'],
        'author'      => $quiz['author'],
        'createdAt'   => $quiz['createdAt'],
        'mine'        => $quiz['authorId'] === Session::userId(),
    ],
    'stats' => [
        'plays'   => $quiz['plays'],
        'average' => $quiz['average'],
    ],
    'sizes'   => QuizOption::tournamentSizes(count($ranking)),
    'options' => $ranking,
]);
