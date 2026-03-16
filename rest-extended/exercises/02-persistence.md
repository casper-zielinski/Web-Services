# 02 - Persistence Deep Dive

## Goal

In this exercise, you will deepen your understanding of **persistence** in a REST API.

The project already stores notes in a database.  
Your task is now to analyze, improve, and optionally replace the persistence layer.

You can complete this exercise in one of two variants:

- **Variant A:** Continue with SQLite and improve the existing persistence layer
- **Variant B:** Replace SQLite with MySQL and adapt the project accordingly

The REST API should keep the same external behavior as much as possible.

---

## Learning Goals

After this exercise, you should be able to:

- explain what persistence means in a backend application
- identify where persistence is implemented in the current project
- explain why the model layer should hide database-specific details
- improve the existing SQLite implementation
- optionally migrate the project from SQLite to MySQL
- understand which parts of the application should change and which should remain stable

---

## Starting Point

The current project already contains persistence logic in `model.js`.

At the moment:

- the application uses **SQLite**
- the database file is `notes.db`
- the `notes` table is created automatically
- demo data is inserted in development mode
- CRUD operations are implemented directly in the model

---

## What Persistence Means

Persistence means that data is stored in a way that it still exists after the application process has stopped and started again.

If your notes were only stored in a JavaScript array in memory, they would be lost whenever the server restarts.  
By using a database, the data survives restarts and can be read again later.

SQLite is a file-based relational database, while MySQL is typically used as a separate database server.  
Both can be used behind the same REST API if the persistence layer is structured well. :contentReference[oaicite:2]{index=2}

---

## Exercise Overview

This exercise is split into five steps.

1. Analyze the current persistence layer
2. Improve the SQLite implementation
3. Separate database-specific concerns more clearly
4. Optional: switch from SQLite to MySQL
5. Reflect on what changed and what stayed the same

---

## Step 1 - Inspect the Current Persistence Layer

Open `model.js` and identify the following parts:

- database connection
- table creation
- development-only reset logic
- insert query
- update query
- select queries
- delete query

### Task 1.1

Describe in your own words:

- Where is the database initialized?
- Where is the schema created?
- Which functions directly depend on SQL?
- Which parts of the application call the model?

### Task 1.2

Check whether the controller knows anything about SQLite-specific code.

Expected observation:

- `controller.js` calls `model.get()`, `model.save()`, and `model.delete()`
- the controller should not need to know whether the data comes from SQLite, MySQL, or another storage backend

This is the key idea of this exercise.

---

## Step 2 - Improve the Existing SQLite Persistence

The current implementation works, but it is still very close to a teaching demo.

Improve it step by step.

### Task 2.1 - Add explicit ordering

At the moment, `getAll()` uses:

```js
const query = 'SELECT * FROM notes';
````

Replace it with a deterministic query:

```js
const query = 'SELECT * FROM notes ORDER BY id ASC';
```

### Why?

Without an explicit `ORDER BY`, result order should not be assumed.
This becomes important later when pagination with `limit` and `offset` is introduced. MySQL documentation explicitly discusses how `LIMIT` interacts with result ordering and optimization; in practice, stable pagination requires a stable ordering. ([MySQL Entwicklerzone][3])

---

### Task 2.2 - Return better information for update and delete

At the moment, the `update()` and `remove()` functions do not clearly expose whether a row actually existed.

For SQLite, `stmt.run(...)` provides access to metadata such as the number of changed rows.

Refactor `update()` like this:

```js
function update(note) {
  return new Promise((resolve, reject) => {
    console.log('update note:', JSON.stringify(note));
    const query = 'UPDATE notes SET title = ?, description = ? WHERE id = ?';
    const stmt = db.prepare(query);

    stmt.run([note.title, note.description, note.id], function (err) {
      if (err) {
        return reject(err);
      }

      if (this.changes === 0) {
        return resolve(null);
      }

      resolve(note);
    });
  });
}
```

And refactor `remove()` like this:

```js
function remove(id) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM notes WHERE id = ?';
    const stmt = db.prepare(query);

    stmt.run([id], function (err) {
      if (err) {
        return reject(err);
      }

      resolve(this.changes > 0);
    });
  });
}
```

### Why?

This allows the controller to distinguish between:

* successful update/delete
* request for a resource that does not exist

That makes the API behavior more precise.

---

### Task 2.3 - Adapt the controller to handle missing rows

Adjust `updateAction()`:

```js
function updateAction(req, res) {
  console.log('update');

  const note = {
    id: req.params.id,
    title: req.body.title,
    description: req.body.description,
  };

  model
    .save(note)
    .then((updatedNote) => {
      if (!updatedNote) {
        return res
          .status(404)
          .json({ error: `could not find note with id [${req.params.id}]` });
      }

      res.json(updatedNote);
    })
    .catch((err) => handleError(err, req, res));
}
```

Adjust `deleteAction()`:

```js
function deleteAction(req, res) {
  console.log('delete');
  const id = req.params.id;

  model
    .delete(id)
    .then((deleted) => {
      if (!deleted) {
        return res
          .status(404)
          .json({ error: `could not find note with id [${id}]` });
      }

      res.status(204).send();
    })
    .catch((err) => handleError(err, req, res));
}
```

---

## Step 3 - Prepare the Project for Multiple Database Backends

Now improve the structure so that switching the database becomes easier.

The core rule is:

> The controller should not care whether the data is stored in SQLite or MySQL.

### Task 3.1 - Introduce a database configuration switch

Create a simple configuration value, for example in a config file or via environment variable:

```js
const DB_CLIENT = process.env.DB_CLIENT || 'sqlite';
```

You can then decide which backend module to load.

Example idea:

```js
let persistence;

if (DB_CLIENT === 'mysql') {
  persistence = require('./model.mysql');
} else {
  persistence = require('./model.sqlite');
}

module.exports = persistence;
```

### Recommended structure

```text
.
├── db
├── notes
    ├── controller.js
    ├── model.js
    ├── model.sqlite.js
    ├── model.mysql.js
    └── ...
├── util
    └── config.js
├── package.json
└── server.js

```

### Why?

This creates a stable abstraction point:

* `controller.js` keeps using `model.get()`, `model.save()`, `model.delete()`
* only the underlying persistence implementation changes

This is exactly the kind of separation you want in a backend project.

---

## Step 4 - Variant A: Continue with SQLite

If you stay with SQLite, improve the implementation but keep the backend unchanged.

### Task 4.1 - Move SQLite code into `model.sqlite.js`

Create a new file:

```js
'use strict';
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./notes.db');

db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL
  )
`);
```

Then move the SQLite-specific CRUD functions into that file.

### Task 4.2 - Re-export SQLite in `model.js`

```js
'use strict';
module.exports = require('./model.sqlite');
```

### Result

The rest of the application continues to work, but the database implementation is now isolated.

---

## Step 5 - Variant B: Replace SQLite with MySQL

If you choose the MySQL variant, keep the API routes and controller behavior as stable as possible.

### Important idea

You are **not** rebuilding the whole application.
You are only replacing the persistence implementation.

MySQL is documented as a separate database server system, unlike SQLite which is file-based.
That makes this variant useful to discuss operational differences as well. ([MySQL Entwicklerzone][4])

---

## Step 5.1 - Install a MySQL driver

A common choice is `mysql2`.

Example:

```bash
npm install mysql2
```

---

## Step 5.2 - Create a MySQL connection module

Example `db.mysql.js`:

```js
'use strict';
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'notesdb',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
```

---

## Step 5.3 - Create the table in MySQL

Example SQL:

```sql
CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);
```

### Compare this to SQLite

SQLite version:

```sql
CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL
);
```

### Discussion point

Even though the SQL looks similar, the database systems are not identical.

Examples:

* auto-increment syntax differs
* data types differ
* connection handling differs
* deployment model differs

---

## Step 5.4 - Implement `model.mysql.js`

Example:

```js
'use strict';
const pool = require('./db.mysql');

async function getAll() {
  const [rows] = await pool.execute(
    'SELECT * FROM notes ORDER BY id ASC'
  );
  return rows;
}

async function getOne(id) {
  const [rows] = await pool.execute(
    'SELECT * FROM notes WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

async function insert(note) {
  const [result] = await pool.execute(
    'INSERT INTO notes (title, description) VALUES (?, ?)',
    [note.title, note.description]
  );

  return {
    id: result.insertId,
    title: note.title,
    description: note.description,
  };
}

async function update(note) {
  const [result] = await pool.execute(
    'UPDATE notes SET title = ?, description = ? WHERE id = ?',
    [note.title, note.description, note.id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return note;
}

async function remove(id) {
  const [result] = await pool.execute(
    'DELETE FROM notes WHERE id = ?',
    [id]
  );

  return result.affectedRows > 0;
}

module.exports = {
  get(id) {
    if (!id) {
      return getAll();
    }
    return getOne(id);
  },

  save(note) {
    if (!note.id) {
      return insert(note);
    }
    return update(note);
  },

  delete(id) {
    return remove(id);
  },
};
```

---

## Step 5.5 - Switch the active model

Update `model.js`:

```js
'use strict';

const DB_CLIENT = process.env.DB_CLIENT || 'sqlite';

if (DB_CLIENT === 'mysql') {
  module.exports = require('./model.mysql');
} else {
  module.exports = require('./model.sqlite');
}
```

Now the controller does not need to change.

---

## Step 6 - Compare SQLite and MySQL

Write down the differences you observed.

### Suggested comparison points

* Where is the data physically stored?
* How is the connection established?
* How does table creation work?
* Which code changed in the controller?
* Which code changed in the model?
* Which parts of the public REST API stayed the same?

### Expected result

The public API should stay as stable as possible:

* same endpoints
* same HTTP methods
* same JSON structure
* same status codes

The main changes should happen in the persistence layer.

That is exactly the architectural lesson of this exercise.

---

## Test Cases

Run these tests after your changes.

### Create

```http
POST /notes
Content-Type: application/json

{
  "title": "Persistence",
  "description": "Understand SQLite and MySQL"
}
```

Expected result:

* `201 Created`
* JSON response with a generated `id`

---

### Read all

```http
GET /notes
```

Expected result:

* `200 OK`
* array of notes
* deterministic order by `id ASC`

---

### Read one existing note

```http
GET /notes/1
```

Expected result:

* `200 OK` if note exists
* `404 Not Found` if note does not exist

---

### Update existing note

```http
PUT /notes/1
Content-Type: application/json

{
  "title": "Persistence updated",
  "description": "Updated content"
}
```

Expected result:

* `200 OK` if note exists
* `404 Not Found` if note does not exist

---

### Delete existing note

```http
DELETE /notes/1
```

Expected result:

* `204 No Content` if note existed
* `404 Not Found` if note does not exist

---

## Reflection Questions

Answer the following questions after completing the exercise.

1. What does persistence mean in a REST API project?
2. Why is it useful that the controller does not know whether SQLite or MySQL is used?
3. Which code had to change when switching from SQLite to MySQL?
4. Which code ideally should not change?
5. Why is a dedicated model or persistence layer useful?
6. What are practical differences between SQLite and MySQL in development and deployment?

---

## Source Orientation

Use the following official documentation as reference while working on this exercise:

* SQLite documentation
* MySQL Reference Manual
* Express documentation

Useful topics include:

* SQL `SELECT`
* `LIMIT` / `OFFSET`
* database setup and connection handling
* middleware and project structure

The details of `LIMIT` and `OFFSET` will become especially important in the next sub-exercise.


[1]: https://sqlite.org/docs.html "Documentation - SQLite"
[2]: https://expressjs.com/en/guide/using-middleware.html "Using middleware - Express"
[3]: https://dev.mysql.com/doc/refman/8.4/en/limit-optimization.html "MySQL :: MySQL 8.4 Reference Manual :: 10.2.1.19 LIMIT Query Optimization"
[4]: https://dev.mysql.com/doc/refman/8.4/en/ "MySQL 8.4 Reference Manual"
