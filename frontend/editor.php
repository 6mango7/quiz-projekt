<?php
    $title = 'nowy quiz';
    $page = 'editor.php';
    include 'includes/header.php';
?>
        <section>
            <p id="breadcrumbs"><a href="index.php">start</a> / nowy quiz</p>
            <form class="card" id="editor">
                <h1 id="heading">nowy quiz</h1>
                <label>
                    tytuł
                    <input class="field" type="text" id="title" maxlength="100" placeholder="np. najlepsza pizza">
                </label>
                <label>
                    opis
                    <textarea class="field" id="description" maxlength="1000" placeholder="o co chodzi w tym quizie? (nieobowiązkowe)"></textarea>
                </label>
                <label>
                    kategoria
                    <select class="field" id="category">
                        <option value="0">- wybierz kategorię -</option>
                    </select>
                </label>
                <div id="options">
                    <h3>opcje <span class="badge" id="options-info"></span></h3>
                    <ol id="option-list"></ol>
                    <div id="add-option">
                        <input class="field" type="text" id="new-option" maxlength="60" placeholder="nazwa nowej opcji, np. margherita">
                        <button class="button" type="button" onclick="addOption()">+ dodaj</button>
                    </div>
                    <p class="muted">Co najmniej 4 opcje, najwyżej 64. Wpisz nazwę opcji i kliknij "+ dodaj".</p>
                </div>
                <div id="errors"></div>
                <div id="editor-buttons">
                    <button class="button yellow" type="button" id="save" onclick="saveQuiz()">opublikuj</button>
                    <a id="cancel" href="index.php">anuluj</a>
                </div>
                <!-- widoczne tylko przy edycji quizu -->
                <div id="delete-zone">
                    <p class="muted">Usunięcie quizu kasuje też jego ranking, oceny i komentarze. Tego nie da się cofnąć.</p>
                    <button class="button red" type="button" onclick="deleteQuiz()">usuń quiz</button>
                </div>
            </form>
        </section>
        <!-- okno z emoji, pokazuje je JavaScript -->
        <section class="card" id="emoji-window">
            <div id="emoji-top">
                <h2>wybierz emoji</h2>
                <button class="button" type="button" onclick="closeEmoji()">zamknij</button>
            </div>
            <div id="emoji-list">
                <p class="loading">ładuję...</p>
            </div>
        </section>
<?php include 'includes/footer.php'; ?>
    <script src="js/editor.js"></script>
</body>
</html>
