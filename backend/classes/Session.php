<?php
//obsluga sesji - kto jest zalogowany

class Session
{
    //start sesji, wywolywane raz w init.php
    public static function start(): void
    {
        session_name('quizownia');
        session_set_cookie_params([
            'httponly' => true,  //js na stronie nie ma dostepu do ciasteczka
            'samesite' => 'Lax', //ciasteczko nie leci z obcych stron (CSRF)
        ]);
        session_start();
    }

    //zapisuje w sesji id zalogowanego uzytkownika
    public static function login(int $userId): void
    {
        session_regenerate_id(true); //nowy identyfikator sesji po zalogowaniu
        $_SESSION['user_id'] = $userId;
    }

    //czysci sesje
    public static function logout(): void
    {
        $_SESSION = [];
        session_destroy();
    }

    //id zalogowanego albo null
    public static function userId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    //konczy endpoint bledem 401 jesli nikt nie jest zalogowany
    public static function requireLogin(): int
    {
        $userId = self::userId();

        if ($userId === null) {
            jsonError('Musisz się zalogować', 401);
        }

        return $userId;
    }
}