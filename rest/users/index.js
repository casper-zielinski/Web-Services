"use strict";
const {
  listAction,
  detailAction,
  createAction,
  deleteAction,
} = require("./controller");

const router = require("express").Router();

router.get("/", listAction);
router.get("/:id", detailAction);
router.post("/", createAction);
router.delete("/:id", deleteAction);

module.exports = router;
