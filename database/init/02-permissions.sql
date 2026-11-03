-- Polityki RLS nie dają same z siebie dostępu, trzeba jeszcze nadać uprawnienia
GRANT USAGE ON SCHEMA public TO fastapi_backend;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO fastapi_backend;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO fastapi_backend;