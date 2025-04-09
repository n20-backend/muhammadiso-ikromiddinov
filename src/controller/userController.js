import * as userservices from "../services/userService.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await userservices.getAllUsers();
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({ message: 'Xatolik yuz berdi' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await userservices.getUserById;
        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Foydalanuvchi topilmadi' });
    }
};
export const createUser = async (req, res) => {
    try {
        const {name, email} = req.body;
        const newUser = await userservices.createUser({ name, email });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Foydalanuvchi yaratishda xatolik yuz berdi' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const user = await userservices.updateUser(id, updatedData);
        if (!updatedUser) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Xatolik yuz berdi' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await userservices.deleteUser(req.params.id);
        if (!deleteUser) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }
        res.status(200).json({ message: 'Foydalanuvchi o\'chirildi' });
    } catch (error) {
        res.status(500).json({ message: 'Xatolik yuz berdi' });
    }
};