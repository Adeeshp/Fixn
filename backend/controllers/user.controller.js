import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// const nodemailer = require('nodemailer');
const JWT_SECRET = process.env.JWT_SECRET || "mySuperSecretKey123!"
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'; // Your frontend URL (e.g., )

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

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        // console.log('Token generated:', token);

        // Send success response
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: user,
            accessToken: token
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};


export const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, phoneNo, password } = req.body;

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
            password: hashedPassword
        });

        // Save the user
        await user.save();

        // Generate token after user is saved
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Attempt to send the confirmation email
        const emailSent = await sendEmail(true, user.email, "");
        let emailMessage = "";

        if (emailSent) {
            emailMessage = "Email confirmation sent to your email.";
        } else {
            emailMessage = "Failed to send email confirmation.";
        }

        // Send success response including the email status
        res.status(201).json({
            success: true,
            message: "User registered successfully. " + emailMessage,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phoneNo: user.phoneNo,
            },
            token // Include the token in the response
        });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

//Service Provider Registeration
export const registerServiceProvider = async (req, res) => {
    upload.single('certificate')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }

        try {
            const { firstname, lastname, email, phoneNo, password } = req.body;

            // Ensure the role is set to "service provider"
            // if (role !== 'service provider') {
            //     return res.status(400).json({ success: false, message: "Invalid role for service provider registration" });
            // }

            // Check if email already exists
            let existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: "Email already exists" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user with certificate path
            const user = new User({
                firstname,
                lastname,
                email,
                phoneNo,
                password: hashedPassword,
                certificatePath: req.file.path // Store the certificate file path
            });

            // Save the user
            await user.save();

            // Generate token after saving the user
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

            // Send confirmation email
            const emailSent = await sendEmail(true, user.email, "");
            const emailMessage = emailSent
                ? "Email confirmation sent to your email."
                : "Failed to send email confirmation.";

            res.status(201).json({
                success: true,
                message: "Service provider registered successfully. " + emailMessage,
                user: {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    phoneNo: user.phoneNo,
                    certificatePath: user.certificatePath // Include the path to the certificate
                },
                token
            });

        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ success: false, message: "Server error", error });
        }
    });
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
        const user = await User.findById(req.user._id).select('-password'); // Exclude the password field

        if (!user) {
            console.log('User not found:', req.user._id);
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

//Forgot Password
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Generate reset token
        const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Generate reset link
        const resetLink = `${BASE_URL}/reset-password?token=${resetToken}`;
        console.log(`Generated Reset Link: ${resetLink}`);

        // Send email with reset link
        const emailSent = await sendEmail(false, user.email, resetLink);
        if (emailSent) {
            res.status(200).json({
                success: true,
                message: "Password reset link has been sent to your email.",
            });
        } else {
            res.status(500).json({ success: false, message: "Failed to send email" });
        }
    } catch (error) {
        console.error("Error sending password reset email:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// Function to send reset email using nodemailer
const sendEmail = async (isRegistration, email, link) => {
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Pass (hidden for security):', !!process.env.EMAIL_PASS); // True if password is defined

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER || 'fixnfixn00@gmail.com', // Your email address
            pass: process.env.EMAIL_PASS || 'xbtjevpxkphljbkd', // Your email password or app-specific password
        },
    });
    console.log("Adeesh");
    console.log(`${isRegistration}`);
    // Conditionally change the email content based on whether it's a registration or reset
    const subject = isRegistration ? 'Welcome to Our Service' : 'Password Reset';
    const htmlContent = isRegistration
        ? `<p>Welcome to our service! Your account has been successfully created. You can now log in and start using our platform.</p>`
        : `<p>To reset your password, click the link below:</p>
           <a href="${link}">Reset Password</a>`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: htmlContent,
    };

    console.log(mailOptions);
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error.message || error);
        return false;
    }
};

// Reset Password Function
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
