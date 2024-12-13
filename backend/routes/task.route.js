import express from 'express';
import {
    createTask,
    getAllTasks,
    getTaskByUserId,
    updateTask,
    deleteTask,
    getTaskByTaskId,
<<<<<<< HEAD
    updateTaskStatus
=======
>>>>>>> e07a4a33bc1fa7cc23b91d97ebf027051956e03e
} from '../controllers/task.controller.js';

const router = express.Router();

// **POST /api/task**
router.post('/task', createTask); // Create a new task (used by a normal user to post a task)

// **GET /api/tasks**
router.get('/tasks', getAllTasks); // Get a list of all tasks (viewable by all service providers)

// **GET /api/task/:userId**
router.get('/task/:userId', getTaskByUserId); // Get details of a specific task by its User ID

// **PUT /api/task/:taskId**
<<<<<<< HEAD
router.post('/task/updateTask/:taskId', updateTask); // Update details of a specific task by its ID
=======
router.post('/task/:taskId', updateTask); // Update details of a specific task by its ID
>>>>>>> cef346812dc0d22288b38fe771a13e84325dde2e

// **DELETE /api/task/:taskId**
router.delete('/task/:taskId', deleteTask); // Delete a task by its ID

<<<<<<< HEAD
router.get('/tasks/:taskId', getTaskByTaskId)

// Update task status
router.patch('/tasks/:taskId/status', updateTaskStatus);

=======
router.get('/tasks/:taskId', getTaskByTaskId);
     
>>>>>>> e07a4a33bc1fa7cc23b91d97ebf027051956e03e
export default router;
