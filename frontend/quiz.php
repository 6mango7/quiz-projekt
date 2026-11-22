<?php
    $title = 'quiz';
    $page = 'quiz.php';
    include 'includes/header.php';
?>
        <section>
            <p id="breadcrumbs"><a href="quizzes.php">quizy</a> / <a href="quizzes.php" id="category-link">...</a></p>
            <div id="quiz-columns">
                <div class="card" id="quiz-board">
                    <span class="sticker" id="quiz-category">quiz</span>
                    <h1 id="quiz-title">ładuję quiz...</h1>
                    <p id="quiz-description"></p>
                    <p class="muted" id="quiz-author"></p>
                    <!-- wybór rozmiaru turnieju, pokazuje go JavaScript -->
                    <form id="play-panel" action="play.php" method="get">
                        <input type="hidden" name="id" id="quiz-id">
                        <span class="bold">ile opcji w turnieju?</span>
                        <!-- przyciski z liczbą opcji wstawia JavaScript -->
                        <div id="sizes"></div>
                        <button class="button yellow" type="submit">graj!</button>
                    </form>
                    <p class="empty" id="too-few">Ten quiz ma za mało opcji, żeby zagrać - potrzeba co najmniej 4.</p>
                </div>
                <aside class="card" id="quiz-stats">
                    <h2>w liczbach</h2>
                    <div id="stats">
                        <div class="stat">
                            <span class="stat-label">gier</span>
                            <span class="stat-value" id="play-count">-</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">opcji</span>
                            <span class="stat-value" id="option-count">-</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">ocena</span>
                            <span class="stat-value" id="average">-</span>
                        </div>
                    </div>
                    <p class="muted" id="quiz-champion"></p>
                </aside>
            </div>
        </section>
        <section class="card" id="ranking-card">
            <div class="section-top">
                <h2>ranking</h2>
                <span class="muted">kto najczęściej wygrywa cały turniej</span>
            </div>
            <table id="ranking">
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>opcja</th>
                        <th class="win-rate">wygrane pojedynki</th>
                        <th>turnieje</th>
                    </tr>
                </thead>
                <!-- wiersze rankingu wstawia JavaScript -->
                <tbody id="ranking-rows"></tbody>
            </table>
            <div id="full-ranking-box">
                <button class="button" type="button" id="full-ranking" onclick="drawRanking(true)">pokaż wszystkie</button>
            </div>
        </section>
        <section class="card" id="ratings">
            <h2>oceny i komentarze</h2>
            <div id="ratings-columns">
                <div>
                    <p id="average-box"><span id="big-average">-</span> / 5</p>
                    <p class="muted" id="rating-count"></p>
                    <!-- paski z liczbą ocen 5, 4, 3, 2, 1 wstawia JavaScript -->
                    <ul id="distribution"></ul>
                </div>
                <div>
                    <!-- napis dla autora quizu albo niezalogowanego, pokazuje go JavaScript -->
                    <p id="rating-info"></p>
                    <!-- formularz oceny, widoczny tylko dla zalogowanego, pokazuje go JavaScript -->
                    <form id="rating-form">
                        <span class="bold">twoja ocena</span>
                        <div id="stars">
                            <label><input type="radio" name="rating" value="1"> 1 ★</label>
                            <label><input type="radio" name="rating" value="2"> 2 ★</label>
                            <label><input type="radio" name="rating" value="3"> 3 ★</label>
                            <label><input type="radio" name="rating" value="4"> 4 ★</label>
                            <label><input type="radio" name="rating" value="5"> 5 ★</label>
                        </div>
                        <textarea class="field" id="rating-comment" maxlength="1000" placeholder="napisz, co myślisz o tym quizie (nieobowiązkowe)"></textarea>
                        <div id="rating-errors"></div>
                        <div>
                            <button class="button yellow" type="button" id="send-rating" onclick="sendRating()">dodaj ocenę</button>
                            <button class="button" type="button" id="delete-rating" onclick="deleteRating()">usuń ocenę</button>
                        </div>
                    </form>
                    <!-- komentarze wstawia JavaScript -->
                    <ul id="comments">
                        <li class="loading">ładuję oceny...</li>
                    </ul>
                </div>
            </div>
        </section>
<?php include 'includes/footer.php'; ?>
    <!-- najpierw wygląd, potem komunikacja z bazą -->
    <script src="js/quiz.js"></script>
    <script src="js/quiz-api.js"></script>
</body>
</html>
