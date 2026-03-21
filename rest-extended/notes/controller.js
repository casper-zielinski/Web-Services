"use strict";
const { sendFromCache, appendToCache, clearCache } = require("./cache");
const model = require("./model");
const cache = new Map();

function listAction(req, res) {
  const cacheKey = JSON.stringify(req.query);
  sendFromCache(cacheKey, res);

  model
    .get(null, req.query)
    .then((notes) => {
      appendToCache(cacheKey, notes);
      res.set("Cache-Control", "no-store");
      res.json(notes);
    })
    .catch((err) => handleError(err, req, res));
}

function detailAction(req, res) {
  const cacheKey = JSON.stringify(req.params.id);
  sendFromCache(cacheKey, res);

  model
    .get(req.params.id)
    .then((note) => {
      if (note) {
        appendToCache(cacheKey, note);
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
  clearCache();
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
  clearCache();
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
  clearCache();
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
