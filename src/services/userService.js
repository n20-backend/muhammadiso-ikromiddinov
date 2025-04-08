import UserModel from '../models/User.js';

const UserService = {
  // Yangi foydalanuvchi yaratish
  async createUser({ name, email }) {
    try {
      const newUser = await UserModel.create({ name, email });
      return newUser;
    } catch (err) {
      throw new Error('Foydalanuvchi yaratishda xatolik yuz berdi: ' + err.message);
    }
  },

  // Barcha foydalanuvchilarni olish
  async getAllUsers() {
    try {
      const users = await UserModel.getAll();
      return users;
    } catch (err) {
      throw new Error('Foydalanuvchilarni olishda xatolik yuz berdi: ' + err.message);
    }
  },

  // Foydalanuvchini ID bo'yicha olish
  async getUserById(id) {
    try {
      const user = await UserModel.getById(id);
      if (!user) {
        throw new Error('Foydalanuvchi topilmadi: ID bo\'yicha foydalanuvchi mavjud emas');
      }
      return user;
    } catch (err) {
      throw new Error('Foydalanuvchini olishda xatolik: ' + err.message);
    }
  },

  // Foydalanuvchini yangilash
  async updateUser(id, { name, email }) {
    try {
      const updatedUser = await UserModel.update(id, { name, email });
      if (!updatedUser) {
        throw new Error('Foydalanuvchini yangilashda xatolik: Foydalanuvchi topilmadi');
      }
      return updatedUser;
    } catch (err) {
      throw new Error('Foydalanuvchini yangilashda xatolik: ' + err.message);
    }
  },

  // Foydalanuvchini o\'chirish
  async deleteUser(id) {
    try {
      const deletedUser = await UserModel.delete(id);
      if (!deletedUser) {
        throw new Error('Foydalanuvchini o\'chirishda xatolik: Foydalanuvchi topilmadi');
      }
      return deletedUser;
    } catch (err) {
      throw new Error('Foydalanuvchini o\'chirishda xatolik: ' + err.message);
    }
  }
};

export default UserService;
