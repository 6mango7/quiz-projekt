<?php
// Przykładowa strona – sprawdza, czy PHP w Dockerze działa
?>
<h1>PHP działa!</h1>
<p>Wersja PHP: <?= phpversion() ?></p>
<p>Serwer: <?= $_SERVER['SERVER_SOFTWARE'] ?></p>