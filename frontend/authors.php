<?php
    $title = 'o autorach';
    $page = 'authors.php';
    include 'includes/header.php';
?>
        <section class="card" id="about">
            <span class="sticker color-7">o nas</span>
            <h1>Kto stoi za quizownią?</h1>
            <p>
                Quizownia to projekt zespołowy: strona z quizami w formie turnieju „to czy to?”.
                Każdy może zagrać, założyć konto, stworzyć własny quiz i ocenić quizy innych.
            </p>
        </section>
        <section>
            <h2>autorzy</h2>
            <ul id="authors">
                <li class="card author">
                    <span class="avatar color-1">I</span>
                    <h3>Szymon Maniak</h3>
                    <span class="sticker color-1">frontend</span>
                    <p>Wygląd strony, HTML, CSS i JavaScript: plansza, gra, edytor quizów, motyw jasny i ciemny.</p>
                </li>
                <li class="card author">
                    <span class="avatar color-2">I</span>
                    <h3>Adam Strużyk</h3>
                    <span class="sticker color-2">backend</span>
                    <p>API w PHP: logowanie, zapisywanie quizów, wyniki turniejów, oceny i komentarze.</p>
                </li>
                <li class="card author">
                    <span class="avatar color-4">I</span>
                    <h3>Ivan Prokopenko</h3>
                    <span class="sticker color-4">baza danych</span>
                    <p>Projekt bazy MySQL, tabele, relacje i przykładowe quizy na start.</p>
                </li>
            </ul>
        </section>
        <section>
            <h2>z czego zbudowana</h2>
            <ul id="chips">
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>PHP</li>
                <li>MySQL</li>
                <li>Docker</li>
            </ul>
        </section>
<?php include 'includes/footer.php'; ?>
</body>
</html>
