<?php
require_once 'init.php';

jsonResponse($db->fetchAll('SELECT * FROM nie_ma_takiej_tabeli'));