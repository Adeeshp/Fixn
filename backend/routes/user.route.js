import express from "express";
const router = express.Router();
import {loginUser, registerUser} from '../controllers/user.controller.js';

// Login API
router.post("/user/login", loginUser);

// Registration API
router.post("/user/register", registerUser);

export default router;