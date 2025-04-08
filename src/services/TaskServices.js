import TaskModel from '../models/Task.js';

const TaskService = {
  // Yangi task yaratish
  async createTask({ title, description, status, user_id }) {
    try {
      const newTask = await TaskModel.create({ title, description, status, user_id });
      return newTask;
    } catch (err) {
      throw new Error('Task yaratishda xatolik yuz berdi: ' + err.message);
    }
  },

  // Barcha tasklarni olish
  async getAllTasks() {
    try {
      const tasks = await TaskModel.getAll();
      return tasks;
    } catch (err) {
      throw new Error('Tasklarni olishda xatolik yuz berdi: ' + err.message);
    }
  },

  // Taskni ID bo'yicha olish
  async getTaskById(id) {
    try {
      const task = await TaskModel.getById(id);
      if (!task) {
        throw new Error('Taskni topishda xatolik: Taskning IDsi mavjud emas');
      }
      return task;
    } catch (err) {
      throw new Error('Taskni olishda xatolik: ' + err.message);
    }
  },

  // Taskni yangilash
  async updateTask(id, { title, description, status }) {
    try {
      const updatedTask = await TaskModel.update(id, { title, description, status });
      if (!updatedTask) {
        throw new Error('Taskni yangilashda xatolik: Taskni topa olmadik');
      }
      return updatedTask;
    } catch (err) {
      throw new Error('Taskni yangilashda xatolik: ' + err.message);
    }
  },

  // Taskni o'chirish
  async deleteTask(id) {
    try {
      const deletedTask = await TaskModel.delete(id);
      if (!deletedTask) {
        throw new Error('Taskni o\'chirishda xatolik: Taskni topa olmadik');
      }
      return deletedTask;
    } catch (err) {
      throw new Error('Taskni o\'chirishda xatolik: ' + err.message);
    }
  }
};

export default TaskService;
