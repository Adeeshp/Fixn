import mongoose from "mongoose";
import User from "../models/user.model.js";
import Document from "../models/document.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import multer from 'multer';

const JWT_SECRET = process.env.JWT_SECRET || "mySuperSecretKey123!";
const BASE_URL = process.env.BASE_URL || "http://localhost:3000"; // Replace with your frontend URL

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Environment variable for Gmail
        pass: process.env.EMAIL_PASS, // Environment variable for Gmail App Password
    },
});

const storage = multer.memoryStorage(); // Store files in memory temporarily
const upload = multer({ storage: storage });

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        // console.log('Token generated:', token);

        // Send success response
        res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            accessToken: token,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Register User
export const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, phoneNo, password, city, province, country } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstname,
            lastname,
            email,
            phoneNo,
            city,
            province,
            country,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Register Service Provider
export const registerServiceProvider = (req, res) => {
    // First, ensure that multer has successfully handled the file uploads before proceeding
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'document', maxCount: 1 }])(req, res, async (err) => {
        if (err) {
            console.error("Multer Error:", err);
            return res.status(400).json({ success: false, message: err.message });
        }

        try {
            const {
                firstname,
                lastname,
                phoneNo,
                email,
                password,
                address,
                city,
                province,
                country,
                zipcode,
                gender,
                wageType,
                wage,
                categoryId,
                subCategoryId,
            } = req.body;

            // Validate required fields
            if (!firstname || !lastname || !phoneNo || !email || !password || !wageType || !wage) {
                return res.status(400).json({ success: false, message: "All required fields must be filled." });
            }

            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ success: false, message: "User with this email already exists." });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Extract uploaded files from req.files
            const imageFile = req.files["image"] ? req.files["image"][0].buffer : null;
            const documentFile = req.files["document"] ? req.files["document"][0].buffer : null;

            // Handle case where files are missing
            if (!imageFile) {
                return res.status(400).json({ success: false, message: "Image is required." });
            }
            if (!documentFile) {
                return res.status(400).json({ success: false, message: "Document is required." });
            }

            // Create the new user with the file references
            const user = new User({
                firstname,
                lastname,
                phoneNo,
                email,
                password: hashedPassword,
                address,
                city,
                province,
                country,
                zipcode,
                gender,
                wageType,
                wage,
                categoryId,
                subCategoryId,
                role: "serviceProvider",
                imageURL: imageFile, // Store image as buffer or reference
            });

            // Save the user
            const savedUser = await user.save();

            // Now that the user is saved, create the document using the saved user's _id
            const newDocument = new Document({
                name: req.files["document"] ? req.files["document"][0].originalname : "No document uploaded",
                documentData: documentFile,
                userId: savedUser._id, // Set the userId to the saved user's _id
            });

            // Save the document
            const savedDocument = await newDocument.save();

            // Update the user with the document reference
            savedUser.documents.push(savedDocument._id); // Add the document's _id to the documents array
            await savedUser.save();

            // Populate the documents field to get full document details
            await savedUser.populate('documents'); // Populates the documents field with the full document details
            
            await savedUser.save();

            const token = jwt.sign({ id: savedUser._id, role: savedUser.role }, JWT_SECRET, { expiresIn: "1h" });

            res.status(201).json({
                success: true,
                message: "Service provider registered successfully.",
                user: savedUser,
                token,
            });
        } catch (error) {
            console.error("Error registering service provider:", error);
            res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
        }
    });
};




// Authenticate Token Middleware
export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
            
        }

        res.status(200).json({
            success: true,
            user,
        });
        console.log("success");
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
        console.log("error");
    }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        const resetLink = `${BASE_URL}/reset-password?token=${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            text: `Reset your password using the following link: ${resetLink}`,
        });

        res.status(200).json({
            success: true,
            message: "Password reset email sent",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find the user by the ID in the token
        const user = await User.findById(decoded.id); // Use decoded.id instead of decoded._id
        console.log(`Decoded Token: ${JSON.stringify(decoded)}`);
        console.log(`User: ${user}`);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully.",
        });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};