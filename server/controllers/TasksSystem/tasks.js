const Task = require('../../models/tasks');
const User = require('../../models/user');

// Create a new task
const createTask = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized - Bearer token not found' });
    }

    const permtoken = authHeader.split(' ')[1]; // Extract 'permtoken' from the Authorization header
    
    const user = await User.findOne({ permtoken });

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ status: 'success', data: task });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

// Retrieve all tasks
const getAllTasks = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized - Bearer token not found' });
    }

    const permtoken = authHeader.split(' ')[1]; // Extract 'permtoken' from the Authorization header
    
    const user = await User.findOne({ permtoken });

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const tasks = await Task.find();
    res.status(200).json({ status: 'success', data: tasks });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Retrieve a single task by ID
const getTaskById = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized - Bearer token not found' });
    }

    const permtoken = authHeader.split(' ')[1]; // Extract 'permtoken' from the Authorization header
    
    const user = await User.findOne({ permtoken });

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }
    res.status(200).json({ status: 'success', data: task });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized - Bearer token not found' });
    }

    const permtoken = authHeader.split(' ')[1]; // Extract 'permtoken' from the Authorization header
    
    const user = await User.findOne({ permtoken });

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }
    res.status(200).json({ status: 'success', data: task });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized - Bearer token not found' });
    }

    const permtoken = authHeader.split(' ')[1]; // Extract 'permtoken' from the Authorization header
    
    const user = await User.findOne({ permtoken });

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }
    res.status(200).json({ status: 'success', message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
