# Orders API Docs

## Overview

- Base URL: /api/v1
- Content type: application/json
- Auth header format: Authorization: Bearer <JWT_TOKEN>

## Response Pattern

```json
{
  "success": true,
  "data": {},
  "message": "..."
}
```

## Endpoint

### POST /orders

Creates an order and immediately generates a ticket for the buyer.

Auth required: Bearer token

Current behavior:

- rejects missing eventId or quantity
- rejects deleted, cancelled, completed, and non-published events
- rejects insufficient ticket availability
- sets paymentStatus directly to COMPLETED

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
      "paymentStatus": "COMPLETED"
    },
    "ticket": {
      "id": "fd3efecb-83cf-4f54-b599-53d578203dae",
      "orderId": "b8f26f89-d7e0-4fb2-a845-2a8947b61039",
      "eventId": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
      "quantity": 2,
      "userId": 1,
      "qrToken": "<JWT_QR_TOKEN>",
      "qrImage": "data:image/png;base64,...",
      "status": "VALID"
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
  "message": "Event is not available for booking"
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

## Caveat

- The current implementation does not create a payment intent. It marks the order as completed immediately.
