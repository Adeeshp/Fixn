import mongoose from "mongoose";
import User from "../models/user.model.js";

export const authenticateUser = async (req, res) => {
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
};

export const registerNewUser = async (req, res) => {
    try {
        const { name, email, phoneNo, 
            // password,
             role } = req.body;

        // Check if email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Hash the password before saving
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user (userId will be auto-incremented)
        user = new User({
            // userId: 1,
            name,
            email,
            phoneNo,
            // password: hashedPassword,
            role
        });

        // Save the user
        await user.save();

        res.status(201).json({ success: true, message: "User registered successfully", userId: user.userId });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};