const Task = require('../models/Task');

const createTask = async (req, res) => {
  try {
    const { title, description, type, priority, isUrgent, startDate, endDate, storyPoints, assignee, chatLink, notesLink, relatedImages } = req.body;
    const task = new Task({
      projectId: req.params.projectId,
      title,
      description,
      type,
      priority,
      isUrgent,
      startDate,
      endDate,
      storyPoints,
      assignee,
      createdBy: req.user.userId,
      chatLink,
      notesLink,
      relatedImages
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTask };
