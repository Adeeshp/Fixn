import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const JWT_SECRET = process.env.JWT_SECRET || "mySuperSecretKey123!"

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fixnyourway@gmail.com', // your Gmail address
        pass: 'guyziz@1', // your Gmail App Password or actual password (for less secure apps)
    },
});

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login attempt for email:', email);

        // Check if user with given email exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid credentials');
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generated:', token);

        // Send success response
        res.status(200).json({
            success: true,
            message: "Login successful",
            userId: user,
            accessToken: token
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};


export const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, phoneNo, password, role } = req.body;

        // Check if email already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            firstname,
            lastname,
            email,
            phoneNo,
            password: hashedPassword,
            role
        });

        // Save the user
        await user.save();

        // Generate token after user is saved
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Send success response with the token
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phoneNo: user.phoneNo,
                role: user.role
            },
            token // Include the token in the response
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};


export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header

    if (!token) {
        console.log('No token provided');
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Attach user info to request
        next(); // Proceed to the next middleware or route handler
    });
};

export const getUserProfile = async (req, res) => {
    try {
        // Find user by ID from the token
        const user = await User.findById(req.user.userId).select('-password'); // Exclude the password field

        if (!user) {
            console.log('User not found:', req.user.userId);
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Profile retrieved successfully",
            user
        });
    } catch (error) {
        console.error("Error retrieving profile:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Forgot Password API
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Generate a password reset token
        const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '15m' });

        // Set up email options
        const mailOptions = {
            from: 'fixnyourway@gmail.com', // sender address
            to: email, // recipient email
            subject: 'Reset Password', // Subject line
            html: `<p>Please click on the link to reset your password: <a href="http://localhost:3000/reset-password/${resetToken}">Reset Password</a></p>`, // HTML body
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Reset password email sent" });
    } catch (error) {
        console.error('Error during forgot password:', error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// Reset Password API
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await User.findByIdAndUpdate(userId, { password: hashedPassword });

        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};