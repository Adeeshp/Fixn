import express from "express";
const router = express.Router();
import {authenticateUser, registerNewUser} from '../controllers/user.controller.js';

// Login API
router.post("/login", );

// Registration API
router.post("/register", registerNewUser);

export default router;