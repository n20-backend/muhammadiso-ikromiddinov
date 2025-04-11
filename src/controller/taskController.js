import * as taskService from '../services/taskServices.js';

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Tasklarni olishda xatolik yuz berdi' });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Task yaratishda xatolik' });
  }
};

export const getTaskByOne = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task topilmadi' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Task olishda server xatoligi' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) {
      return res.status(404).json({ error: 'Task topilmadi' });
    }
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: 'Task yangilanmadi' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task topilmadi' });
    }
    res.json({ message: 'Task o‘chirildi' });
  } catch (err) {
    res.status(500).json({ error: 'Task o‘chirilmadi' });
  }
};
