<?php
//oceny quizu - do strony quizu, np. ratings.php?quiz_id=1
require_once __DIR__ . '/init.php';

requireMethod('GET');

$quizId = (int) ($_GET['quiz_id'] ?? 0);

$quizzes = new Quiz($db);
$quiz = $quizzes->findById($quizId);

if ($quiz === null) {
    jsonError('Nie ma takiego quizu', 404);
}

$ratings = new Rating($db);

//kto oglada: gosc, autor quizu albo inny zalogowany
$userId = Session::userId();
$myRating = null;

if ($userId === null) {
    $state = 'guest';
} elseif ($userId === $quiz['authorId']) {
    $state = 'own';
} else {
    $state = 'user';
    $myRating = $ratings->findMine($quizId, $userId);
}

jsonResponse([
    'ratings'  => $ratings->findForQuiz($quizId),
    'state'    => $state,
    'myRating' => $myRating,
]);