# Project - Cursor Based Pagination

## Zweck des Webservices

**Pagination** wird benutzt, um nicht alle Daten zurückugeben und nur eine bestimmte menge pro seite, damit man nicht wenn man eine app betritt ewig lange warten muss (Ladezeit zu verringern), wenn die app schon tausende von daten hat.

**Pagination** wird in zwei Arten unterteilt

1. **Offset Pagination**

und

2. **Cursor Based Pagination**

**Offset Pagination** nutzt oft das `OFFSET` keyword in einer DB um datensätze zu überspringen, das ist einfach zu implementieren, kann aber zu performance issues führen, wenn der offset zu groß sein wird, da die DB trotzdem die geskippten einträge lesen muss. Ebenfalls kann es zu einer Daten-Inkonsistenz kommen. Elemente können übersprungen werden oder doppelt erscheinen, wenn während des Blätterns neue Daten eingefügt oder gelöscht werden.

**Cursor** based Pagination verwendet aber dafür einen bestimmten wert um nach den einträgen zu suchen, wie z.B. die id des letzten gelesenen elements. Also das letzte Element der aktuellen Seite wird dann als Cursor für die nächste Anfrage mitgegeben. Somit kann man dann ganz einfach eine query wie z.B. `SELECT * FROM tabelle WHERE id > cursor LIMIT 10`, wobei der limit dann durch die query parameter übergeben werden soll. Damit ist es auch stabiler wenn während des Durchblätterns neue Daten hinzugefügt werden, da es einen stabilen next point hat.

## Architektur Überblick

### Frontend

**Frontend** (_React_ in TS)

#### Ordnerstruktur

```
src/
  api/
    postApi.ts       ← nur fetch
  hooks/
    usePosts.ts      ← nur Logik
  components/
    FeedPage.tsx     ← Page-Level, nutzt Hook
    PostCard.tsx     ← Presentational, nur Props
  types/
    post.ts          ← Post Interface
```

### Backend

**Backend** (_Express_ in TS)

#### Ordnerstruktur

```
src/
  routes/
    menuRoutes.ts        ← HTTP Endpoints, nur Request/Response
  services/
    menuService.ts       ← Business Logic, ruft Repository auf
  db/
    schema.ts            ← Typ/Interface für die DB-Entität
  dto/
    menuItemRequest.ts   ← was reinkommt (POST Body)
    menuItemResponse.ts  ← was rausgeht (API Response)
  middleware/
    errorHandler.ts      ← globale Fehlerbehandlung
  db/
    client.ts            ← DB-Verbindung (z.B. Drizzle)
  app.ts                 ← Express Setup, Middleware registrieren
  server.ts              ← server.listen() - Einstiegspunkt
```

### Datenbank

**Datenbank** (_PostgreSQL_ in Docker)

Kommunikation läuft über **REST**. Der Backend-Code läuft dem **Repository-Service-Controller Pattern** und Frontend im **Component-Hook-API-Layer Pattern**.

## Setup

### Voraussetzungen
- Docker
- Node.js (v18+)

### Installation
```bash
git clone 
cd post-feed
```

### ENV-Variablen
```bash
cd backend
cp .env.example .env
```

| Variable | Beschreibung | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL Connection String | `postgresql://admin:secret@localhost:5432/post_feed` |
| `PORT` | Port des Express Servers | `3000` |

### Start

Datenbank (Docker):
```bash
docker compose up -d
```

Backend:
```bash
cd backend && npm install && npm run dev
```

Frontend:
```bash
cd frontend && npm install && npm run dev
```

### Ports

| Service | Port |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |
| PostgreSQL | localhost:5432 |


## Beispiel-Requests

Erste Seite (10 Posts):
`GET http://localhost:3000/api/v1/posts?limit=10`

Nächste Seite (10 Posts nach Cursor):
`GET http://localhost:3000/api/v1/posts?limit=10&cursor=10`

> Der `cursor` entspricht der `id` des letzten Elements der vorherigen Seite.
> Ist das letzte Element z.B. `id: 42`, lautet der nächste Request `?limit=10&cursor=42`.
> Gibt der Server `nextCursor: null` zurück, gibt es keine weiteren Posts.

## Technologiestack

| Bereich | Technologie |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Express, TypeScript, Node.js |
| Datenbank | PostgreSQL |
| ORM | Drizzle |
| Infrastruktur | Docker, Docker Compose |

## Dokumentation benutzt

- [Video zum Express mit TS Setup](https://www.youtube.com/watch?v=4MWOB-a7XSg)
- [Vite Dokumentation](https://vite.dev/guide/)
- [Docker Compose Docs](https://docs.docker.com/compose/)