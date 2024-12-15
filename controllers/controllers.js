import { taskSchema } from "../validation/tasks.js";
import Task from "../models/model.js";
import logger from "../logger.js"; // Import logger

export const getAllTasks = async (req, res) => {
    try {
        const data = await Task.getAll();
        logger.info({
            action: "Retrieve all tasks",
            status: "Success",
            timestamp: new Date().toISOString(),
        });
        res.status(200).json(data);
    } catch (err) {
        logger.error({
            action: "Retrieve all tasks",
            status: "Error",
            error: err.message,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({ message: "Error retrieving tasks", error: err });
    }
};

export const getTaskById = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Task.findById(id);
        logger.info({
            action: "Retrieve task by ID",
            status: "Success",
            taskId: id,
            timestamp: new Date().toISOString(),
        });
        res.status(200).json(data);
    } catch (err) {
        if (err.kind === "not_found") {
            logger.warn({
                action: "Retrieve task by ID",
                status: "Not Found",
                taskId: id,
                timestamp: new Date().toISOString(),
            });
            res.status(404).json({ message: `Task not found with id ${id}` });
        } else {
            logger.error({
                action: "Retrieve task by ID",
                status: "Error",
                taskId: id,
                error: err.message,
                timestamp: new Date().toISOString(),
            });
            res.status(500).json({ message: `Error retrieving task with id ${id}`, error: err });
        }
    }
};

export const createTask = async (req, res) => {
    try {
        // Validate request body
        await taskSchema.validate(req.body, { abortEarly: false });

        const newTask = new Task(req.body);
        const data = await Task.create(newTask);
        logger.info({
            action: "Create task",
            status: "Success",
            task: newTask,
            timestamp: new Date().toISOString(),
        });
        res.status(201).json(data);
    } catch (err) {
        if (err.name === "ValidationError") {
            logger.warn({
                action: "Create task",
                status: "Validation Error",
                errors: err.errors,
                timestamp: new Date().toISOString(),
            });
            res.status(400).json({ message: "Validation failed", errors: err.errors });
        } else {
            logger.error({
                action: "Create task",
                status: "Error",
                error: err.message,
                timestamp: new Date().toISOString(),
            });
            res.status(500).json({ message: "Error creating task", error: err });
        }
    }
};

export const updateTaskById = async (req, res) => {
    const id = req.params.id;
    try {
        // Validate request body
        await taskSchema.validate(req.body, { abortEarly: false });

        const task = new Task(req.body);
        const data = await Task.updateById(id, task);
        logger.info({
            action: "Update task by ID",
            status: "Success",
            taskId: id,
            updatedTask: task,
            timestamp: new Date().toISOString(),
        });
        res.status(200).json(data);
    } catch (err) {
        if (err.name === "ValidationError") {
            logger.warn({
                action: "Update task by ID",
                status: "Validation Error",
                taskId: id,
                errors: err.errors,
                timestamp: new Date().toISOString(),
            });
            res.status(400).json({ message: "Validation failed", errors: err.errors });
        } else if (err.kind === "not_found") {
            logger.warn({
                action: "Update task by ID",
                status: "Not Found",
                taskId: id,
                timestamp: new Date().toISOString(),
            });
            res.status(404).json({ message: `Task not found with id ${id}` });
        } else {
            logger.error({
                action: "Update task by ID",
                status: "Error",
                taskId: id,
                error: err.message,
                timestamp: new Date().toISOString(),
            });
            res.status(500).json({ message: `Error updating task with id ${id}`, error: err });
        }
    }
};

export const deleteTaskById = async (req, res) => {
    const id = req.params.id;
    try {
        await Task.remove(id);
        logger.info({
            action: "Delete task by ID",
            status: "Success",
            taskId: id,
            timestamp: new Date().toISOString(),
        });
        res.status(200).json({ message: `Task with id ${id} deleted successfully` });
    } catch (err) {
        if (err.kind === "not_found") {
            logger.warn({
                action: "Delete task by ID",
                status: "Not Found",
                taskId: id,
                timestamp: new Date().toISOString(),
            });
            res.status(404).json({ message: `Task not found with id ${id}` });
        } else {
            logger.error({
                action: "Delete task by ID",
                status: "Error",
                taskId: id,
                error: err.message,
                timestamp: new Date().toISOString(),
            });
            res.status(500).json({ message: `Error deleting task with id ${id}`, error: err });
        }
    }
};

export const deleteAllTasks = async (req, res) => {
    try {
        await Task.removeAll();
        logger.info({
            action: "Delete all tasks",
            status: "Success",
            timestamp: new Date().toISOString(),
        });
        res.status(200).json({ message: "All tasks deleted successfully" });
    } catch (err) {
        logger.error({
            action: "Delete all tasks",
            status: "Error",
            error: err.message,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({ message: "Error deleting all tasks", error: err });
    }
};

export const getCompletedTasks = async (req, res) => {
    try {
        const data = await Task.getAllCompleted();
        logger.info({
            action: "Retrieve completed tasks",
            status: "Success",
            timestamp: new Date().toISOString(),
        });
        res.status(200).json(data);
    } catch (err) {
        logger.error({
            action: "Retrieve completed tasks",
            status: "Error",
            error: err.message,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({ message: "Error retrieving completed tasks", error: err });
    }
};

export const findTasksByTitle = async (req, res) => {
    const title = req.query.title;
    if (!title) {
        logger.warn({
            action: "Find tasks by title",
            status: "Validation Error",
            message: "Title query parameter is required",
            timestamp: new Date().toISOString(),
        });
        return res.status(400).json({ message: "Title query parameter is required" });
    }

    try {
        const data = await Task.findByTitle(title);
        logger.info({
            action: "Find tasks by title",
            status: "Success",
            title: title,
            timestamp: new Date().toISOString(),
        });
        res.status(200).json(data);
    } catch (err) {
        logger.error({
            action: "Find tasks by title",
            status: "Error",
            title: title,
            error: err.message,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({ message: `Error retrieving tasks with title containing '${title}'`, error: err });
    }
};
