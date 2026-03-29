# Event Booking Platform Backend API Docs

## Overview

- Base URL: `/api/v1`
- Content-Type: `application/json`
- Auth style: `Authorization: Bearer <JWT_TOKEN>`
- Current behavior: most endpoints return JSON with HTTP `200` even for failures (`success: false`).

## Standard Response Shape

Most responses follow:

```json
{
  "success": true,
  "data": {},
  "message": "..."
}
```

Some routes return slightly different keys (for example `auth/login` and `auth/signup`).

## Authentication and Roles

- `authMiddleware`: requires a valid JWT.
- `adminMiddleware`: requires a valid JWT and user role `ORGANIZER`.
- JWT payload currently contains user id as `{ "id": <number> }`.

---

## Health

### GET `/`

Health/ping endpoint.

Important: this route currently creates a demo user before returning `Pong!`.

#### Request Example

```bash
curl -X GET http://localhost:3000/api/v1/
```

#### Success Response Example

```text
Pong!
```

---

## Auth

### POST `/auth/signup`

Create a user account. Newly created users are assigned role `ORGANIZER`.

#### Request Body

```json
{
  "name": "John Organizer",
  "email": "john@example.com",
  "password": "strongpassword123"
}
```

#### Request Example

```bash
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Organizer",
    "email": "john@example.com",
    "password": "strongpassword123"
  }'
```

#### Success Response Example

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

#### Failure Response Example (User Already Exists)

```json
{
  "success": false,
  "message": "User already exists"
}
```

### POST `/auth/login`

Authenticate user and return JWT token.

#### Request Body

```json
{
  "email": "john@example.com",
  "password": "strongpassword123"
}
```

#### Request Example

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "strongpassword123"
  }'
```

#### Success Response Example

```json
{
  "user": {
    "id": 1,
    "name": "John Organizer",
    "email": "john@example.com",
    "passwordHash": "$2b$10$...",
    "role": "ORGANIZER",
    "createdAt": "2026-03-29T10:00:00.000Z",
    "updatedAt": "2026-03-29T10:00:00.000Z"
  },
  "success": true,
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

#### Failure Response Example (Invalid Credentials)

```json
{
  "success": false,
  "message": "User does not exist"
}
```

```json
{
  "success": false,
  "message": "Invalid password"
}
```

---

## Events

### GET `/events`

Get all events.

#### Request Example

```bash
curl -X GET http://localhost:3000/api/v1/events
```

#### Success Response Example

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

#### Failure Response Example (No Events)

```json
{
  "success": false,
  "data": [],
  "message": "No events found"
}
```

### GET `/events/:id`

Get one event by id.

#### Path Params

- `id` (string, required): event UUID

#### Request Example

```bash
curl -X GET http://localhost:3000/api/v1/events/5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb
```

#### Success Response Example

```json
{
  "success": true,
  "data": {
    "id": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
    "title": "Tech Summit 2026",
    "description": "Annual conference",
    "location": "Mumbai",
    "date": "2026-05-10",
    "time": "09:00",
    "totalTickets": 500,
    "ticketsSold": 120,
    "price": 2000,
    "status": "OPEN",
    "organizerId": 1,
    "createdAt": "2026-03-29T10:30:00.000Z",
    "updatedAt": "2026-03-29T10:30:00.000Z"
  },
  "message": "Event fetched successfully"
}
```

#### Failure Response Example (Not Found)

```json
{
  "success": false,
  "data": null,
  "message": "Event not found"
}
```

### POST `/events`

Create an event.

Auth: `Bearer token` required and caller must have role `ORGANIZER`.

#### Request Headers

- `Authorization: Bearer <JWT_TOKEN>`

#### Request Body

```json
{
  "title": "Tech Summit 2026",
  "description": "Annual conference",
  "location": "Mumbai",
  "price": 2000,
  "eventDate": "2026-05-10",
  "eventTime": "09:00",
  "totalTickets": 500
}
```

#### Request Example

```bash
curl -X POST http://localhost:3000/api/v1/events \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tech Summit 2026",
    "description": "Annual conference",
    "location": "Mumbai",
    "price": 2000,
    "eventDate": "2026-05-10",
    "eventTime": "09:00",
    "totalTickets": 500
  }'
```

#### Success Response Example

```json
{
  "sucess": true,
  "message": "Event created successfully"
}
```

Note: response key is currently `sucess` (typo in implementation).

#### Failure Response Example (Unauthorized)

```json
{
  "success": false,
  "data": null,
  "message": "Unauthorized"
}
```

---

## Orders

### POST `/orders`

Create an order for an event and auto-generate ticket(s).

Auth: `Bearer token` required.

#### Request Headers

- `Authorization: Bearer <JWT_TOKEN>`

#### Request Body

```json
{
  "eventId": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
  "quantity": 2
}
```

#### Request Example

```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
    "quantity": 2
  }'
```

#### Success Response Example

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

#### Failure Response Example (Not Enough Tickets)

```json
{
  "success": false,
  "data": null,
  "message": "Not enough tickets available"
}
```

Other possible failures:

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
  "message": "Failed to generate ticket"
}
```

---

## Tickets

### POST `/tickets/validate?code=<QR_TOKEN>`

Validate ticket from QR token and mark it as `USED`.

Auth: `Bearer token` required and caller must have role `ORGANIZER`.

#### Request Headers

- `Authorization: Bearer <JWT_TOKEN>`

#### Query Params

- `code` (string, required): ticket QR token

#### Request Example

```bash
curl -X POST "http://localhost:3000/api/v1/tickets/validate?code=<QR_TOKEN>" \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Success Response Example

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

#### Failure Response Example

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

Get all tickets for the currently logged-in user.

Auth: `Bearer token` required.

#### Request Example

```bash
curl -X GET http://localhost:3000/api/v1/tickets \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Success Response Example

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

#### Failure Response Example (Unauthorized)

```json
{
  "success": false,
  "data": null,
  "message": "Unauthorized"
}
```

### GET `/tickets/:id`

Get one ticket by id for the currently logged-in user.

Auth: `Bearer token` required.

#### Path Params

- `id` (string, required): ticket UUID

#### Request Example

```bash
curl -X GET http://localhost:3000/api/v1/tickets/fd3efecb-83cf-4f54-b599-53d578203dae \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Success Response Example

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

#### Failure Response Example (Not Found)

```json
{
  "success": false,
  "data": null,
  "message": "Ticket not found"
}
```

---

## Notes and Implementation Caveats

1. `GET /api/v1/` has a side effect (creates a user) and is not a pure health check.
2. Auth endpoints do not return early after failure in current implementation, which can produce unintended behavior.
3. `POST /events` success response key is `sucess` instead of `success`.
4. Orders currently set `paymentStatus` directly to `COMPLETED` and generate tickets immediately.
5. `POST /tickets/validate` consumes a query string token (`code`) rather than JSON body.
