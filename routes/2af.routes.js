const express = require("express");

const {
  verify2afActive, enable2af, verifyOTPcode
} = require("../controllers/2af.controllers");

const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/2af-active", authMiddleware, verify2afActive);
router.post("/verify-otp-code", authMiddleware, verifyOTPcode);
router.post("/enable-2af", authMiddleware, enable2af);

module.exports = router;