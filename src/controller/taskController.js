import task from '../models/Task.js';
import taskrouter  from '../routes/TasksRouter.js';

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Task yo`q' });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = new task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Task yaratilmadi' });
  }
};

export const getTaskByOne = async (req, res) => {
  try {
    const task = await task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task topilmadi' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ error: 'Task topilmadi' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: 'Yangilanmadi' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task topilmadi' });
    res.json({ message: 'Task o`chirildi' });
  } catch (err) {
    res.status(500).json({ error: 'Task o`chirilmadi' });
  }
};
