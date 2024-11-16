import Request from '../models/request.model.js';
import Task from '../models/task.model.js';

// Create a new request by Service Provider
export const createRequest = async (req, res) => {
  const { taskId, userId, wageType, wage } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    const newRequest = new Request({
      taskId,
      userId,
      wageType,
      wage,
    });

    await newRequest.save();
    res.status(201).json({ success: true, data: newRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('taskId').populate('userId');
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get request by ID
export const getRequestById = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await Request.findById(requestId).populate('taskId').populate('userId');
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update request status (Accept or Reject)
export const updateRequestStatus = async (req, res) => {
  const { requestId } = req.params;
  const { requested_Status } = req.body;

  if (!['Accepted', 'Rejected'].includes(requested_Status)) {
    return res.status(400).json({ success: false, message: 'Invalid status update' });
  }

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { requested_Status },
      { new: true, runValidators: true }
    );
    if (!updatedRequest) return res.status(404).json({ success: false, message: 'Request not found' });

    res.status(200).json({ success: true, data: updatedRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a request
export const deleteRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const deletedRequest = await Request.findByIdAndDelete(requestId);
    if (!deletedRequest) return res.status(404).json({ success: false, message: 'Request not found' });

    res.status(200).json({ success: true, message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
