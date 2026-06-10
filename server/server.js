import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import projectRoutes from "./projectRoutes.js"
import path from "path";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5000"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.listen(5000, () => console.log("Server running on Port: 5000"));

