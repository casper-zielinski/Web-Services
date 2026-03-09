'use strict';
const {
  listAction,
  detailAction,
  createAction,
} = require('./controller');

const router = require('express').Router();

router.get('/', listAction);
router.get('/:id', detailAction);
router.post('/', createAction);

module.exports = router;
