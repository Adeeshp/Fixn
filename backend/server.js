import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from "./routes/user.route.js";
import categoryRoutes from "./routes/category.route.js";
import subCategoryRoutes from "./routes/subCategory.route.js";
// import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
app.use(express.json());


app.use("/api", userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subCategoryRoutes); 

// Get all categories API
app.get("/category", async (req, res) => {
    try {
        // Fetch all categories
        const categories = await Category.find();

        // If no categories are found, send a message
        if (!categories || categories.length === 0) {
            return res.status(404).json({ success: false, message: "No categories found" });
        }

        // Return categories data
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});


// Get all subcategories for a specific category
app.get("/category/:categoryId/subcategory", async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Fetch all subcategories linked to the categoryId
        const subcategories = await SubCategory.find({ categoryId });

        if (!subcategories || subcategories.length === 0) {
            return res.status(404).json({ success: false, message: "No subcategories found for this category" });
        }

        res.status(200).json({
            success: true,
            data: subcategories
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
