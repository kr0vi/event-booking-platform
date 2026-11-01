# Event Booking Platform

A full-stack event booking platform with:

- **Frontend**: Next.js app in `/fe`
- **Backend**: Express + Prisma API in `/be`

## Repository Structure

- `/fe` – Next.js frontend (React + TypeScript)
- `/be` – Express backend (TypeScript + Prisma + PostgreSQL)
- `/be/docs` – Split backend API documentation
- `/be/APIDOCS.md` – Legacy monolithic backend API docs

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios

### Backend

- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT auth

## Prerequisites

- Node.js 20+
- npm
- PostgreSQL database

## Local Development Setup

### 1) Clone and install dependencies

```bash
git clone <repository-url>
cd event-booking-platform

cd fe && npm install
cd ../be && npm install
```

### 2) Configure environment variables

Backend (`/be`) uses:

- `DATABASE_URL` (required for Prisma/PostgreSQL)
- `PORT` (optional, defaults to `3000`)
- `JWT_SECRET_KEY` (recommended)
- `ADMIN_MAILS` (optional)

Frontend (`/fe`) uses:

- `NEXT_PUBLIC_API_BASE_URL` (example: `http://localhost:3000/api/v1`)
- `NEXT_PUBLIC_API_LOGIN_URL` (optional override)
- `NEXT_PUBLIC_API_SIGNUP_URL` (optional override)
- `NEXT_PUBLIC_API_ME_URL` (optional override)

### 3) Run database migrations (backend)

```bash
cd be
npx prisma migrate deploy
# for local development, you can also use:
# npx prisma migrate dev
```

### 4) Start backend

```bash
cd be
npm run dev
```

### 5) Start frontend

```bash
cd fe
npm run dev
```

Frontend runs on `http://localhost:3000` by default unless changed.

## Build and Run

### Frontend

```bash
cd fe
npm run build
npm run start
```

### Backend

```bash
cd be
npm run build
npm run start
```

## API Documentation

- Split docs index: `/be/docs/index.md`
- Legacy docs: `/be/APIDOCS.md`

## Scripts

### Frontend (`/fe/package.json`)

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

### Backend (`/be/package.json`)

- `npm run dev`
- `npm run build`
- `npm run start`
