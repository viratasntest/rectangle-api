const express = require('express');
const { createProject, inviteUser } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createProject);
router.post('/:projectId/invite', authMiddleware, inviteUser);

module.exports = router;
