import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import bcrypt from 'bcryptjs';
import User from './models/user.model.js';
import Category from './models/category.model.js'; 


dotenv.config();

const app = express();
app.use(express.json());

//Login API
app.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;

      // Check if user with given email exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ success: false, message: "User not found" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ success: false, message: "Invalid credentials" });
      }

      // Send success response
      res.status(200).json({
          success: true,
          message: "Login successful",
          userId: user.userId,
          name: user.name,
          email: user.email,
          role: user.role
      });
  } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error });
  }
});

// Registration API
app.post("/register", async (req, res) => {
    try {
        const { name, email, phoneNo, password, role } = req.body;

        // Check if email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user (userId will be auto-incremented)
        user = new User({
            name,
            email,
            phoneNo,
            password: hashedPassword,
            role
        });

        // Save the user
        await user.save();

        res.status(201).json({success: true, message: "User registered successfully", userId: user.userId });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

// Get all categories API
app.get("/category", async (req, res) => {
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
});

app.post("/category", async (req, res) => {
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
});

// Delete a category by ID
app.delete("/category/:categoryId", async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Find and delete the category by its ID
        const category = await Category.findOneAndDelete({ categoryId });
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
}); 

// Get all subcategories for a specific category
app.get("/category/:categoryId/subcategory", async (req, res) => {
    try {
        const { categoryId } = req.params;

        const subcategories = await SubCategory.find({ categoryId });

        if (!subcategories) {
            return res.status(404).json({ success: false, message: "No subcategories found for this category" });
        } else if( subcategories.length === 0) {
            return res.status(200).json({ success: true, message: "No subcategories is there for this category", data: [] });

        }

        res.status(200).json({
            success: true,
            data: subcategories
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

app.post("/category/:categoryId/subcategory", async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { subCategoryName } = req.body;

        // Check if category exists
        const category = await Category.findOne({ categoryId });
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // Create new subcategory
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
});

// Delete a subcategory by ID
app.delete("/subcategory/:subCategoryId", async (req, res) => {
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
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});