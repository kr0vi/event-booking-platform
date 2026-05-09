# Events API Docs

## Overview

- Base URL: /api/v1
- Content type: application/json
- Host-protected routes require a Bearer token and HOST role
- Public event reads only return events that are PUBLISHED and not soft-deleted

## Response Pattern

Most event endpoints return:

```json
{
  "success": true,
  "data": {},
  "message": "..."
}
```

## Endpoints

### GET /events

Returns paginated public events.

Query params:

- page: number, optional, defaults to 1

Current behavior:

- only returns events where `status = PUBLISHED`
- excludes soft-deleted events
- page size is 6

#### Request

```bash
curl -X GET "http://localhost:3000/api/v1/events?page=1"
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
      "ticketPerStudent": 1,
      "price": 2000,
      "status": "PUBLISHED",
      "isDeleted": false,
      "host": {
        "name": "John Host"
      }
    }
  ],
  "message": "All events fetched successfully",
  "pagination": {
    "currentPage": 1,
    "pageSize": 6,
    "hasNextPage": false
  }
}
```

#### Empty Response

```json
{
  "success": false,
  "data": [],
  "pagination": {
    "currentPage": 1,
    "pageSize": 6,
    "hasNextPage": false
  },
  "message": "No events found"
}
```

### GET /events/:id

Returns one public event by id, including host name.

Current behavior:

- only returns events that are PUBLISHED
- excludes soft-deleted events

#### Path Params

- id: string, required

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
    "title": "Tech Summit 2026",
    "host": {
      "name": "John Host"
    }
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

### POST /events

Creates an event.

Auth required: Bearer token + HOST role

#### Request Body

Validation comes from `createEventSchema`:

- title: string, min 1, max 100
- description: string, min 10, max 800
- location: string, min 1, max 100
- eventDate: string, format YYYY-MM-DD
- eventTime: string
- posterImage: valid URL string
- galleryImages: array of valid URL strings, defaults to []
- highlights: array of objects with title and description
- thingsToKnow: array of strings, defaults to []
- price: number, min 0
- totalTickets: number, min 0
- ticketPerStudent: number, defaults to 1

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
  "success": true,
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
  "message": "Invalid input"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "Failed to create event"
}
```

### PATCH /events/:id

Updates an event owned by the current host.

Current behavior:

- rejects cancelled, completed, and soft-deleted events
- maps `eventDate` to Prisma `date`
- maps `eventTime` to Prisma `time`

#### Path Params

- id: string, required

#### Request Body

Any subset of the update schema fields:

- title
- description
- location
- eventDate
- eventTime
- posterImage
- highlights
- thingsToKnow
- price
- totalTickets
- ticketPerStudent

#### Success Response

```json
{
  "success": true,
  "data": {
    "id": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
    "title": "Updated Tech Summit 2026"
  },
  "message": "Event updated successfully"
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
  "message": "Event not found or you are not the host"
}
```

```json
{
  "success": false,
  "data": null,
  "message": "Cannot update a cancelled or completed event or an event that is deleted"
}
```

### POST /events/:id/cancel

Cancels an event owned by the current host.

Current behavior:

- rejects already cancelled or completed events
- rejects soft-deleted events

#### Success Response

```json
{
  "success": true,
  "data": {
    "id": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
    "status": "CANCELLED"
  },
  "message": "Event cancelled successfully"
}
```

### POST /events/:id/delete

Soft-deletes an event owned by the current host.

Current behavior:

- sets `isDeleted` to true
- sets `deletedAt` to the current timestamp
- rejects completed events
- rejects already deleted events

#### Success Response

```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

### GET /events/my-events

Returns events purchased by the authenticated user.

Auth required: Bearer token

#### Success Response

```json
{
  "success": true,
  "data": [
    {
      "event": {
        "id": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
        "date": "2026-05-10",
        "time": "09:00",
        "title": "Tech Summit 2026",
        "location": "Mumbai",
        "price": 2000,
        "posterImage": "https://example.com/poster.jpg",
        "host": {
          "name": "John Host"
        }
      }
    }
  ],
  "message": "User events fetched successfully"
}
```

## Caveats

- Public event reads intentionally hide non-published and soft-deleted records.
- The update endpoint accepts `eventDate` and `eventTime` in the request body, but stores them in Prisma fields `date` and `time`.
