import express from 'express';
import {
    createReceipt,
    getAllReceipts,
    getReceiptById,
    deleteReceipt
} from '../controllers/receipt.controller.js';

const router = express.Router();

// **POST /api/receipt**
router.post('/receipt', createReceipt); // Create a new receipt

// **GET /api/receipts**
router.get('/receipts', getAllReceipts);  // Get all receipts

// **GET /api/receipt/:receiptId**
router.get('/receipt/:receiptId', getReceiptById); // Get a specific receipt by ID

// **DELETE /api/receipt/:receiptId**
router.delete('/receipt/:receiptId', deleteReceipt); // Delete a receipt by ID

export default router;
