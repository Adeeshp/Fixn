import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from "./routes/user.route.js";
import categoryRoutes from "./routes/category.route.js";
import subCategoryRoutes from "./routes/subCategory.route.js";
import taskRoutes from "./routes/task.route.js";

import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
app.use(express.json());


app.use("/api", userRoutes, categoryRoutes, subCategoryRoutes, taskRoutes);
// app.use('/api', categoryRoutes);
// app.use('/api', subCategoryRoutes); 
// app.use("/api", taskRoutes);


// Get all categories API
// app.get("/category", async (req, res) => {
//     try {
//         const categories = await Category.find();

//         if (!categories || categories.length === 0) {
//             return res.status(404).json({ success: false, message: "No categories found" });
//         }

//         res.status(200).json({
//             success: true,
//             data: categories
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server error", error });
//     }
// });

// app.post("/category", async (req, res) => {
//     try {
//         const { categoryName, imageURL } = req.body;

//         // Check if category already exists
//         let category = await Category.findOne({ categoryName });
//         if (category) {
//             return res.status(400).json({ success: false, message: "Category already exists" });
//         }

//         // Create new category
//         category = new Category({
//             categoryName,
//             imageURL
//         });

//         // Save the category
//         await category.save();

//         res.status(201).json({ success: true, message: "Category created successfully", data: category });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server error", error });
//     }
// });

// // Delete a category by ID
// app.delete("/category/:categoryId", async (req, res) => {
//     try {
//         const { categoryId } = req.params;

//         // Find and delete the category by its ID
//         const category = await Category.findOneAndDelete({ categoryId });
//         if (!category) {
//             return res.status(404).json({ success: false, message: "Category not found" });
//         }

//         res.status(200).json({ success: true, message: "Category deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server error", error });
//     }
// }); 

// // Get all subcategories for a specific category
// app.get("/category/:categoryId/subcategory", async (req, res) => {
//     try {
//         const { categoryId } = req.params;

//         const subcategories = await SubCategory.find({ categoryId });

//         if (!subcategories) {
//             return res.status(404).json({ success: false, message: "No subcategories found for this category" });
//         } else if( subcategories.length === 0) {
//             return res.status(200).json({ success: true, message: "No subcategories is there for this category", data: [] });

//         }

//         res.status(200).json({
//             success: true,
//             data: subcategories
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server error", error });
//     }
// });

// app.post("/category/:categoryId/subcategory", async (req, res) => {
//     try {
//         const { categoryId } = req.params;
//         const { subCategoryName } = req.body;

//         // Check if category exists
//         const category = await Category.findOne({ categoryId });
//         if (!category) {
//             return res.status(404).json({ success: false, message: "Category not found" });
//         }

//         // Create new subcategory
//         const newSubCategory = new SubCategory({
//             subCategoryName,
//             categoryId
//         });

//         // Save the subcategory
//         await newSubCategory.save();

//         res.status(201).json({ success: true, message: "Subcategory created successfully", data: newSubCategory });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server error", error });
//     }
// });

// // Delete a subcategory by ID
// app.delete("/subcategory/:subCategoryId", async (req, res) => {
//     try {
//         const { subCategoryId } = req.params;

//         // Find and delete the subcategory by its ID
//         const subCategory = await SubCategory.findOneAndDelete({ subCategoryId });
//         if (!subCategory) {
//             return res.status(404).json({ success: false, message: "Subcategory not found" });
//         }

//         res.status(200).json({ success: true, message: "Subcategory deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server error", error });
//     }
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
