import Receipt from '../models/receipt.model.js';
import Task from '../models/task.model.js';

// Create a new receipt
export const createReceipt = async (req, res) => {
  const { taskId, taxAmount, total, finalAmount, description } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    const newReceipt = new Receipt({
      taskId,
      taxAmount,
      total,
      finalAmount,
      description,
    });

    await newReceipt.save();
    res.status(201).json({ success: true, data: newReceipt });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all receipts
export const getAllReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find().populate('taskId');
    res.status(200).json({ success: true, data: receipts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get receipt by ID
export const getReceiptById = async (req, res) => {
  const { receiptId } = req.params;

  try {
    const receipt = await Receipt.findById(receiptId).populate('taskId');
    if (!receipt) return res.status(404).json({ success: false, message: 'Receipt not found' });

    res.status(200).json({ success: true, data: receipt });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete receipt
export const deleteReceipt = async (req, res) => {
  const { receiptId } = req.params;

  try {
    await Receipt.findByIdAndDelete(receiptId);
    res.status(200).json({ success: true, message: 'Receipt deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
