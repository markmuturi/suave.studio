import express from "express";
import upload from "./config/multer.js";
import { createProject, getProject, getProjectById, deleteProject, updateProject } from "./projectController.js";

const router = express.Router();

router.post("/", upload.single("image"), createProject);
router.get("/", getProject);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;