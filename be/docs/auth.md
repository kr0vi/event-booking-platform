# Auth API Docs

## Overview

- Base URL: /api/v1
- Content type: application/json
- Auth header format: Authorization: Bearer <JWT_TOKEN>
- JWT payload currently includes user id as { "id": 1 }

## Response Pattern

Most auth endpoints return:

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

or for login:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

## Endpoints

### POST /auth/signup

Creates a regular user account. If the email is in ADMIN_MAILS, the role becomes ADMIN.

#### Request Body

```json
{
  "name": "John User",
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
    "name": "John User",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

#### Failure Responses

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

### POST /auth/org/signup

Creates a host account or upgrades an existing user to HOST.

#### Request Body

```json
{
  "name": "John Host",
  "email": "host@example.com",
  "password": "strongpassword123"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "Host created successfully",
  "data": {
    "id": 1,
    "name": "John Host",
    "email": "host@example.com",
    "role": "HOST"
  }
}
```

#### Failure Responses

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

### POST /auth/login

Authenticates a user and returns a JWT.

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

#### Failure Responses

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

### GET /auth/me

Returns the current authenticated user.

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
    "name": "John User",
    "role": "USER"
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
