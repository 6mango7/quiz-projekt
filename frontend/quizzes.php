<?php $title = 'quizy'; include 'includes/header.php'; ?>

    <section class="section appear">
        <div class="section-header">
            <h1 class="section-title">wszystkie quizy</h1>
            <span class="badge" id="counter"></span>
        </div>

        <form class="filters" method="get" action="quizzes.php">
            <input class="field" type="search" name="search" id="search" placeholder="szukaj quizu…">

            <select class="field" name="category" id="category" onchange="this.form.submit()">
                <option value="0">wszystkie kategorie</option>
            </select>

            <select class="field" name="sort" id="sort" onchange="this.form.submit()">
                <option value="popular">najpopularniejsze</option>
                <option value="new">najnowsze</option>
                <option value="best">najlepiej oceniane</option>
            </select>

            <button class="button primary" type="submit">szukaj</button>
        </form>

        <ul class="quiz-grid" id="quiz-list">
            <li class="loading">ładuję quizy</li>
        </ul>

        <p class="empty" id="empty" hidden>
            Nic nie znaleziono. Spróbuj innego słowa albo <a href="editor.php">stwórz własny quiz</a>.
        </p>

        <div class="load-more">
            <button class="button" type="button" id="load-more-button" onclick="loadQuizzes()" hidden>pokaż więcej</button>
        </div>
    </section>

<?php include 'includes/footer.php'; ?>
<script src="js/quizzes.js"></script>
</body>
</html>
