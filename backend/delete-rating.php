<?php
//usuniecie oceny zalogowanej osoby
require_once __DIR__ . '/init.php';

requireMethod('POST');

$userId = Session::requireLogin();

$data = getRequestData();
$quizId = (int) ($data['quiz_id'] ?? 0);

$ratings = new Rating($db);

if (!$ratings->delete($quizId, $userId)) {
    jsonError('Nie masz oceny tego quizu', 404);
}

jsonResponse(null);