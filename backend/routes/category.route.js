import express from 'express';
import { getAllCategories, createCategory, deleteCategory } from '../controllers/category.controller.js';

const router = express.Router();

// Get all categories
router.get('/', getAllCategories);

// Create a new category
router.post('/', createCategory);

// Delete a category by ID
router.delete('/:categoryId', deleteCategory);

export default router;
