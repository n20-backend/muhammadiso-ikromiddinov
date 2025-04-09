import * as projectService from '../services/ProjectService.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Projectlarni olishda xatolik yuz berdi' });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: 'Project yaratilmadi' });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project topilmadi' });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server xatolik' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    if (!project) return res.status(404).json({ error: 'Project topilmadi' });
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: 'Project yangilanmadi' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await projectService.deleteProject(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project topilmadi' });
    res.json({ message: 'Project o‘chirildi' });
  } catch (err) {
    res.status(500).json({ error: 'Project o‘chirilmadi' });
  }
};
