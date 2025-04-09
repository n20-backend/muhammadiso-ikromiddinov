import { pool } from '../db/db.js';  // PostgreSQL uchun db connection pool

const ProjectService = {
  // Loyihani yaratish
  async createProject({ name, description, user_id }) {
    try {
      const result = await pool.query(
        'INSERT INTO projects (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
        [name, description, user_id]
      );
      return result.rows[0];  // Yangi loyihani qaytaradi
    } catch (err) {
      throw new Error('Loyihani yaratishda xatolik yuz berdi: ' + err.message);
    }
  },

  // Barcha loyihalarni olish
  async getAllProjects() {
    try {
      const result = await pool.query('SELECT * FROM projects');
      return result.rows;  // Barcha loyihalarni qaytaradi
    } catch (err) {
      throw new Error('Loyihalarni olishda xatolik yuz berdi: ' + err.message);
    }
  },

  // Loyihani ID bo'yicha olish
  async getProjectById(id) {
    try {
      const result = await pool.query('SELECT * FROM projects WHERE project_id = $1', [id]);
      if (result.rows.length === 0) {
        throw new Error('Loyihani topishda xatolik: Loyihaning IDsi mavjud emas');
      }
      return result.rows[0];  // Loyihani qaytaradi
    } catch (err) {
      throw new Error('Loyihani olishda xatolik: ' + err.message);
    }
  },

  // Loyihani yangilash
  async updateProject(id, { name, description }) {
    try {
      const result = await pool.query(
        'UPDATE projects SET name = $1, description = $2 WHERE project_id = $3 RETURNING *',
        [name, description, id]
      );
      if (result.rows.length === 0) {
        throw new Error('Loyihani yangilashda xatolik: Loyihani topa olmadik');
      }
      return result.rows[0];  // Yangilangan loyihani qaytaradi
    } catch (err) {
      throw new Error('Loyihani yangilashda xatolik: ' + err.message);
    }
  },

  // Loyihani o'chirish
  async deleteProject(id) {
    try {
      const result = await pool.query(
        'DELETE FROM projects WHERE project_id = $1 RETURNING *',
        [id]
      );
      if (result.rows.length === 0) {
        throw new Error('Loyihani o\'chirishda xatolik: Loyihani topa olmadik');
      }
      return result.rows[0];  // O\'chirilgan loyihani qaytaradi
    } catch (err) {
      throw new Error('Loyihani o\'chirishda xatolik: ' + err.message);
    }
  }
};

export default ProjectService;
