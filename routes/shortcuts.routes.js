const express = require("express");

const {
    getAllShortcutsForOneUser, addShortcutForOneUser
} = require("../controllers/shortcuts.controllers");

const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-shortcuts-for-a-user",authMiddleware, getAllShortcutsForOneUser);
router.post("/add-shortcut",authMiddleware, addShortcutForOneUser);

module.exports = router;