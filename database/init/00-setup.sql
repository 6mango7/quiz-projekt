-- Dump sam tworzy schemat public, więc usuwamy pusty domyślny
DROP SCHEMA public;

-- Rola dla backendu (FastAPI), której używają polityki w dumpie
CREATE ROLE fastapi_backend LOGIN PASSWORD 'backend_dev';