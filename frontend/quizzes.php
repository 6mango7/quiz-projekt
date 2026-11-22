<?php
    $title = 'quizy';
    $page = 'quizzes.php';
    include 'includes/header.php';
?>
        <section>
            <div class="section-top">
                <h1>wszystkie quizy</h1>
                <span class="badge" id="counter"></span>
            </div>
            <form class="quiz-filters" id="filters" method="get" action="quizzes.php">
                <label class="quiz-filters__search">
                    szukaj quizu
                    <input class="field" type="text" name="search" id="search">
                </label>
                <label>
                    kategoria
                    <select class="field" name="category" id="category">
                        <option value="0">wszystkie kategorie</option>
                    </select>
                </label>
                <label>
                    sortowanie
                    <select class="field" name="sort" id="sort">
                        <option value="popular">najpopularniejsze</option>
                        <option value="new">najnowsze</option>
                        <option value="best">najlepiej oceniane</option>
                    </select>
                </label>
                <button class="button yellow" type="submit">szukaj</button>
            </form>
            <!-- karty quizów wstawia JavaScript -->
            <ul class="quiz-list" id="quiz-list">
                <li class="loading">ładuję quizy...</li>
            </ul>
            <p class="empty" id="empty">
                Nic nie znaleziono. Spróbuj innego słowa albo <a href="editor.php">stwórz własny quiz</a>.
            </p>
            <div id="load-more">
                <button class="button" type="button" onclick="loadQuizzes()">pokaż więcej</button>
            </div>
        </section>
<?php include 'includes/footer.php'; ?>
    <!-- najpierw wygląd, potem komunikacja z bazą -->
    <script src="js/quizzes.js"></script>
    <script src="js/quizzes-api.js"></script>
</body>
</html>
