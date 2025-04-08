import db from '../db/db.js';

const ProjectModel = {
  // Loyihani yaratish
  async create({ name, description, user_id }) {
    const result = await db.query(
      `INSERT INTO Project (name, description, user_id, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW())
       RETURNING *`,
      [name, description, user_id]
    );
    return result.rows[0];
  },

  // Barcha loyihalarni olish
  async getAll() {
    const result = await db.query('SELECT * FROM Project ORDER BY created_at DESC');
    return result.rows;
  },

  // Loyihani ID bo'yicha olish
  async getById(id) {
    const result = await db.query('SELECT * FROM Project WHERE id = $1', [id]);
    return result.rows[0];
  },

  // Loyihani yangilash
  async update(id, { name, description }) {
    const result = await db.query(
      `UPDATE Project SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *`,
      [name, description, id]
    );
    return result.rows[0];
  },

  // Loyihani o'chirish
  async delete(id) {
    const result = await db.query('DELETE FROM Project WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

export default ProjectModel; // ES Module formatida export
