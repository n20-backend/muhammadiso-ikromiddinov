import db from '../db/db.js'; 

const TaskModel = {
  // Yangi task yaratish
  async create({ title, description, status, user_id }) {
    const result = await db.query(
      `INSERT INTO Task (title, description, status, user_id, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING *`,
      [title, description, status, user_id]
    );
    return result.rows[0];
  },

  // Barcha tasklarni olish
  async getAll() {
    const result = await db.query('SELECT * FROM Task ORDER BY created_at DESC');
    return result.rows;
  },

  // ID bo'yicha taskni olish
  async getById(id) {
    const result = await db.query('SELECT * FROM Task WHERE id = $1', [id]);
    return result.rows[0];
  },

  // Taskni yangilash
  async update(id, { title, description, status }) {
    const result = await db.query(
      `UPDATE Task SET title = $1, description = $2, status = $3, updated_at = NOW()
       WHERE id = $4 RETURNING *`,
      [title, description, status, id]
    );
    return result.rows[0];
  },

  // Taskni o'chirish
  async delete(id) {
    const result = await db.query('DELETE FROM Task WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

export default TaskModel; // ES Module formatida export
