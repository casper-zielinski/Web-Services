# Web Services

Lehrveranstaltung an der FH, in der grundlegende Konzepte moderner Web-Kommunikation erarbeitet werden. Themen sind unter anderem **REST**, **Datenbankanbindung**, **Filterung & Pagination**, **Caching** und **WebSockets** – von einfachen Beispielen bis hin zu einem vollständigen Abschlussprojekt.

---

## Ordnerstruktur

```
web-services/
├── rest/              ← REST Grundlagen mit Vanilla JS Frontend
├── rest-extended/     ← Vertiefung: Persistence, Filtering, Pagination, Caching
├── websockets/        ← Echtzeit-Kommunikation mit WebSockets
└── project/           ← Abschlussprojekt: Cursor-based Pagination (React + Express + PostgreSQL)
```

---

## REST

**Ordner:** `rest/`

Einstieg in REST-basierte Web Services. Es wird ein einfacher Express-Server aufgebaut, der eine Notes-API bereitstellt. Dazu gehört ein kleines Vanilla-JS-Frontend, das die API per `fetch` konsumiert.

### Checkpoints

| Checkpoint | Inhalt |
|---|---|
| RE-001 | Express-Server aufsetzen, erste GET-Route |
| RE-002 | Vollständiges CRUD für `/notes` |
| RE-003 | Input-Validierung mit `express-validator` |
| RE-004 | CORS-Header & HTTP-Statuscodes korrekt setzen |
| RE-005 | Zweite Ressource `/users` eigenständig implementieren |

### Stack

| Bereich | Technologie |
|---|---|
| Backend | Node.js, Express |
| Datenbank | SQLite |
| Frontend | Vanilla HTML/JS |

### Start

```bash
cd rest
npm install
npm start
```

---

## REST Extended

**Ordner:** `rest-extended/`

Vertiefungsübungen auf Basis des REST-Beispiels. Jede Exercise erweitert die bestehende Notes-API um ein neues Konzept. Alle Aufgabenstellungen liegen als Markdown-Dateien im Ordner `exercises/`.

### Exercise 01 – CRUD

Wiederholung und Verfeinerung der CRUD-Operationen. Die vier HTTP-Methoden (`GET`, `POST`, `PUT`, `DELETE`) werden auf die entsprechenden Datenbankoperationen gemappt. Typische Fehler (fehlende Statuscodes, fehlende Validierung) werden analysiert und behoben.

### Exercise 02 – Persistence

Vertiefung der Datenbankanbindung. SQLite wird als Einstieg verwendet, danach wird auf MySQL migriert. Dabei wird gelernt, wie man Datenbankcode vom Business-Logic-Code sauber trennt, sodass ein Wechsel des Datenbanksystems möglichst wenig Aufwand bedeutet.

### Exercise 03 – Filtering

Erweiterung der API um Query-Parameter zur Filterung (z. B. `?title=foo`). Es wird der Unterschied zwischen Pfad-Parametern und Query-Parametern erklärt. Besonderes Augenmerk liegt auf sicheren, parametrisierten SQL-Queries, um SQL-Injection zu verhindern.

### Exercise 04 – Pagination

Die API gibt nicht mehr alle Einträge auf einmal zurück, sondern seitenweise über `limit` und `offset`. Die Parameter werden validiert, mit Filterung kombiniert und korrekt in der SQL-Query verarbeitet. Optional wird eine Response-Metadaten-Struktur (z. B. `total`, `page`) zurückgegeben.

### Exercise 05 – Caching

Einführung in Caching-Strategien für REST-APIs. Es werden zwei Ansätze behandelt:

- **In-Memory-Cache** im Express-Server (eigene Cache-Map, Invalidierung bei Schreiboperationen)
- **HTTP-Caching** über Response-Header (`Cache-Control`, `ETag`, `Last-Modified`, `304 Not Modified`)

### Stack

| Bereich | Technologie |
|---|---|
| Backend | Node.js, Express |
| Datenbank | SQLite, MySQL |
| Frontend | – (nur API) |

### Start

```bash
cd rest-extended
npm install
npm run dev
```

---

## WebSockets

**Ordner:** `websockets/`

Einstieg in bidirektionale Echtzeit-Kommunikation mit dem WebSocket-Protokoll. Es wird ein Chat-System sowie ein Reporter/Newsreader-System aufgebaut, das ohne Polling in Echtzeit Nachrichten empfängt und sendet.

Das Monorepo besteht aus zwei Workspaces:

```
websockets/
├── backend/    ← WebSocket-Server (Node.js)
└── frontend/   ← Statisches HTML/JS-Frontend mit Bootstrap
```

### Checkpoints

| Checkpoint | Inhalt |
|---|---|
| WS-000 | WebSocket-Verbindung aufbauen, Status im UI anzeigen |
| WS-001 | Verbindungs-Events (`onopen`, `onclose`, `onerror`, `onmessage`) verstehen |
| WS-002 | Live-Ticker implementieren (Nachrichten empfangen & anzeigen) |
| WS-003 | Reporter-Formular: Artikel mit Titel, Thema und Inhalt senden |
| WS-004 | Newsreader: Artikel empfangen und im DOM darstellen |
| WS-005 | Like-Button: Interaktion über WebSocket zurück an den Server senden |

### Frontend-Seiten

| Datei | Beschreibung |
|---|---|
| `index.html` | Chat-Interface mit Teilnehmerzähler |
| `reporter.html` | Formular zum Verfassen von Artikeln |
| `newsreader.html` | Ansicht für eingegangene Artikel |

### Stack

| Bereich | Technologie |
|---|---|
| Backend | Node.js, `websocket`-Paket |
| Frontend | Vanilla HTML/JS, Bootstrap 5 |

### Start

```bash
cd websockets
npm run install-all
npm run start-all
```

---

## Project – Cursor Based Pagination

**Ordner:** `project/`

Abschlussprojekt der Lehrveranstaltung. Ein vollständiger Post-Feed mit **Cursor-Based Pagination** – einer modernen Alternative zu Offset-Pagination, die stabiler und performanter bei großen Datenmengen ist.

### Was ist Cursor-Based Pagination?

**Offset Pagination** überspringt Einträge mit dem `OFFSET`-Keyword. Das führt bei großen Offsets zu Performanceproblemen, da die Datenbank trotzdem alle übersprungenen Zeilen lesen muss. Außerdem kann es zu Inkonsistenzen kommen, wenn während des Blätterns neue Einträge hinzukommen.

**Cursor-Based Pagination** verwendet stattdessen die `id` des letzten geladenen Eintrags als Startpunkt für die nächste Anfrage:

```sql
SELECT * FROM posts WHERE id > :cursor LIMIT 10
```

Der Server gibt mit jeder Antwort einen `next_cursor` zurück. Ist er `null`, gibt es keine weiteren Seiten.

### Architektur

**Backend** (Express in TypeScript) folgt dem **Repository-Service-Controller-Pattern:**

```
src/
  routes/         ← HTTP-Endpoints (nur Request/Response)
  service/        ← Business Logic
  db/schema.ts    ← Drizzle ORM Schema
  dto/            ← Request- und Response-Typen
  server.ts       ← Einstiegspunkt
```

**Frontend** (React in TypeScript) folgt dem **Component-Hook-API-Layer-Pattern:**

```
src/
  api/            ← fetch-Logik
  hooks/          ← State & Logik
  components/     ← UI-Komponenten
  types/          ← Interfaces
```

**Datenbank:** PostgreSQL läuft in Docker.

### Setup

Voraussetzungen: **Docker**, **Node.js v18+**

```bash
# ENV-Datei anlegen
cd project/backend
cp .env.example .env
```

| Variable | Beschreibung | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL Connection String | `postgresql://admin:secret@localhost:5432/post_feed` |
| `PORT` | Port des Express Servers | `3000` |

```bash
# Datenbank starten
cd project
docker compose up -d

# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm run dev
```

### Ports

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |
| PostgreSQL | localhost:5432 |

### Beispiel-Requests

Erste Seite:
```
GET http://localhost:3000/api/v1/posts?limit=10
```

Nächste Seite (Cursor = id des letzten Elements):
```
GET http://localhost:3000/api/v1/posts?limit=10&cursor=10
```

Neuen Post erstellen:
```
POST http://localhost:3000/api/v1/posts
Content-Type: application/json

{ "text": "Mein erster Post", "likes": 0 }
```

### Stack

| Bereich | Technologie |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Express, TypeScript, Node.js |
| Datenbank | PostgreSQL |
| ORM | Drizzle |
| Infrastruktur | Docker, Docker Compose |
