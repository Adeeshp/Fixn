import express from 'express';
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
  deleteRequest,
} from '../controllers/request.controller.js';

const router = express.Router();

// **POST /api/request**
router.post('/request', createRequest); // Create a new request (used by service providers to request a task)

// **GET /api/requests**
router.get('/requests', getAllRequests); // Get a list of all requests (for admin or service provider view)

// **GET /api/request/:requestId**
router.get('/request/:requestId', getRequestById); // Get a specific request by ID

// **PUT /api/request/:requestId/status**
router.put('/request/:requestId/status', updateRequestStatus); // Update the status of a specific request (e.g., Accept, Reject)

// **DELETE /api/request/:requestId**
router.delete('/request/:requestId', deleteRequest); // Delete a request by ID

export default router;
