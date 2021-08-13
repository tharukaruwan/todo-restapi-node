const express = require("express");
const router = express.Router();

// Middlewares
// const checkAuth = require('../../middleware/check-auth');
// const { authRole } = require('../../middleware/check-role');
// const { ROLE } = require('../../../role-data');

// Import constrollers
const todos = require("../../controllers/todo/todo");

// Routes
router.post("/", todos.todo_create);
router.get("/", todos.todo_get_all);
router.patch("/:id", todos.todo_update);
router.delete("/:id", todos.todo_delete);

module.exports = router;