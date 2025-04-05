import { Router } from 'express';
import {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
} from '../controller/taskController.js';

const taskrouter = Router();

taskrouter.post('/', createTask);
taskrouter.get('/', getAllTasks);
taskrouter.get('/:id', getTask);
taskrouter.put('/:id', updateTask);
taskrouter.delete('/:id', deleteTask);

export default taskrouter;