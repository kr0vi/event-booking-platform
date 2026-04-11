# Event Booking Platform Backend API Docs

## Overview

- Base URL: `/api/v1`
- Content type: `application/json` for most endpoints
- Auth header format: `Authorization: Bearer <JWT_TOKEN>`
- Most error cases currently still return HTTP `200` with `success: false`

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

- `GET /` returns plain text `Pong!`
- `POST /auth/login` returns `token` (not `data`)
- `GET /auth/me` returns `user` (not `data`)
- `POST /events` returns `sucess` (typo) instead of `success`

## Auth and Role Rules

- `authMiddleware`: requires a valid JWT
- `adminMiddleware`: requires valid JWT and user role `ORGANIZER`
- JWT payload currently includes user id as:

```json
{ "id": 1 }
```

---

## Health

### GET `/`

Ping endpoint mounted at `/api/v1/`.

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

### POST `/auth/signup`

Creates a user.

Current implementation details:

- Validation via Zod schema:
  - `name`: string, min 2
  - `email`: valid email
  - `password`: string, min 6
- New users are currently created with role `ORGANIZER`

#### Request Body

```json
{
  "name": "John Organizer",
  "email": "john@example.com",
  "password": "strongpassword123"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John Organizer",
    "email": "john@example.com",
    "passwordHash": "$2b$10$...",
    "role": "ORGANIZER",
    "createdAt": "2026-03-29T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z"
  }
}
```

#### Common Failure Responses

```json
{
  "success": false,
  "data": null,
  "message": "Invalid input"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "User already exists"
}
```

### POST `/auth/login`

Authenticates user and returns JWT.

Validation:

- `email`: valid email
- `password`: string, min 6

#### Request Body

```json
{
  "email": "john@example.com",
  "password": "strongpassword123"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

#### Common Failure Responses

```json
{
  "success": false,
  "data": null,
  "message": "Invalid input"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "User does not exist"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "Invalid password"
}
```

### GET `/auth/me`

Returns current authenticated user.

Auth required: Bearer token

#### Request

```bash
curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Success Response

```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Organizer"
  },
  "message": "User fetched successfully"
}
```

#### Failure Response

```json
{
  "success": false,
  "data": null,
  "message": "Unauthorized"
}
```

---

## Events

### GET `/events`

Returns all events.

#### Request

```bash
curl -X GET http://localhost:3000/api/v1/events
```

#### Success Response

```json
{
  "success": true,
  "data": [
    {
      "id": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
      "title": "Tech Summit 2026",
      "description": "Annual conference",
      "location": "Mumbai",
      "date": "2026-05-10",
      "time": "09:00",
      "posterImage": "https://example.com/poster.jpg",
      "galleryImages": ["https://example.com/1.jpg"],
      "highlights": [{ "title": "Networking", "description": "Meet founders" }],
      "thingsToKnow": ["Bring ID"],
      "totalTickets": 500,
      "ticketsSold": 120,
      "price": 2000,
      "status": "OPEN",
      "organizerId": 1,
      "createdAt": "2026-03-29T10:30:00.000Z",
      "updatedAt": "2026-03-29T10:30:00.000Z"
    }
  ],
  "message": "All events fetched successfully"
}
```

#### Empty Response

```json
{
  "success": false,
  "data": [],
  "message": "No events found"
}
```

### GET `/events/:id`

Returns one event by id.

#### Path Params

- `id` (string, required)

#### Request

```bash
curl -X GET http://localhost:3000/api/v1/events/5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb
```

#### Success Response

```json
{
  "success": true,
  "data": {
    "id": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
    "title": "Tech Summit 2026"
  },
  "message": "Event fetched successfully"
}
```

#### Failure Responses

```json
{
  "success": false,
  "data": null,
  "message": "Event ID is required"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "Event not found"
}
```

### POST `/events`

Creates an event.

Auth required: Bearer token + organizer role (`ORGANIZER`)

#### Request Body

Validation comes from `createEventSchema`:

- `title`: string, min 1, max 100
- `description`: string, min 10, max 200
- `location`: string, min 1, max 100
- `eventDate`: string, format `YYYY-MM-DD`
- `eventTime`: string
- `posterImage`: valid URL string
- `galleryImages`: array of valid URL strings (optional, defaults to `[]`)
- `highlights`: required array of objects:
  - `title`: string, max 100
  - `description`: string, max 200
- `thingsToKnow`: array of strings max 100 each (optional, defaults to `[]`)
- `price`: number, min 0
- `totalTickets`: number, min 0

#### Request Example

```json
{
  "title": "Tech Summit 2026",
  "description": "A long enough event description",
  "location": "Mumbai",
  "eventDate": "2026-05-10",
  "eventTime": "09:00",
  "posterImage": "https://example.com/poster.jpg",
  "galleryImages": ["https://example.com/1.jpg"],
  "highlights": [{ "title": "Networking", "description": "Meet founders" }],
  "thingsToKnow": ["Bring ID"],
  "price": 2000,
  "totalTickets": 500
}
```

#### Success Response

```json
{
  "sucess": true,
  "message": "Event created successfully"
}
```

#### Failure Responses

```json
{
  "success": false,
  "data": null,
  "message": "Unauthorized"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "Invalid event data"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "Failed to create event"
}
```

---

## Orders

### POST `/orders`

Creates an order and immediately generates one ticket record.

Auth required: Bearer token

#### Request Body

```json
{
  "eventId": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
  "quantity": 2
}
```

#### Success Response

```json
{
  "success": true,
  "data": {
    "order": {
      "id": "b8f26f89-d7e0-4fb2-a845-2a8947b61039",
      "userId": 1,
      "eventId": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
      "quantity": 2,
      "totalAmount": 4000,
      "paymentStatus": "COMPLETED",
      "createdAt": "2026-03-29T11:10:00.000Z",
      "updatedAt": "2026-03-29T11:10:00.000Z"
    },
    "ticket": {
      "id": "fd3efecb-83cf-4f54-b599-53d578203dae",
      "orderId": "b8f26f89-d7e0-4fb2-a845-2a8947b61039",
      "eventId": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
      "userId": 1,
      "qrToken": "<JWT_QR_TOKEN>",
      "qrImage": "data:image/png;base64,iVBORw0KGgo...",
      "status": "VALID",
      "usedAt": null
    }
  },
  "message": "Order and ticket created successfully"
}
```

#### Failure Responses

```json
{
  "success": false,
  "data": null,
  "message": "Unauthorized"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "Event ID and quantity are required"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "Event not found"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "Not enough tickets available"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "Failed to generate ticket"
}
```

---

## Tickets

### POST `/tickets/validate?code=<QR_TOKEN>`

Validates ticket and marks it as used.

Auth required: Bearer token + organizer role (`ORGANIZER`)

#### Query Params

- `code` (string, required): QR token

#### Request

```bash
curl -X POST "http://localhost:3000/api/v1/tickets/validate?code=<QR_TOKEN>" \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Success Response

```json
{
  "success": true,
  "data": {
    "eventName": "Tech Summit 2026",
    "quantity": 2,
    "user": "John Organizer"
  },
  "message": "Ticket validated successfully"
}
```

#### Failure Responses

```json
{
  "success": false,
  "data": null,
  "message": "Unauthorized"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "QR token is required"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "Ticket not found"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "Ticket is not valid"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "Invalid QR token"
}
```

### GET `/tickets`

Returns all tickets for current authenticated user.

Auth required: Bearer token

#### Request

```bash
curl -X GET http://localhost:3000/api/v1/tickets \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Success Response

```json
{
  "success": true,
  "data": [
    {
      "id": "fd3efecb-83cf-4f54-b599-53d578203dae",
      "orderId": "b8f26f89-d7e0-4fb2-a845-2a8947b61039",
      "eventId": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
      "userId": 1,
      "qrToken": "<JWT_QR_TOKEN>",
      "qrImage": "data:image/png;base64,iVBORw0KGgo...",
      "status": "VALID",
      "usedAt": null
    }
  ],
  "message": "Tickets retrieved successfully"
}
```

#### Failure Response

```json
{
  "success": false,
  "data": null,
  "message": "Unauthorized"
}
```

### GET `/tickets/:id`

Returns one ticket by id for current authenticated user.

Auth required: Bearer token

#### Path Params

- `id` (string, required)

#### Request

```bash
curl -X GET http://localhost:3000/api/v1/tickets/fd3efecb-83cf-4f54-b599-53d578203dae \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Success Response

```json
{
  "success": true,
  "data": {
    "id": "fd3efecb-83cf-4f54-b599-53d578203dae",
    "orderId": "b8f26f89-d7e0-4fb2-a845-2a8947b61039",
    "eventId": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
    "userId": 1,
    "qrToken": "<JWT_QR_TOKEN>",
    "qrImage": "data:image/png;base64,iVBORw0KGgo...",
    "status": "VALID",
    "usedAt": null
  },
  "message": "Ticket retrieved successfully"
}
```

#### Failure Responses

```json
{
  "success": false,
  "data": null,
  "message": "Unauthorized"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "Ticket not found"
}
```

---

## Currently Mounted Routes Summary

- `GET /api/v1/`
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `GET /api/v1/events`
- `GET /api/v1/events/:id`
- `POST /api/v1/events`
- `POST /api/v1/orders`
- `POST /api/v1/tickets/validate`
- `GET /api/v1/tickets`
- `GET /api/v1/tickets/:id`

## Known Implementation Caveats

1. `GET /api/v1/` has side effects (creates a user record).
2. `POST /auth/signup` and `POST /auth/login` do not always return early after some failure responses, so behavior can be inconsistent in those edge cases.
3. `POST /events` response key uses `sucess` (spelling typo).
4. Order flow currently skips pending payment and sets `paymentStatus` to `COMPLETED` directly.
5. Ticket validation expects QR token in query parameter `code`, not request body.
6. Payment helpers exist in controllers, but no payment route is currently mounted.
