import express from 'express';
import { getAllCategories, createCategory, deleteCategory } from '../controllers/category.controller.js';

const router = express.Router();

// Get all categories
// /api/category
router.get('/category', getAllCategories);

// Create a new category
// /api/category
router.post('/category', createCategory);

// Delete a category by ID
// /api/category/:categoryId
router.delete('/category/:categoryId', deleteCategory);

export default router;
