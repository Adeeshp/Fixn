import express from 'express';
import { getSubcategoriesByCategory, createSubcategory, deleteSubcategory, getSubcategoryById } from '../controllers/subCategory.controller.js';

const router = express.Router();

// Get all subcategories for a specific category
// /api/subcategory/:categoryId
router.get('/subCategory/:categoryId', getSubcategoriesByCategory);

// Create a new subcategory
// same
router.post('/subCategory/:categoryId', createSubcategory);

// Delete a subcategory by its ID
// /api/subcategory/:subCategoryId
router.delete('/subcategory/:subCategoryId', deleteSubcategory);

// /api/subcategory/:subCategoryId
router.get('/sub_category/:subCategoryId', getSubcategoryById);



export default router;
