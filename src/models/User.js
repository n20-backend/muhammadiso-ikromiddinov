import express from 'express';
import connection from '../db.js'; 

const router = express.Router();

// Foydalanuvchi qo'shish (Create)
router.post('/', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    connection.query(query, [name, email], (err, results) => {
        if (err) {
            console.error('Foydalanuvchi qo\'shishda xatolik:', err);
            return res.status(500).json({ message: 'Xatolik yuz berdi' });
        }
        res.status(201).json({ message: 'Foydalanuvchi qo\'shildi', id: results.insertId });
    });
});

// Foydalanuvchilarni o'qish (Read)
router.get('/', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Foydalanuvchilarni olishda xatolik:', err);
            return res.status(500).json({ message: 'Xatolik yuz berdi' });
        }
        res.status(200).json(results);
    });
});

// Foydalanuvchini yangilash (Update)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    connection.query(query, [name, email, id], (err, results) => {
        if (err) {
            console.error('Foydalanuvchi yangilashda xatolik:', err);
            return res.status(500).json({ message: 'Xatolik yuz berdi' });
        }
        res.status(200).json({ message: 'Foydalanuvchi yangilandi', affectedRows: results.affectedRows });
    });
});

// Foydalanuvchini o'chirish (Delete)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Foydalanuvchi o\'chirishda xatolik:', err);
            return res.status(500).json({ message: 'Xatolik yuz berdi' });
        }
        res.status(200).json({ message: 'Foydalanuvchi o\'chirildi', affectedRows: results.affectedRows });
    });
});

export default router;