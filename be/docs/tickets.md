# Tickets API Docs

## Overview

- Base URL: /api/v1
- Content type: application/json
- Auth header format: Authorization: Bearer <JWT_TOKEN>
- Only host accounts can validate tickets

## Response Pattern

```json
{
  "success": true,
  "data": {},
  "message": "..."
}
```

## Endpoints

### POST /tickets/validate?code=<QR_TOKEN>

Validates a ticket QR token and marks the ticket as USED.

Auth required: Bearer token + HOST role

#### Query Params

- code: string, required

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
    "user": "John User"
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

### GET /tickets

Returns all tickets for the current authenticated user.

Auth required: Bearer token

#### Success Response

```json
{
  "success": true,
  "data": [
    {
      "id": "fd3efecb-83cf-4f54-b599-53d578203dae",
      "orderId": "b8f26f89-d7e0-4fb2-a845-2a8947b61039",
      "eventId": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
      "quantity": 2,
      "userId": 1,
      "qrToken": "<JWT_QR_TOKEN>",
      "qrImage": "data:image/png;base64,...",
      "status": "VALID",
      "usedAt": null,
      "event": {
        "id": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
        "title": "Tech Summit 2026",
        "location": "Mumbai",
        "date": "2026-05-10",
        "time": "09:00"
      }
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

### GET /tickets/:id

Returns one ticket by id for the current authenticated user.

Auth required: Bearer token

#### Path Params

- id: string, required

#### Success Response

```json
{
  "success": true,
  "data": {
    "id": "fd3efecb-83cf-4f54-b599-53d578203dae",
    "orderId": "b8f26f89-d7e0-4fb2-a845-2a8947b61039",
    "eventId": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
    "quantity": 2,
    "userId": 1,
    "qrToken": "<JWT_QR_TOKEN>",
    "qrImage": "data:image/png;base64,...",
    "status": "VALID",
    "usedAt": null,
    "event": {
      "id": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
      "title": "Tech Summit 2026",
      "location": "Mumbai",
      "date": "2026-05-10",
      "time": "09:00"
    }
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

## Caveat

- Ticket validation expects the QR token in the query parameter `code`, not in the request body.
