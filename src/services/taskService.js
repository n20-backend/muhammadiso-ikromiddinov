import { pool} from '../db/db.js';  

export const TaskService = {
  // Yangi task yaratish
  async createTask({ title, description, status, user_id }) {
    try {
      const result = await pool.query(
        'INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, description, status, user_id]
      );
      return result.rows[0]; 
    } catch (err) {
      throw new Error('Task yaratishda xatolik yuz berdi: ' + err.message);
    }
  },

  // Barcha tasklarni olish
  async getAllTasks() {
    try {
      const result = await pool.query('SELECT * FROM tasks');
      return result.rows;  
    } catch (err) {
      throw new Error('Tasklarni olishda xatolik yuz berdi: ' + err.message);
    }
  },

  // Taskni ID bo'yicha olish
  async getTaskById(id) {
    try {
      const result = await pool.query('SELECT * FROM tasks WHERE task_id = $1', [id]);
      if (result.rows.length === 0) {
        throw new Error('Taskni topishda xatolik: Taskning IDsi mavjud emas');
      }
      return result.rows[0];  
    } catch (err) {
      throw new Error('Taskni olishda xatolik: ' + err.message);
    }
  },

  // Taskni yangilash
  async updateTask(id, { title, description, status }) {
    try {
      const result = await pool.query(
        'UPDATE tasks SET title = $1, description = $2, status = $3 WHERE task_id = $4 RETURNING *',
        [title, description, status, id]
      );
      if (result.rows.length === 0) {
        throw new Error('Taskni yangilashda xatolik: Taskni topa olmadik');
      }
      return result.rows[0];  
    } catch (err) {
      throw new Error('Taskni yangilashda xatolik: ' + err.message);
    }
  },

  // Taskni o'chirish
  async deleteTask(id) {
    try {
      const result = await pool.query(
        'DELETE FROM tasks WHERE task_id = $1 RETURNING *',
        [id]
      );
      if (result.rows.length === 0) {
        throw new Error('Taskni o\'chirishda xatolik: Taskni topa olmadik');
      }
      return result.rows[0];  
    } catch (err) {
      throw new Error('Taskni o\'chirishda xatolik: ' + err.message);
    }
  }
};



//allskda