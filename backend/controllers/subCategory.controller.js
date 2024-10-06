import SubCategory from '../models/subCategory.model.js';
import Category from '../models/category.model.js';

// Get all subcategories for a specific category
export const getSubcategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const subcategories = await SubCategory.find({ categoryId });

        if (!subcategories || subcategories.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No subcategories available for this category",
                data: []
            });
        }

        res.status(200).json({
            success: true,
            data: subcategories
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// Create a new subcategory under a category
export const createSubcategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { subCategoryName } = req.body;

        // Check if the category exists
        const category = await Category.findOne({ categoryId });
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // Create a new subcategory
        const newSubCategory = new SubCategory({
            subCategoryName,
            categoryId
        });

        // Save the subcategory
        await newSubCategory.save();

        res.status(201).json({ success: true, message: "Subcategory created successfully", data: newSubCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// Delete a subcategory by ID
export const deleteSubcategory = async (req, res) => {
    try {
        const { subCategoryId } = req.params;

        // Find and delete the subcategory by its ID
        const subCategory = await SubCategory.findOneAndDelete({ subCategoryId });
        if (!subCategory) {
            return res.status(404).json({ success: false, message: "Subcategory not found" });
        }

        res.status(200).json({ success: true, message: "Subcategory deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
