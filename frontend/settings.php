<?php
    $title = 'ustawienia';
    $page = 'settings.php';
    include 'includes/header.php';
?>
        <div id="settings">
            <p id="breadcrumbs"><a href="profile.php">mój profil</a> / ustawienia</p>
            <section class="card">
                <h2 class="card-header color-1">motyw</h2>
                <div class="account-form">
                    <p class="muted">Kolory całej strony. Wybór zapamiętuje ta przeglądarka.</p>
                    <div id="theme-choice">
                        <button class="button" type="button" onclick="setTheme('light')">☀ jasny</button>
                        <button class="button" type="button" onclick="setTheme('dark')">☾ ciemny</button>
                    </div>
                </div>
            </section>
            <section class="card">
                <h2 class="card-header color-2">profil</h2>
                <form class="account-form" id="profile-form">
                    <p class="muted">E-mail widzisz tylko Ty. Opis pokazuje się na Twoim profilu.</p>
                    <label>
                        e-mail
                        <input class="field" type="email" id="settings-email" maxlength="100">
                    </label>
                    <label>
                        kilka słów o sobie
                        <textarea class="field" id="settings-description" maxlength="200"></textarea>
                    </label>
                    <div id="profile-errors"></div>
                    <div>
                        <button class="button yellow" type="button" onclick="saveProfile()">zapisz</button>
                    </div>
                </form>
            </section>
            <section class="card">
                <h2 class="card-header color-4">hasło</h2>
                <form class="account-form" id="password-form">
                    <p class="muted">Nowe hasło musi mieć co najmniej 8 znaków.</p>
                    <label>
                        obecne hasło
                        <input class="field" type="password" id="current-password">
                    </label>
                    <label>
                        nowe hasło
                        <input class="field" type="password" id="new-password">
                    </label>
                    <label>
                        powtórz nowe hasło
                        <input class="field" type="password" id="repeat-password">
                    </label>
                    <div id="password-errors"></div>
                    <div>
                        <button class="button yellow" type="button" onclick="changePassword()">zmień hasło</button>
                    </div>
                </form>
            </section>
            <section class="card">
                <h2 class="card-header color-3">usuń konto</h2>
                <form class="account-form" id="delete-form">
                    <p class="muted">Razem z kontem znikną wszystkie Twoje quizy, ich rankingi i Twoje oceny. Tego nie da się cofnąć.</p>
                    <label>
                        hasło, żeby potwierdzić
                        <input class="field" type="password" id="delete-password">
                    </label>
                    <div id="delete-errors"></div>
                    <div>
                        <button class="button red" type="button" onclick="deleteAccount()">usuń konto na zawsze</button>
                    </div>
                </form>
            </section>
        </div>
<?php include 'includes/footer.php'; ?>
    <!-- najpierw wygląd, potem komunikacja z bazą -->
    <script src="js/settings.js"></script>
    <script src="js/settings-api.js"></script>
</body>
</html>
