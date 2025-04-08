import user from '../models/User.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Bunday foydalanuvchi mavjud' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new user({
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: 'Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tdi' });
    } catch (error) {
        res.status(500).json({ message: 'Xatolik yuz berdi' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await user.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Email yoki parol xato' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email yoki parol xato' });
        };

        res.json({ message: 'Muvaffaqiyatli tizimga kirdingiz' });
    } catch (error) {
        res.status(500).json({ message: 'Xatolik yuz berdi' });
    }
};