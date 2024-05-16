const express = require("express");

const {
    getAllApplications
} = require("../controllers/applications.controllers");

const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-applications",authMiddleware, getAllApplications);

module.exports = router;