import User from '../models/User.js'; // `User` modelini import qilish
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Foydalanuvchi borligini tekshirish
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const existingUser = result.rows[0];

        if (existingUser) {
            return res.status(400).json({ message: 'Bunday foydalanuvchi mavjud' });
        }

        // Parolni xavfsiz tarzda saqlash
        const hashedPassword = await bcrypt.hash(password, 10);

        // Yangi foydalanuvchini yaratish
        const insertResult = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        );

        const newUser = insertResult.rows[0];
        res.status(201).json({ message: 'Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tdi', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Xatolik yuz berdi' });
    }
};

// Foydalanuvchi tizimga kirishi
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Foydalanuvchini email orqali topish
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Email yoki parol xato' });
        }

        // Parolni tekshirish
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email yoki parol xato' });
        }

        res.json({ message: 'Muvaffaqiyatli tizimga kirdingiz' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Xatolik yuz berdi' });
    }
};