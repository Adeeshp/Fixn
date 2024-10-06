import express from 'express';
import { getSubcategoriesByCategory, createSubcategory, deleteSubcategory } from '../controllers/subCategory.controller.js';

const router = express.Router();

// Get all subcategories for a specific category
router.get('/category/:categoryId/subcategory', getSubcategoriesByCategory);

// Create a new subcategory
router.post('/category/:categoryId/subcategory', createSubcategory);

// Delete a subcategory by its ID
router.delete('/subcategory/:subCategoryId', deleteSubcategory);

export default router;
