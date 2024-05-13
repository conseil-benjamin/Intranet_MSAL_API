const express = require("express");

const {
  getUser,
} = require("../controllers/users.controllers");

const router = express.Router();

router.get("/", getUser);

module.exports = router;