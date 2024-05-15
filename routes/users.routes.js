const express = require("express");

const {
  getUsers, getUserByEmail, createAnewUser
} = require("../controllers/users.controllers");

const router = express.Router();

router.get("/", getUsers);
router.post("/create", createAnewUser);
router.get("/email/:email", getUserByEmail);

module.exports = router;