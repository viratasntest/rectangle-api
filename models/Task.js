const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  title: String,
  description: String,
  type: String,  // Bug, Feature, etc.
  priority: String,
  isUrgent: Boolean,
  startDate: Date,
  endDate: Date,
  storyPoints: Number,
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdDate: { type: Date, default: Date.now },
  chatLink: String,
  notesLink: String,
  relatedImages: [String],
  status: String,
  notifications: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notifyAt: Date
  }]
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
