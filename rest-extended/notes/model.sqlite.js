"use strict";

const { NODE_ENV } = require("../util/config");

const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./notes.db");

db.run(
  `
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL
  )
`,
);

module.exports = { db };
