const Project = require('../models/Project');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const project = new Project({
      name,
      owner: req.user.userId,
      teams: []
    });
    await project.save();
    await User.findByIdAndUpdate(req.user.userId, { $push: { projects: project._id } });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const inviteUser = async (req, res) => {
  try {
    const { email, team } = req.body;
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const token = crypto.randomBytes(16).toString('hex');
    project.invitedUsers.push({ email, team, invitationToken: token });
    await project.save();

    // Send invitation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Invitation to join project',
      text: `You have been invited to join the ${team} team in project ${project.name}. Register here: http://localhost:3000/register/${token}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Invitation sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createProject, inviteUser };
