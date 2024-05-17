const express = require("express");

const {
    getAllShortcutsForOneUser, addShortcutForOneUser, updateShortcutForOneUser, getOneShortcut, deleteShortcut
} = require("../controllers/shortcuts.controllers");

const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-shortcuts-for-a-user",authMiddleware, getAllShortcutsForOneUser);
router.get("/get-shortcut/:id", authMiddleware, getOneShortcut);
router.post("/add-shortcut", authMiddleware, addShortcutForOneUser);
router.put("/update-shortcut/:id", authMiddleware, updateShortcutForOneUser);
router.delete("/delete-shortcut/:id/:userId", authMiddleware, deleteShortcut);
module.exports = router;