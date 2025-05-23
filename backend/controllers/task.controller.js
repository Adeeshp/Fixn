import Task from "../models/task.model.js";
import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory temporarily
const upload = multer({ storage: storage });

// Create a new task
export const createTask = async (req, res) => {
  // First, ensure that multer has successfully handled the file uploads before proceeding
  upload.fields([{ name: "image", maxCount: 1 }])(req, res, async (err) => {
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
      city,
      province,
      zipcode,
      estimatedTime,
      transportRequired,
      taskStartTime,
      taskEndTime,
    } = req.body;

    const imageFile = req.files["image"] ? req.files["image"][0].buffer : null;

    try {
      const newTask = new Task({
        userId,
        categoryId,
        subCategoryId,
        description,
        image: imageFile,
        address,
        city,
        province,
        country: "Canada",
        zipcode,
        estimatedTime,
        transportRequired,
        taskStartTime,
        taskEndTime,
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
    const tasks = await Task.find(); // Find all tasks
    const populatedTasks = await Task.populate(tasks, [
      { path: "userId" }, // Populate userId field
      { path: "categoryId" }, // Populate categoryId field
      { path: "subCategoryId" }, // Populate subCategoryId field
      {
        path: "requestId", // Populate requestId field
        populate: { path: "userId" }, // Also populate userId inside requestId
      },
      { path: "appointmentId" }, // Populate appointmentId field
      { path: "receiptId" }, // Populate receiptId field
      { path: "reviewId" }, // Populate reviewId field
    ]);

    console.log(populatedTasks); // Check the populated tasks

    res.status(200).json({ success: true, data: populatedTasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get task by UserID
export const getTaskByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await Task.find({ userId })
      .populate("userId") // Populate userId field
      .populate("categoryId") // Populate categoryId field
      .populate("subCategoryId") // Populate subCategoryId field
      .populate({
        path: "requestId", // Populate requestId field
        populate: {
          path: "userId",
          populate: {
            path: "reviewId", // Populate the reviewId field under userId
          },
        }, // Populate userId within requestId
      }) // Populate requestId field (which is now an array)
      .populate("appointmentId") // Populate appointmentId field
      .populate("receiptId") // Populate receiptId field
      .populate("reviewId");
    if (tasks.length === 0) {
      return res
        .status(200)
        .json({
          success: true,
          message: "No tasks found for this user",
          data: [],
        });
    }

    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTaskByTaskId = async (req, res) => {
  const { taskId } = req.params; // Extract taskId from the request parameters
  try {
    const task = await Task.findById(taskId)
      .populate("userId") // Populate userId field
      .populate("categoryId") // Populate categoryId field
      .populate("subCategoryId") // Populate subCategoryId field
      .populate({
        path: "requestId", // Populate requestId field
        populate: {
          path: "userId",
          populate: {
            path: "reviewId", // Populate the reviewId field under userId
          },
        }, // Populate userId within requestId
      }) // Populate requestId field (which is now an array)
      .populate("appointmentId") // Populate appointmentId field
      .populate("receiptId") // Populate receiptId field
      .populate("reviewId");

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        // Update the task with the provided fields from req.body
        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
            new: true, // Return the updated task
            runValidators: true, // Ensure validations are run for the updated fields
        });

        // If the task is not found
        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }

        // Return the updated task
        res.status(200).json({
            success: true,
            data: updatedTask,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update task status
export const updateTaskStatus = (req, res) => {
    upload.fields([])(req, res, async (err) => {
        if (err) {
            console.error("Multer Error:", err);
            return res.status(400).json({ success: false, message: err.message });
        }

        const { taskId } = req.params; // Extract taskId from the request parameters
        const { status } = req.body; // Extract status from the form-data

        if (!status) {
            return res.status(400).json({ success: false, message: "Status is required" });
        }

        try {
            // Find the task by ID and update its status
            const updatedTask = await Task.findByIdAndUpdate(
                taskId,
                { status },
                { new: true, runValidators: true } // Return the updated task and validate the input
            );

            if (!updatedTask) {
                return res.status(404).json({ success: false, message: "Task not found" });
            }

            res.status(200).json({ success: true, message: "Task status updated successfully", data: updatedTask });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
};


// Delete task
export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
