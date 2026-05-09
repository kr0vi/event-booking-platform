# Host API Docs

## Overview

- Base URL: /api/v1
- Content type: application/json
- Auth header format: Authorization: Bearer <JWT_TOKEN>
- Requires HOST role

## Endpoint

### GET /host/events

Returns all events created by the current host.

Auth required: Bearer token + HOST role

#### Request

```bash
curl -X GET http://localhost:3000/api/v1/host/events \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Success Response

```json
{
  "success": true,
  "data": [
    {
      "id": "5dc8e4cb-3458-4c15-a0bf-41f7a22bc3bb",
      "title": "Tech Summit 2026",
      "hostId": 1,
      "status": "PUBLISHED"
    }
  ]
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
