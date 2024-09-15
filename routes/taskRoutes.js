const express = require('express');
const { createTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:projectId/tasks/create', authMiddleware, createTask);

module.exports = router;
