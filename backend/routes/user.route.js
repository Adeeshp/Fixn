import express from "express";
const router = express.Router();
import {loginUser, registerUser, authenticateToken, getUserProfile} from '../controllers/user.controller.js';

// Login API
router.post("/user/login", loginUser);

// Registration API
router.post("/user/register", registerUser);

router.get('/user/profile', authenticateToken, getUserProfile);

export default router;