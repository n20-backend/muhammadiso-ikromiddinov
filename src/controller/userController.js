import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({ message: 'Xatolik yuz berdi' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await user.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Foydalanuvchi topilmadi' });
    }
};
export const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Foydalanuvchi yaratishda xatolik yuz berdi' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Xatolik yuz berdi' });
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