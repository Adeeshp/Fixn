import express from "express";
const router = express.Router();
import {loginUser, registerUser, authenticateToken, getUserProfile,forgotPassword,resetPassword} from '../controllers/user.controller.js';

// Login API
router.post("/user/login", loginUser);

// Registration API
router.post("/user/register", registerUser);

router.get('/user/profile', authenticateToken, getUserProfile);

// Forgot Password route
router.post('/forgot-password', forgotPassword);

// Reset Password route
router.post('/reset-password', resetPassword);


export default router;