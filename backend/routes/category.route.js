import express from 'express';
import { getAllCategories, createCategory, deleteCategory, updateCategory } from '../controllers/category.controller.js';

const router = express.Router();

// /api/category
router.get('/category', getAllCategories); // Get all categories

// /api/category
router.post('/category', createCategory); // Create a new category

// /api/category/:categoryId
router.delete('/category/:categoryId', deleteCategory); // Delete a category by ID

// /api/category/:categoryId
router.put('/category/:categoryId', updateCategory); // Update a category by ID

// /api/category/:categoryId
router.put('/category/:categoryId', updateCategory); // Update a category by ID

export default router;