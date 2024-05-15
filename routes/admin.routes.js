const express = require("express");

const {
  getAllUsers
} = require("../controllers/admin.controllers");

const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-users", authMiddleware, getAllUsers);

module.exports = router;