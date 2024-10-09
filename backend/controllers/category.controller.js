import Category from '../models/category.model.js';

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ success: false, message: "No categories found" });
        }

        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { categoryName, imageURL } = req.body;

        // Check if category already exists
        let category = await Category.findOne({ categoryName });
        if (category) {
            return res.status(400).json({ success: false, message: "Category already exists" });
        }

        // Create new category
        category = new Category({
            categoryName,
            imageURL
        });

        // Save the category
        await category.save();

        res.status(201).json({ success: true, message: "Category created successfully", data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// Update a category by ID
export const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const updateFields = req.body; 

        // Find the category by ID and update with the new fields
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { $set: updateFields }, 
            { new: true, runValidators: true } 
        );

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.status(200).json({ success: true, message: "Category updated successfully", data: updatedCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};


// Delete a category by ID
export const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Find and delete the category by its ID
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};