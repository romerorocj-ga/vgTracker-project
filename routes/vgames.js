const express = require("express");
const router = express.Router();

const vgamesCtrl = require("../controllers/vgames");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/", vgamesCtrl.index);

router.get("/new", ensureLoggedIn, vgamesCtrl.new);

router.get("/:id", vgamesCtrl.show);

router.post("/", ensureLoggedIn, vgamesCtrl.create);

router.post("/:id", ensureLoggedIn, vgamesCtrl.update);

// Add this route to Routes/vgames.js
router.get("/:id/edit", ensureLoggedIn, vgamesCtrl.edit);

module.exports = router;
