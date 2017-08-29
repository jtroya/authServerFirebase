### Descripción
Simple API para autenticación de usuarios usando Firebase
- `email`
- `password`

### Endpoints
- **POST** - `/signup` para registrar un nuevo usuario
  - payload: email (string), password (string).
  - respuesta: token.
- **POST** - `/signin` para autenticar usuarios existentes
  - payload: email (string), password (string).
