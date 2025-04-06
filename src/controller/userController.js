import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({ message: 'Xatolik yuz berdi' });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await user.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Foydalanuvchi topilmadi' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await user.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }
        res.status(200).json({ message: 'Foydalanuvchi o\'chirildi' });
    } catch (error) {
        res.status(500).json({ message: 'Xatolik yuz berdi' });
    }
};