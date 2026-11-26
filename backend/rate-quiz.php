<?php
//dodanie albo zmiana oceny quizu przez zalogowana osobe
require_once __DIR__ . '/init.php';

requireMethod('POST');

$userId = Session::requireLogin();

$data = getRequestData();
$quizId = (int) ($data['quiz_id'] ?? 0);

$quizzes = new Quiz($db);
$quiz = $quizzes->findById($quizId);

if ($quiz === null) {
    jsonError('Nie ma takiego quizu', 404);
}

if ($quiz['authorId'] === $userId) {
    jsonError('Nie możesz oceniać własnego quizu', 403);
}

//ocena 1-5, komentarz opcjonalny
$rating = filter_var($data['rating'] ?? null, FILTER_VALIDATE_INT, [
    'options' => ['min_range' => 1, 'max_range' => 5],
]);
$comment = trim($data['comment'] ?? '');

$errors = [];

if ($rating === false) {
    $errors[] = 'Wybierz ocenę od 1 do 5 gwiazdek';
}

if (mb_strlen($comment) > 1000) {
    $errors[] = 'Komentarz może mieć najwyżej 1000 znaków';
}

if (count($errors) > 0) {
    jsonErrors($errors);
}

//pusty komentarz zapisujemy jako brak komentarza
if ($comment === '') {
    $comment = null;
}

$ratings = new Rating($db);
$ratings->save($quizId, $userId, $rating, $comment);

jsonResponse(['rating' => $rating, 'comment' => $comment]);