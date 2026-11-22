<?php
//funkcje pomocnicze uzywane w kazdym endpoincie

//wysyla dane jako json i konczy skrypt
function jsonResponse(mixed $data, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE); //bez tego polskie znaki leca jako \u0105
    exit;
}


//wysyla jeden blad - zawsze jako lista {"errors": ["..."]}
function jsonError(string $message, int $status = 400): never
{
    jsonErrors([$message], $status);
}
//wysyla kilka bledow naraz np. z walidacji formularza
function jsonErrors(array $errors, int $status = 422): never
{
    jsonResponse(['errors' => $errors], $status);
}


//endpoint dziala tylko dla podanej metody (GET/POST)
function requireMethod(string $method): void
{
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        jsonError('Niedozwolona metoda', 405);
    }
}

//dane wyslane z frontu - json albo formularz (FormData)
function getRequestData(): array
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

    if (str_contains($contentType, 'application/json')) {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);

        //pusty albo zepsuty json
        if (!is_array($data)) {
            return [];
        }

        return $data;
    }

    //formularz - php sam wrzuca dane do $_POST
    return $_POST;
}