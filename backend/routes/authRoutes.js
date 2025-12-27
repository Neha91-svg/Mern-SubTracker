import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
} from "../controllers/authController.js";
import protect from "../middleware/protect.js";
import arcjetMiddleware from "../middleware/arcjetMiddleware.js";

const router = express.Router();

router.post("/register", arcjetMiddleware, registerUser);
router.post("/login", arcjetMiddleware, loginUser);
router.post("/logout", protect, logoutUser);

export default router;
