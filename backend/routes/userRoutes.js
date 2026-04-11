const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { getUser } = require("../controllers/userController");

router.get("/me", auth, getUser);

module.exports = router;