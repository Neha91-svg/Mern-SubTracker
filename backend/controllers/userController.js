import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// GET ALL USERS
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    try {
        // req.user is set by protect middleware
        if (!req.user) {
            res.status(401);
            throw new Error("Unauthorized");
        }

        const user = await User.findById(req.user._id).select("-password"); // hide password
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};


// GET USER BY ID
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

// CREATE USER
export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("All fields are required");
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: { _id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE USER
export const updateUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: { _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email },
        });
    } catch (error) {
        next(error);
    }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        await user.deleteOne();

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// REGISTER USER
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("All fields are required");
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: generateToken(user._id),
        });
    } catch (error) {
        next(error);
    }
};

// LOGIN USER
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400);
            throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400);
            throw new Error("Invalid credentials");
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: generateToken(user._id),
        });
    } catch (error) {
        next(error);
    }
};

// LOGOUT USER
export const logoutUser = async (req, res, next) => {
    try {
        res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        next(error);
    }
};
