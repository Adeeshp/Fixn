import express from 'express';
import { getSubcategoriesByCategory, createSubcategory, deleteSubcategory } from '../controllers/subCategory.controller.js';

const router = express.Router();

// Get all subcategories for a specific category
// /api/subcategory/:categoryId
router.get('/category/:categoryId', getSubcategoriesByCategory);

// Create a new subcategory
// same
router.post('/category/:categoryId', createSubcategory);

// Delete a subcategory by its ID
// /api/subcategory/:subCategoryId
router.delete('/subcategory/:subCategoryId', deleteSubcategory);

export default router;
