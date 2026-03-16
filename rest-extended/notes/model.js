"use strict";

const { db } = require("./model.sqlite");
const { getFilterQuery } = require("./filter.js");

// get all notes
function getAll(filter) {
  return new Promise((resolve, reject) => {
    const {
      filterQueryArray,
      filterQuery,
      pagginationQuery,
      pagginationValues,
    } = getFilterQuery(filter);

    const query = `SELECT * FROM notes ${filterQuery} ORDER BY id ASC ${pagginationQuery}`;
    const stmt = db.prepare(query);
    stmt.all(filterQueryArray, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve({ data: result, pagginationValues: pagginationValues });
    });
  });
}

// get one note by it's id
function getOne(id) {
  return new Promise((resolve, reject) => {
    console.log("getOne", id);
    if (id == 666) {
      return reject(new Error("number of the beast"));
    }
    const query = "SELECT * FROM notes WHERE id = ?";
    const stmt = db.prepare(query);
    stmt.get([id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

// insert a new note
function insert(note) {
  return new Promise((resolve, reject) => {
    console.log("insert new note:", JSON.stringify(note));
    const query = "INSERT INTO notes (title, description) VALUES (?, ?)";
    const stmt = db.prepare(query);
    stmt.run([note.title, note.description], function (err) {
      if (err) {
        return reject(err);
      }
      note.id = this.lastID; // to access 'lastID', we need to use a regular `function()` instead of an Arrow-function, for more information take a look here: https://levelup.gitconnected.com/arrow-function-vs-regular-function-in-javascript-b6337fb87032#ab92
      resolve(note);
    });
  });
}

// update an existing note
function update(note) {
  return new Promise((resolve, reject) => {
    console.log("update note:", JSON.stringify(note));
    const query = "UPDATE notes SET title = ?, description = ? WHERE id = ?";
    const stmt = db.prepare(query);
    stmt.run([note.title, note.description, note.id], function (err) {
      if (err) {
        return reject(err);
      }

      if (this.changes === 0) {
        console.log("No Notes found with this id! Nothing got updated.");
        return resolve(null);
      }

      resolve(note);
    });
  });
}

// delete a note
function remove(id) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM notes WHERE id = ?";
    const stmt = db.prepare(query);
    stmt.run([id], function (err) {
      if (err) {
        reject(err);
      }

      resolve(this.changes > 0);
    });
  });
}

module.exports = {
  get(id, filter) {
    if (!id) {
      return getAll(filter);
    } else {
      return getOne(id);
    }
  },
  save(note) {
    if (!note.id) {
      return insert(note);
    } else {
      return update(note);
    }
  },
  delete(id) {
    return remove(id);
  },
};
