<?php
    $title = 'konto';
    $page = 'login.php';
    include 'includes/header.php';
?>
        <!-- widoczne tylko dla zalogowanego, pokazuje je JavaScript -->
        <section class="card" id="logged-in">
            <span class="sticker color-4">już grasz</span>
            <p>Zalogowano jako <span id="my-login"></span>.</p>
            <div>
                <a class="button yellow" href="profile.php">mój profil</a>
                <a class="button" href="quizzes.php">quizy</a>
            </div>
        </section>
        <div id="forms">
            <section class="card">
                <h1 class="card-header color-1">zaloguj się</h1>
                <form class="account-form" id="login-form">
                    <label>
                        login albo e-mail
                        <input class="field" type="text" id="login" maxlength="100">
                    </label>
                    <label>
                        hasło
                        <input class="field" type="password" id="password">
                    </label>
                    <div id="login-errors"></div>
                    <div>
                        <button class="button yellow" type="button" onclick="login()">zaloguj</button>
                    </div>
                    <p class="muted">Konto testowe: <span class="bold">demo</span> / <span class="bold">demo1234</span></p>
                </form>
            </section>
            <section class="card">
                <h2 class="card-header color-2">nowe konto</h2>
                <form class="account-form" id="register-form">
                    <label>
                        login
                        <input class="field" type="text" id="new-login" maxlength="30">
                    </label>
                    <label>
                        e-mail
                        <input class="field" type="email" id="new-email" maxlength="100">
                    </label>
                    <label>
                        hasło (co najmniej 8 znaków)
                        <input class="field" type="password" id="new-password">
                    </label>
                    <label>
                        powtórz hasło
                        <input class="field" type="password" id="repeat-password">
                    </label>
                    <div id="register-errors"></div>
                    <div>
                        <button class="button blue" type="button" onclick="register()">załóż konto</button>
                    </div>
                </form>
            </section>
        </div>
<?php include 'includes/footer.php'; ?>
    <script src="js/login.js"></script>
</body>
</html>
