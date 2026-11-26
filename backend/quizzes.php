<?php
//lista quizow - filtry, sortowanie i porcje dodamy w kolejnych krokach
require_once __DIR__ . '/init.php';

requireMethod('GET');

$quizzes = new Quiz($db);

jsonResponse($quizzes->findAll());