import express, { request } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from "./routes/user.route.js";
import categoryRoutes from "./routes/category.route.js";
import subCategoryRoutes from "./routes/subCategory.route.js";
import taskRoutes from "./routes/task.route.js";
import requestRoutes from "./routes/request.route.js";
import reviewRoutes from "./routes/review.route.js";

import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", userRoutes, categoryRoutes, subCategoryRoutes, taskRoutes, requestRoutes, reviewRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
