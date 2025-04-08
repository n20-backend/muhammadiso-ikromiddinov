import ProjectModel from '../models/Project.js';

const ProjectService = {
  // Loyihani yaratish
  async createProject({ name, description, user_id }) {
    try {
      const newProject = await ProjectModel.create({ name, description, user_id });
      return newProject;
    } catch (err) {
      throw new Error('Loyihani yaratishda xatolik yuz berdi: ' + err.message);
    }
  },

  // Barcha loyihalarni olish
  async getAllProjects() {
    try {
      const projects = await ProjectModel.getAll();
      return projects;
    } catch (err) {
      throw new Error('Loyihalarni olishda xatolik yuz berdi: ' + err.message);
    }
  },

  // Loyihani ID bo'yicha olish
  async getProjectById(id) {
    try {
      const project = await ProjectModel.getById(id);
      if (!project) {
        throw new Error('Loyihani topishda xatolik: Loyihaning IDsi mavjud emas');
      }
      return project;
    } catch (err) {
      throw new Error('Loyihani olishda xatolik: ' + err.message);
    }
  },

  // Loyihani yangilash
  async updateProject(id, { name, description }) {
    try {
      const updatedProject = await ProjectModel.update(id, { name, description });
      if (!updatedProject) {
        throw new Error('Loyihani yangilashda xatolik: Loyihani topa olmadik');
      }
      return updatedProject;
    } catch (err) {
      throw new Error('Loyihani yangilashda xatolik: ' + err.message);
    }
  },

  // Loyihani o'chirish
  async deleteProject(id) {
    try {
      const deletedProject = await ProjectModel.delete(id);
      if (!deletedProject) {
        throw new Error('Loyihani o\'chirishda xatolik: Loyihani topa olmadik');
      }
      return deletedProject;
    } catch (err) {
      throw new Error('Loyihani o\'chirishda xatolik: ' + err.message);
    }
  }
};

export default ProjectService;
