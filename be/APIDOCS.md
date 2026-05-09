# Event Booking Platform Backend API Docs

## Overview

- Base URL: /api/v1
- Content type: application/json for most endpoints
- Auth header format: Authorization: Bearer <JWT_TOKEN>
- Most failure cases currently return HTTP 200 with success: false

## Response Patterns

There is no single strict response contract yet, but most routes use:

```json
{
  "success": true,
  "data": {},
  "message": "..."
}
```

Known variations:

- GET / returns plain text Pong!
- POST /auth/login returns token (not data)
- GET /auth/me returns user (not data)

## Auth and Role Rules

- authMiddleware: requires a valid JWT
- adminMiddleware: requires valid JWT and user role ORGANIZER
- JWT payload currently includes user id as:

```json
{ "id": 1 }
```

---

## Health

### GET /

Ping endpoint mounted at /api/v1/.

Current implementation side effect: creates a user record each time it is called.

#### Request

```bash
curl -X GET http://localhost:3000/api/v1/
```

#### Response

```text
Pong!
```

---

## Auth

### POST /auth/signup

# Event Booking Platform Backend API Docs

The backend API docs have been split by route group.

- [Health](./docs/health.md)
- [Auth](./docs/auth.md)
- [Events](./docs/events.md)
- [Orders](./docs/orders.md)
- [Tickets](./docs/tickets.md)
- [Host](./docs/host.md)

See [./docs/index.md](./docs/index.md) for the docs folder index.
