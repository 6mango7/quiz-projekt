<?php
    $title = 'start';
    $page = 'index.php';
    include 'includes/header.php';
?>
        <section class="card" id="hero">
            <div id="hero-text">
                <b class="sticker">to czy to?</b>
                <h1>Wybieraj, aż zostanie jeden.</h1>
                <p>
                    Każdy quiz to turniej: pokazujemy dwie opcje, Ty wybierasz lepszą.
                    Zwycięzcy grają dalej, aż do finału. Zagraj w quizy innych albo stwórz własny.
                </p>
                <a class="button yellow" href="quizzes.php">graj</a>
                <a class="button" href="editor.php">stwórz quiz</a>
            </div>
            <div id="hero-board">
                <!-- losowa para: lewa z pierwszych trzech, prawa z ostatnich trzech -->
                <?php
                    $codes = ['1f355', '1f363', '1f354', '1f32e', '1f369', '1f366'];
                    $names = ['pizza', 'sushi', 'burger', 'taco', 'pączek', 'lody'];
                    $left = rand(0, 2);
                    $right = rand(3, 5);

                    $text = "";
                    $text .= "<div class='hero-tile'><img src='img/emoji/$codes[$left].svg' alt='$names[$left]'></div>";
                    $text .= "<b id='or-sign'>czy?</b>";
                    $text .= "<div class='hero-tile yellow'><img src='img/emoji/$codes[$right].svg' alt='$names[$right]'></div>";
                    echo $text;
                ?>
            </div>
        </section>
        <section>
            <div class="section-top">
                <h2>popularne</h2>
                <b class="badge">najwięcej gier</b>
                <a class="button" href="quizzes.php?sort=popular">wszystkie</a>
            </div>
            <ul class="quiz-list">
                <li class="empty">Tu pojawią się najpopularniejsze quizy.</li>
            </ul>
        </section>
        <section>
            <div class="section-top">
                <h2>nowe</h2>
                <b class="badge">ostatnio dodane</b>
                <a class="button" href="quizzes.php?sort=new">wszystkie</a>
            </div>
            <ul class="quiz-list">
                <li class="empty">Tu pojawią się najnowsze quizy.</li>
            </ul>
        </section>
<?php include 'includes/footer.php'; ?>
</body>
</html>
