

export const createTask = async (req, res) => {
    try {
        const project = new Task(req.body);
        await project.save();
        res.status(201).json({ message: 'Muvaffaqiyatli yaratildi' });
    } catch (error) {
        res.status(400).json({ message: 'Xatolik yuz berdi' });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const projects = await Task.findAll();
        res.json(projects)
    } catch (error) {
        res.status(500).json({ error: 'Hatolik yuz berdi' })
    }
};

export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Vazifa topilmadi' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Hatolik yuz berdi' })
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const Task = await Task.findById(id);
        if (!Task) {
            return res.status(404).json({ message: 'Vazifa topilmadi' });
        }
        await project.update(req.body);
        res.json({ message: 'Muvaffaqiyatli yangilandi' });
    } catch (error) {
        res.status(500).json({ error: 'Hatolik yuz berdi' })
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Vazifa topilmadi' });
        }
        await task.remove();
        res.json({ message: 'Muvaffaqiyatli o\'chirildi' });
    } catch (error) {
        res.status(500).json({ error: 'Hatolik yuz berdi' })
    }
};

