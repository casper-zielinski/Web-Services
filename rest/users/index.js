"use strict";
const {
  listAction,
  detailAction,
  createAction,
  deleteAction,
  editAction,
} = require("./controller");

const router = require("express").Router();

router.get("/", listAction);
router.get("/:id", detailAction);
router.post("/", createAction);
router.delete("/:id", deleteAction);
router.put("/:id", editAction);

module.exports = router;
