import User from '../models/users.js'; // Adjust the path as needed
import bcrypt from 'bcryptjs';
import { generateToken } from '../auth.js';
import { postUserSchema, putUserSchema } from "../validation/users.js";
import logger from '../logger.js'; // Import the logger

// Register User
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        logger.warn({
            action: "Register User",
            status: "Validation Failed",
            message: "Name, email, and password are required.",
            timestamp: new Date().toISOString(),
        });
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    try {
        const users = await User.getAll();
        if (users.some(user => user.email === email)) {
            logger.warn({
                action: "Register User",
                status: "User Exists",
                email: email,
                message: "User already exists.",
                timestamp: new Date().toISOString(),
            });
            return res.status(400).json({ error: 'User already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create(name, email, hashedPassword);
        
        logger.info({
            action: "Register User",
            status: "Success",
            user: newUser,
            timestamp: new Date().toISOString(),
        });
        res.status(201).json({ message: 'User registered successfully.', user: newUser });
    } catch (err) {
        logger.error({
            action: "Register User",
            status: "Error",
            error: err.message || err,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        logger.warn({
            action: "Login User",
            status: "Validation Failed",
            message: "Email and password are required.",
            timestamp: new Date().toISOString(),
        });
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const users = await User.getAll();
        const user = users.find(user => user.email === email);

        if (!user) {
            logger.warn({
                action: "Login User",
                status: "User Not Found",
                email: email,
                message: "User not found.",
                timestamp: new Date().toISOString(),
            });
            return res.status(404).json({ error: 'User not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            logger.warn({
                action: "Login User",
                status: "Invalid Password",
                email: email,
                message: "Invalid password.",
                timestamp: new Date().toISOString(),
            });
            return res.status(400).json({ error: 'Invalid password.' });
        }

        const token = generateToken(user);

        logger.info({
            action: "Login User",
            status: "Success",
            user: user,
            timestamp: new Date().toISOString(),
        });
        res.json({ message: 'Login successful.', token });
    } catch (err) {
        logger.error({
            action: "Login User",
            status: "Error",
            error: err.message || err,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Protected route example
export const getProtectedInfo = (req, res) => {
    logger.info({
        action: "Get Protected Info",
        status: "Success",
        userEmail: req.user.email,
        timestamp: new Date().toISOString(),
    });
    res.json({ message: `Hello ${req.user.email}, this is protected info.` });
};

// Controller function to get all users
export const getAllUsers = async (req, res) => {
    try {
        const data = await User.getAll();
        if (data.length === 0) {
            logger.warn({
                action: "Get All Users",
                status: "No Users Found",
                message: "No users found in the database.",
                timestamp: new Date().toISOString(),
            });
            return res.status(404).json({
                message: "No users found",
            });
        }
        logger.info({
            action: "Get All Users",
            status: "Success",
            resultCount: data.length,
            timestamp: new Date().toISOString(),
        });
        res.status(200).json(data);
    } catch (err) {
        logger.error({
            action: "Get All Users",
            status: "Error",
            error: err.message || err,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({
            message: "Error retrieving users",
            error: err,
        });
    }
};

// Controller function to get a user by ID
export const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await User.getById(id);
        if (!data) {
            logger.warn({
                action: "Get User by ID",
                userId: id,
                status: "User Not Found",
                message: `User not found with id ${id}`,
                timestamp: new Date().toISOString(),
            });
            return res.status(404).json({
                message: `User not found with id ${id}`,
            });
        }
        logger.info({
            action: "Get User by ID",
            userId: id,
            status: "Success",
            timestamp: new Date().toISOString(),
        });
        res.status(200).json(data);
    } catch (err) {
        logger.error({
            action: "Get User by ID",
            userId: id,
            status: "Error",
            error: err.message || err,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({
            message: `Error retrieving user with id ${id}`,
            error: err,
        });
    }
};

// Register user
export const createUser = async (req, res) => {
    try {
        await postUserSchema.validate(req.body, { abortEarly: false });

        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create(name, email, hashedPassword);

        logger.info({
            action: "Create User",
            status: "Success",
            user: newUser,
            timestamp: new Date().toISOString(),
        });
        res.status(201).json({ message: "User registered successfully.", user: newUser });
    } catch (err) {
        if (err.name === "ValidationError") {
            logger.warn({
                action: "Create User",
                status: "Validation Failed",
                errors: err.errors,
                timestamp: new Date().toISOString(),
            });
            return res.status(400).json({ message: "Validation failed", errors: err.errors });
        }
        logger.error({
            action: "Create User",
            status: "Error",
            error: err.message || err,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({ error: "Internal server error." });
    }
};

// Update user
export const updateUserById = async (req, res) => {
    const id = req.params.id;
    try {
        await putUserSchema.validate(req.body, { abortEarly: false });

        const { name, email, password } = req.body;
        const updatedData = await User.update(id, name, email, password);

        logger.info({
            action: "Update User by ID",
            userId: id,
            status: "Success",
            updatedUser: updatedData,
            timestamp: new Date().toISOString(),
        });
        res.status(200).json({ message: "User updated successfully.", user: updatedData });
    } catch (err) {
        if (err.name === "ValidationError") {
            logger.warn({
                action: "Update User by ID",
                userId: id,
                status: "Validation Failed",
                errors: err.errors,
                timestamp: new Date().toISOString(),
            });
            return res.status(400).json({ message: "Validation failed", errors: err.errors });
        } else if (err.kind === "not_found") {
            logger.warn({
                action: "Update User by ID",
                userId: id,
                status: "User Not Found",
                message: `User not found with id ${id}`,
                timestamp: new Date().toISOString(),
            });
            return res.status(404).json({ message: `User not found with id ${id}` });
        }
        logger.error({
            action: "Update User by ID",
            userId: id,
            status: "Error",
            error: err.message || err,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({ message: `Error updating user with id ${id}`, error: err });
    }
};

// Delete user by ID
export const deleteUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await User.delete(id);
        if (!data) {
            logger.warn({
                action: "Delete User by ID",
                userId: id,
                status: "User Not Found",
                message: `User not found with id ${id}`,
                timestamp: new Date().toISOString(),
            });
            return res.status(404).json({
                message: `User not found with id ${id}`,
            });
        }
        logger.info({
            action: "Delete User by ID",
            userId: id,
            status: "Success",
            timestamp: new Date().toISOString(),
        });
        res.status(200).json({
            message: `User with id ${id} deleted successfully`,
        });
    } catch (err) {
        logger.error({
            action: "Delete User by ID",
            userId: id,
            status: "Error",
            error: err.message || err,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({
            message: `Error deleting user with id ${id}`,
            error: err,
        });
    }
};
