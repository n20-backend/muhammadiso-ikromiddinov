import { Router } from 'express';
import * as taskController from '../controller/taskController.js';

const taskrouter = Router();

taskrouter.post('/', taskController.createTask);
taskrouter.get('/', taskController.getAllTasks);
taskrouter.get('/:id', taskController.getTaskByOne)
taskrouter.put('/:id', taskController.updateTask);
taskrouter.delete('/:id', taskController.deleteTask);

export default taskrouter;