import db from '../db/db.js'; 

const CommentModel = {
  async create({ text, task_id, user_id }) {
    const result = await db.query(
      `INSERT INTO Comment (text, task_id, user_id, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW())
       RETURNING *`,
      [text, task_id, user_id]
    );
    return result.rows[0];
  },

  async getAll() {
    const result = await db.query('SELECT * FROM Comment ORDER BY created_at DESC');
    return result.rows;
  },

  async getById(id) {
    const result = await db.query('SELECT * FROM Comment WHERE id = $1', [id]);
    return result.rows[0];
  },

  async update(id, { text }) {
    const result = await db.query(
      `UPDATE Comment SET text = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [text, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query('DELETE FROM Comment WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

export default CommentModel; // ES Module formatida export
