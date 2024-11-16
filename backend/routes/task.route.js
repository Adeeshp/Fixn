import express from 'express';
import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} from '../controllers/task.controller.js';

const router = express.Router();

// **POST /api/task**
router.post('/task', createTask); // Create a new task (used by a normal user to post a task)

// **GET /api/tasks**
router.get('/tasks', getAllTasks); // Get a list of all tasks (viewable by all service providers)

// **GET /api/task/:taskId**
router.get('/task/:taskId', getTaskById); // Get details of a specific task by its ID

// **PUT /api/task/:taskId**
router.put('/task/:taskId', updateTask); // Update details of a specific task by its ID

// **DELETE /api/task/:taskId**
router.delete('/task/:taskId', deleteTask); // Delete a task by its ID

export default router;
