import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';


export const loginUser = async (req, res) => {
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
            userId: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, phoneNo, password, role } = req.body;

        // Check if email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user (userId will be auto-incremented by plugin)
        user = new User({
            firstname,
            lastname,
            email,
            phoneNo,
            password: hashedPassword,
            role
        });

        // Save the user
        await user.save();

        res.status(201).json({ success: true, message: "User registered successfully", user: user });
    } catch (error) {
         res.status(500).json({ success: false, message: "Server error", error });
    }
};