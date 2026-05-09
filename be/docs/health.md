# Health API Docs

## Overview

- Base URL: /api/v1
- Content type: application/json for most endpoints
- Most failure cases currently return HTTP 200 with success: false

## Response Pattern

```json
{
  "success": true,
  "data": {},
  "message": "..."
}
```

## Health

### GET /

Ping endpoint mounted at /api/v1/.

Current implementation side effect: it creates a user record each time it is called.

#### Request

```bash
curl -X GET http://localhost:3000/api/v1/
```

#### Response

```text
Pong!
```

## Caveat

- GET /api/v1/ has side effects and should not be treated as a pure health check.
