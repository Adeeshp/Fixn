import express from 'express';
import {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
} from '../controllers/appointment.controller.js';

const router = express.Router();

// **POST /api/appointment**
router.post('/appointment', createAppointment);  // Create a new appointment

// **GET /api/appointments**
router.get('/appointments', getAllAppointments); // Get a list of all appointments

// **GET /api/appointment/:appointmentId**
router.get('/appointment/:appointmentId', getAppointmentById); // Get a specific appointment by ID

// **PUT /api/appointment/:appointmentId**
router.put('/appointment/:appointmentId', updateAppointment); // Update an existing appointment by ID

// **DELETE /api/appointment/:appointmentId**
router.delete('/appointment/:appointmentId', deleteAppointment); // Delete an appointment by ID

export default router;
