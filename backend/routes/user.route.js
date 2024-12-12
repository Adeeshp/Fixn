import express from "express";
const router = express.Router();
import {loginUser, registerUser, registerServiceProvider, authenticateToken, getUserProfile, forgotPassword, resetPassword} from '../controllers/user.controller.js';

// Login API
router.post("/user/login", loginUser);

// Registration API
router.post("/user/register", registerUser);

router.post('/user/registerServiceProvider', registerServiceProvider);

// Route with userId parameter
router.get('/user/profile/:userId', authenticateToken, getUserProfile);

// Forgot Password API
router.post('/user/forgot_password', forgotPassword);

// Reset Password API (Submit new password)
router.post('/user/reset_password', resetPassword);

export default router;