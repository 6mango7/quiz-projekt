<?php include 'includes/header.php'; ?>

    <section class="card hero appear">
        <div class="hero-text">
            <span class="sticker">to czy to?</span>
            <h1>Wybieraj, aż zostanie jeden.</h1>
            <p>
                Każdy quiz to turniej: pokazujemy dwie opcje, Ty wybierasz lepszą.
                Zwycięzcy grają dalej, aż do finału. Zagraj w quizy innych albo stwórz własny.
            </p>
            <div class="buttons">
                <a class="button primary large" href="quizzes.php">graj</a>
                <a class="button large" href="editor.php">stwórz quiz</a>
            </div>
        </div>

        <div class="hero-board">
            <?php
                $emojis = [
                    '1f355' => 'pizza',
                    '1f363' => 'sushi',
                    '1f354' => 'burger',
                    '1f32e' => 'taco',
                    '1f369' => 'pączek',
                    '1f366' => 'lody'
                ];
                $pair = array_rand($emojis, 2);
                shuffle($pair);

                $left = $pair[0];
                $right = $pair[1];
                $leftName = $emojis[$left];
                $rightName = $emojis[$right];

                $text = "";
                $text .= "<span class='hero-tile left'><img src='img/emoji/$left.svg' alt='$leftName'></span>";
                $text .= "<span class='or-sign'>czy?</span>";
                $text .= "<span class='hero-tile right'><img src='img/emoji/$right.svg' alt='$rightName'></span>";
                echo $text;
            ?>
        </div>
    </section>

    <section class="section appear delay-1">
        <div class="section-header">
            <h2 class="section-title">popularne</h2>
            <span class="badge">najwięcej gier</span>
            <a class="button small more" href="quizzes.php?sort=popular">wszystkie</a>
        </div>
        <ul class="quiz-grid">
            <li class="empty">Tu pojawią się najpopularniejsze quizy.</li>
        </ul>
    </section>

    <section class="section appear delay-2">
        <div class="section-header">
            <h2 class="section-title">nowe</h2>
            <span class="badge">ostatnio dodane</span>
            <a class="button small more" href="quizzes.php?sort=new">wszystkie</a>
        </div>
        <ul class="quiz-grid">
            <li class="empty">Tu pojawią się najnowsze quizy.</li>
        </ul>
    </section>

<?php include 'includes/footer.php'; ?>
</body>
</html>
