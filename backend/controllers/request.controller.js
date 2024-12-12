import Request from '../models/request.model.js';
import Task from '../models/task.model.js';
import Appointment from '../models/appointment.model.js';


// Create a new request by Service Provider
export const createRequest = async (req, res) => {
  const { taskId, userId, wageType, wage, requested_Status, description } = req.body;

  try {
    // Find the task by taskId
    const task = await Task.findById(taskId);
    console.log("Task found:", task);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Create a new request
    const newRequest = new Request({
      taskId,
      userId,
      wageType,
      wage,
      requested_Status,
      description
    });

    // Save the new request
    await newRequest.save();

    // Update the task to add the new requestId to the requests array using $addToSet
    await Task.updateOne(
      { _id: taskId },
      { $addToSet: { requestId: newRequest._id } } // This will add the requestId only if it doesn't already exist
    );

    // Send the response with the new request data
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

// User accepts a request
export const acceptRequest = async (req, res) => {
  const { requestId } = req.params;
  const { appointmentDate, appointmentTime } = req.body;

  try {
    // Find the request by ID
    const request = await Request.findById(requestId).populate('taskId').populate('userId');
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });

    // Check if the request has already been processed
    if (request.requested_Status !== 'Requested') {
      return res.status(400).json({ success: false, message: 'Request is already processed' });
    }

    // Update the status of the accepted request
    request.requested_Status = 'Accepted';
    await request.save();

    // Create an appointment entry
    const appointment = new Appointment({
      taskId: request.taskId,
      serviceProviderId: request.userId,
      appointmentDate,
      appointmentTime,
    });
    await appointment.save();

    // Reject all other requests for the same task
    await Request.updateMany(
      { taskId: request.taskId, _id: { $ne: requestId } },
      { requested_Status: 'Rejected' }
    );

    res.status(201).json({
      success: true,
      message: 'Request accepted and appointment created successfully',
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// User rejects a request
export const rejectRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await Request.findById(requestId);
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });

    // Update the request status to "Rejected"
    request.requested_Status = 'Rejected';
    await request.save();

    res.status(200).json({ success: true, message: 'Request rejected successfully' });
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

// Get request by Task ID
export const getRequestsByTaskId = async (req, res) => {
  const { taskId } = req.params; // Get the taskId from request parameters

  try {
    // Find all requests associated with the given taskId, populate user and task data
    const requests = await Request.find({ taskId })
      // .populate('taskId') // Populate task data
      .populate('userId'); // Populate user data


    if (requests.length === 0) {
      return res.status(404).json({ success: false, message: 'No requests found for this task' });
    }

    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
