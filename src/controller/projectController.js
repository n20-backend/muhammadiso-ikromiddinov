import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Xatolik yuz berdi' });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: 'Project yaratilmadi' });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project topilmadi' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Xatolik' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) return res.status(404).json({ error: 'Project topilmadi' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: 'Project yangilanmadi' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project topilmadi' });
    res.json({ message: 'Project o\'chirildi' });
  } catch (err) {
    res.status(500).json({ error: 'Xatolik yuz berdi' });
  }
};
