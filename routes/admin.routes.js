const express = require("express");

const {
  getAllUsers, getOneApplication, updateApplication, addApplication, deleteApplication
} = require("../controllers/admin.controllers");

const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-users", authMiddleware, getAllUsers);
router.post("/add-application", authMiddleware, addApplication);
router.get("/get-application/:id", authMiddleware, getOneApplication);
router.put("/update-application/:id", authMiddleware, updateApplication);
router.delete("/delete-application/:id", authMiddleware, deleteApplication);
module.exports = router;