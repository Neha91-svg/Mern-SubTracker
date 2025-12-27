import express from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getMe,
} from "../controllers/userController.js";
import protect from "../middleware/protect.js";

const router = express.Router();
router.get("/me", protect, getMe);

router.get("/", protect, getAllUsers);

router.get("/:id", protect, getUserById);

router.post("/", protect, createUser);

router.put("/:id", protect, updateUser);

router.delete("/:id", protect, deleteUser);

export default router;
