<?php
    $title = 'kontakt';
    $page = 'contact.php';
    include 'includes/header.php';
?>
        <div id="contact-columns">
            <section class="card">
                <h1 class="card-header color-5">napisz do nas</h1>
                <form id="contact">
                    <p>Błąd na stronie, pomysł albo quiz, który nie powinien tu wisieć? Napisz - odpowiemy na podany e-mail.</p>
                    <label>
                        imię
                        <input class="field" type="text" id="name" maxlength="50">
                    </label>
                    <label>
                        e-mail
                        <input class="field" type="email" id="email" maxlength="100">
                    </label>
                    <label>
                        temat
                        <select class="field" id="topic">
                            <option value="">- wybierz -</option>
                            <option>pytanie</option>
                            <option>błąd na stronie</option>
                            <option>zgłoszenie quizu</option>
                            <option>inne</option>
                        </select>
                    </label>
                    <label>
                        wiadomość
                        <textarea class="field" id="message" maxlength="3000"></textarea>
                    </label>
                    <div id="errors"></div>
                    <div>
                        <button class="button yellow" type="button" onclick="sendMessage()">wyślij</button>
                    </div>
                </form>
            </section>
            <aside class="card" id="contact-info">
                <h2>gdzie nas szukać</h2>
                <ul>
                    <li><span class="info-label">e-mail</span> kontakt@quizownia.pl</li>
                    <li><span class="info-label">odpowiadamy</span> zwykle w ciągu 2 dni</li>
                    <li><span class="info-label">zgłoszenia quizów</span> sprawdzamy w pierwszej kolejności</li>
                </ul>
                <p class="muted">Chcesz wiedzieć, kto zrobił tę stronę? Zajrzyj do zakładki <a href="authors.php">o autorach</a>.</p>
            </aside>
        </div>
<?php include 'includes/footer.php'; ?>
    <script src="js/contact.js"></script>
</body>
</html>
