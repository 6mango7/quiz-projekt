<?php
    $title = 'profil';
    $page = 'profile.php';
    include 'includes/header.php';
?>
        <section class="card" id="profile-head">
            <span class="avatar color-1" id="avatar">?</span>
            <div>
                <h1 id="profile-login">ładuję profil...</h1>
                <p class="muted" id="member-since"></p>
                <p id="profile-description"></p>
            </div>
            <!-- widoczne tylko na własnym profilu, pokazuje je JavaScript -->
            <a class="button" id="settings-link" href="settings.php">ustawienia konta</a>
        </section>
        <div id="stats">
            <div class="stat">
                <span class="stat-label">quizy</span>
                <span class="stat-value" id="quiz-count">-</span>
            </div>
            <div class="stat">
                <span class="stat-label">gier w te quizy</span>
                <span class="stat-value" id="play-count">-</span>
            </div>
            <div class="stat">
                <span class="stat-label">średnia ocen</span>
                <span class="stat-value" id="average">-</span>
            </div>
            <div class="stat">
                <span class="stat-label">wystawione oceny</span>
                <span class="stat-value" id="ratings-given">-</span>
            </div>
        </div>
        <section>
            <div class="section-top">
                <h2>quizy</h2>
                <!-- widoczne tylko na własnym profilu, pokazuje je JavaScript -->
                <a class="button yellow" id="new-quiz" href="editor.php">+ nowy quiz</a>
            </div>
            <!-- karty quizów wstawia JavaScript -->
            <ul class="quiz-list" id="profile-quizzes">
                <li class="loading">ładuję quizy...</li>
            </ul>
        </section>
        <section>
            <h2>ostatnie oceny</h2>
            <!-- oceny wstawia JavaScript -->
            <ul id="last-ratings">
                <li class="loading">ładuję oceny...</li>
            </ul>
        </section>
<?php include 'includes/footer.php'; ?>
    <!-- najpierw wygląd, potem komunikacja z bazą -->
    <script src="js/profile.js"></script>
    <script src="js/profile-api.js"></script>
</body>
</html>
