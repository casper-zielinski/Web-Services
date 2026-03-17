"use strict";
const model = require("./model");
const cache = new Map();

function listAction(req, res) {
  const cacheKey = JSON.stringify(req.query);
  if (cache.get(cacheKey)) {
    console.log("cached");
    return res.json(cache.get(cacheKey));
  }

  model
    .get(null, req.query)
    .then((notes) => {
      cache.set(cacheKey, notes);
      console.log("new response");
      res.json(notes);
    })
    .catch((err) => handleError(err, req, res));
}

function detailAction(req, res) {
  console.log("detail:", req.params.id);
  model
    .get(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res
          .status(404)
          .json({ error: `could not find note with id [${req.params.id}]` });
      }
    })
    .catch((err) => handleError(err, req, res));
}

function createAction(req, res) {
  console.log("create");
  const newNote = {
    title: req.body.title,
    description: req.body.description,
  };
  model
    .save(newNote)
    .then((note) => {
      console.log("created", JSON.stringify(note));
      res.status(201).json(note);
    })
    .catch((err) => handleError(err, req, res));
}

function updateAction(req, res) {
  console.log("update");
  const note = {
    id: req.params.id,
    title: req.body.title,
    description: req.body.description,
  };
  model
    .save(note)
    .then((note) => {
      if (!note) {
        return res
          .status(404)
          .json({ error: `could not find note with id [${req.params.id}]` });
      }
      res.json(note);
    })
    .catch((err) => handleError(err, req, res));
}

function deleteAction(req, res) {
  const id = req.params.id;
  model
    .delete(id)
    .then((deleted) => {
      if (!deleted) {
        return res
          .status(404)
          .json({ error: `could not find note with id [${id}]` });
      }
      return res.status(204).send();
    })
    .catch((err) => handleError(err, req, res));
}

function handleError(err, req, res) {
  if (typeof err === "object" && err.code) {
    console.error("ERROR: \n", err.code);
    const error = err.code;
    if (error == "SQLITE_MISMATCH") {
      return res
        .status(400)
        .json({ error: error, message: "Converting type failed" });
    }
  } else if (typeof err === "object" && err.message) {
    err = { error: err.message };
  } else if (typeof err === "string") {
    err = { error: err };
  } else {
    err = { error: "unknown error occured" };
  }
  console.log(
    `ERROR on [${req.method}] via ${req.originalUrl}: [${err.error}]`,
  );
  res.status(500).json(err);
}

module.exports = {
  listAction,
  detailAction,
  createAction,
  updateAction,
  deleteAction,
};
