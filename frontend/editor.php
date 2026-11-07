<?php $title = 'nowy quiz'; include 'includes/header.php'; ?>

    <p class="breadcrumbs appear" id="breadcrumbs"><a href="index.php">start</a> / nowy quiz</p>

    <form class="card editor appear delay-1" id="editor" onsubmit="saveQuiz(event)">
        <h1 class="section-title" id="heading">nowy quiz</h1>

        <label class="form">
            <span class="field-label">tytuł</span>
            <input class="field title-field" name="title" maxlength="100" placeholder="np. najlepsza pizza" autocomplete="off">
        </label>

        <label class="form">
            <span class="field-label">opis</span>
            <textarea class="field" name="description" maxlength="1000" placeholder="o co chodzi w tym quizie? (nieobowiązkowe)"></textarea>
        </label>

        <label class="form">
            <span class="field-label">kategoria</span>
            <select class="field" name="category" id="category">
                <option value="0">– wybierz kategorię –</option>
            </select>
        </label>

        <div class="form">
            <div class="section-header">
                <span class="field-label">opcje</span>
                <span class="badge" id="options-info"></span>
            </div>
            <ol class="option-list" id="option-list"></ol>
            <div class="add-option">
                <input class="field" id="new-option" maxlength="60" placeholder="nazwa nowej opcji, np. margherita" autocomplete="off" onkeydown="newOptionKey(event)">
                <button class="button" type="button" onclick="addOption()">+ dodaj</button>
            </div>
            <small class="muted">Co najmniej 4 opcje, najwyżej 64. Enter w polu też dodaje opcję.</small>
        </div>

        <div class="errors" id="errors" hidden></div>

        <div class="buttons">
            <button class="button primary large" type="submit" id="save">opublikuj</button>
            <a class="button plain" href="index.php" id="cancel">anuluj</a>
        </div>

        <div class="danger-zone" id="delete-zone" hidden>
            <p class="muted">Usunięcie quizu kasuje też jego ranking, oceny i komentarze. Tego nie da się cofnąć.</p>
            <button class="button danger small" type="button" onclick="deleteQuiz()">usuń quiz</button>
        </div>
    </form>

    <dialog class="modal" id="emoji-modal">
        <div class="modal-top">
            <h2 class="section-title">wybierz emoji</h2>
            <button class="button small" type="button" onclick="closeEmojiModal()">zamknij</button>
        </div>
        <div class="emoji-grid" id="emoji-grid"><p class="loading">ładuję</p></div>
    </dialog>

<?php include 'includes/footer.php'; ?>
<script src="js/editor.js"></script>
</body>
</html>
