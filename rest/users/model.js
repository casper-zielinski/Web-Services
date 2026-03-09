"use strict";
const { NODE_ENV } = require("../util/config");
const sqlite = require("sqlite3");
const db = new sqlite.Database("./notes.db");

// drop database only for developing purpose, restart server while development will cleanup current data
if (NODE_ENV === "development") {
  db.run("DROP TABLE IF EXISTS users");
}

db.run(
  `CREATE TABLE IF NOT EXISTS users (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname TEXT NOT NULL,
  lastname  TEXT NOT NULL
);
      `,
  () => {
    if (NODE_ENV === "development") {
      const demoUsers = [
        { firstname: "Casper", lastname: "Zielinski" },
        { firstname: "Umejr", lastname: "Dzinovic" },
      ];
      demoUsers.forEach((user) => {
        insert(user);
      });
    }
  },
);

function getAll() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users";
    const stmt = db.prepare(query);
    stmt.all([], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

function getSpecific(type, searchParameter) {
  if (type !== "id" || type !== "firstname" || type !== "lastname") {
    throw new Error("invalid type, use: id, firstname or lastname");
  } else {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE ${type} = ?`;
      const stmt = db.prepare(query);
      stmt.get([searchParameter], (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });
  }
}

function insert(user) {
  return new Promise((resolve, reject) => {
    console.log("insert new user:", JSON.stringify(user));
    const query = "INSERT INTO users (firstname, lastname) VALUES (?, ?)";
    const stmt = db.prepare(query);
    stmt.run([user.firstname, user.lastname], function (err) {
      if (err) {
        return reject(err);
      }
      user.id = this.lastID;
      resolve(user);
    });
  });
}

function deleteUser() {}

module.exports = {
  get(id) {
    if (!id) {
      return getAll();
    } else {
      return getSpecific("id", id);
    }
  },
  getOne(type, searchParameter) {
    return getSpecific(type, searchParameter);
  },
  save(user) {
    return insert(user);
  },
};
