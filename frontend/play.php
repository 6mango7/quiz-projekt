<?php
    $title = 'gra';
    $page = 'play.php';
    include 'includes/header.php';
?>
        <section id="game">
            <div id="game-top">
                <span class="sticker" id="round">start</span>
                <span class="bold" id="duel-number"></span>
                <a class="muted" id="game-title" href="quizzes.php">ładuję opcje...</a>
                <span class="badge" id="counter"></span>
            </div>
            <!-- pasek postępu, szerokość ustawia JavaScript -->
            <div class="bar" id="game-bar"><span class="bar-fill" id="progress"></span></div>
            <!-- plansza: dwie opcje, obrazki i nazwy wpisuje JavaScript -->
            <div id="board">
                <button class="tile" type="button" id="tile-left" onclick="choose('left')">
                    <span id="left-image"></span>
                    <span class="tile-name" id="left-name">lewa opcja</span>
                </button>
                <span id="or-sign">czy?</span>
                <button class="tile" type="button" id="tile-right" onclick="choose('right')">
                    <span id="right-image"></span>
                    <span class="tile-name" id="right-name">prawa opcja</span>
                </button>
            </div>
            <p class="muted" id="hint">kliknij lepszą opcję albo użyj strzałek <kbd>←</kbd> <kbd>→</kbd></p>
        </section>
        <!-- podsumowanie po finale, pokazuje je JavaScript -->
        <section id="game-summary">
            <div id="result">
                <div class="card" id="champion-card">
                    <span class="sticker">mistrz</span>
                    <span id="champion-image"></span>
                    <span id="champion-name"></span>
                </div>
                <div id="result-right">
                    <h1>podsumowanie</h1>
                    <div id="stats">
                        <div class="stat">
                            <span class="stat-label">czas gry</span>
                            <span class="stat-value" id="time">-</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">pojedynki</span>
                            <span class="stat-value" id="duel-count">-</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">na wybór</span>
                            <span class="stat-value" id="per-choice">-</span>
                        </div>
                    </div>
                    <p class="loading" id="summary">zapisuję wynik...</p>
                    <h3>droga do zwycięstwa</h3>
                    <!-- pokonani przeciwnicy mistrza, wstawia je JavaScript -->
                    <ol id="path"></ol>
                    <div id="result-buttons">
                        <a class="button yellow" id="play-again" href="play.php">zagraj jeszcze raz</a>
                        <a class="button" id="quiz-link" href="quizzes.php">ranking i oceny quizu</a>
                    </div>
                </div>
            </div>
        </section>
<?php include 'includes/footer.php'; ?>
    <!-- najpierw wygląd i przebieg gry, potem komunikacja z bazą -->
    <script src="js/common.js"></script>
    <script src="js/play.js"></script>
    <script src="js/play-api.js"></script>
</body>
</html>
