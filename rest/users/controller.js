'use strict';
const model = require('./model');

function listAction(req, res) {
  console.log('list overview');
  model
    .get()
    .then((users) => {
      console.log(users);
      res.json(users);
    })
    .catch((err) => handleError(err, req, res));
}

function detailAction(req, res) {
  console.log('detail:', req.params.id);
  model
    .get(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ error: `could not find user with id [${req.params.id}]` });
      }
    })
    .catch((err) => handleError(err, req, res));
}

function createAction(req, res) {
  console.log('create');
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  model
    .save(newUser)
    .then((user) => {
      console.log('created', JSON.stringify(user));
      res.status(201).json(user);
    })
    .catch((err) => handleError(err, req, res));
}

function handleError(err, req, res) {
  if (typeof err === 'object' && err.message) {
    err = { error: err.message };
  } else if (typeof err === 'string') {
    err = { error: err };
  } else {
    err = { error: 'unknown error occured' };
  }
  console.log(`ERROR on [${req.method}] via ${req.originalUrl}: [${err.error}]`);
  res.status(500).json(err);
}

module.exports = {
  listAction,
  detailAction,
  createAction,
};
