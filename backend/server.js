import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

// app.get("/", (req, res) => {
//   res.send("Server is ready 1")
// })

app.post("/login", async (req, res) => {
  const user = req.body;// user will sent data

});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port ${PORT}");
});