    import Task from '../models/task.model.js';
    import multer from 'multer';

    const storage = multer.memoryStorage(); // Store files in memory temporarily
const upload = multer({ storage: storage });

// Create a new task
export const createTask = async (req, res) => {
      // First, ensure that multer has successfully handled the file uploads before proceeding
      upload.fields([{ name: 'image', maxCount: 1 }])(req, res, async (err) => {
        if (err) {
            console.error("Multer Error:", err);
            return res.status(400).json({ success: false, message: err.message });
        }

    const {
        userId,
        categoryId,
        subCategoryId,
        description,
        image,
        address,
        zipcode,
        estimatedTime,
        transportRequired,
        taskStartTime,
        taskEndTime,
        // wageType,
        // wage
    } = req.body;

    const imageFile = req.files["image"] ? req.files["image"][0].buffer : null;


    try {
        const newTask = new Task({
            userId,
            categoryId,
            subCategoryId,
            description,
            image : imageFile,
            address,
            zipcode,
            estimatedTime,
            transportRequired,
            taskStartTime,
            taskEndTime,
            // wageType,
            // wage
        });

        await newTask.save();
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
};
// Get all tasks
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get task by ID
export const getTaskById = async (req, res) => {
    const { taskId } = req.params;
    try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update task
export const updateTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedTask) return res.status(404).json({ success: false, message: 'Task not found' });
        res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete task
export const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) return res.status(404).json({ success: false, message: 'Task not found' });
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
