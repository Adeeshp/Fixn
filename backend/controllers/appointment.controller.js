import Appointment from '../models/appointment.model.js';
import Task from '../models/task.model.js';

import Appointment from '../models/appointment.model.js';
import Request from '../models/request.model.js';
import Task from '../models/task.model.js';

// Create a new appointment and reject other requests
export const createAppointment = async (req, res) => {
    try {
        const { taskId, serviceProviderId, appointmentDate, appointmentTime } = req.body;

        // Validate the request body
        if (!taskId || !serviceProviderId || !appointmentDate || !appointmentTime) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check if the task exists
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found." });
        }

        // Create the appointment entry
        const appointment = new Appointment({
            taskId,
            serviceProviderId,
            appointmentDate,
            appointmentTime,
        });
        await appointment.save();

        // Update the accepted request status to "Accepted"
        await Request.updateOne(
            { taskId, userId: serviceProviderId },
            { requested_Status: "Accepted" }
        );

        // Reject all other requests for the same task
        await Request.updateMany(
            { taskId, userId: { $ne: serviceProviderId } },
            { requested_Status: "Rejected" }
        );

        res.status(201).json({ success: true, message: "Appointment created successfully.", data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};


// Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('taskId');
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get appointment by ID
export const getAppointmentById = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findById(appointmentId).populate('taskId');
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update appointment
export const updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { appointmentDate, appointmentTime } = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { appointmentDate, appointmentTime },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updatedAppointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    await Appointment.findByIdAndDelete(appointmentId);
    res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
