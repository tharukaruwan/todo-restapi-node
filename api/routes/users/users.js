const express = require("express");
const router = express.Router();

// Middlewares
const checkAuth = require('../../middleware/check-auth');
const { authRole } = require('../../middleware/check-role');
const { ROLE } = require('../../../role-data');

// Import constrollers
const users = require("../../controllers/users/users");

// Routes
router.post("/signup", users.user_signup);
router.post("/login", users.user_login);
router.patch("/:userId", users.user_update);

module.exports = router;