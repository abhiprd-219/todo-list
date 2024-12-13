import Task from '../models/model.js';

export const getAllTasks = async (req, res) => {
    try {
        const data = await Task.getAll();
        res.status(200).json(data);
    } catch (err) {
        console.error("Error retrieving tasks:", err);
        res.status(500).json({ message: "Error retrieving tasks", error: err });
    }
};

export const getTaskById = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Task.findById(id);
        res.status(200).json(data);
    } catch (err) {
        if (err.kind === "not_found") {
            res.status(404).json({ message: `Task not found with id ${id}` });
        } else {
            console.error("Error retrieving task:", err);
            res.status(500).json({ message: `Error retrieving task with id ${id}`, error: err });
        }
    }
};

export const createTask = async (req, res) => {
    const newTask = new Task(req.body);
    try {
        const data = await Task.create(newTask);
        res.status(201).json(data);
    } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ message: "Error creating task", error: err });
    }
};

export const updateTaskById = async (req, res) => {
    const id = req.params.id;
    const task = new Task(req.body);
    try {
        const data = await Task.updateById(id, task);
        res.status(200).json(data);
    } catch (err) {
        if (err.kind === "not_found") {
            res.status(404).json({ message: `Task not found with id ${id}` });
        } else {
            console.error("Error updating task:", err);
            res.status(500).json({ message: `Error updating task with id ${id}`, error: err });
        }
    }
};

export const deleteTaskById = async (req, res) => {
    const id = req.params.id;
    try {
        await Task.remove(id);
        res.status(200).json({ message: `Task with id ${id} deleted successfully` });
    } catch (err) {
        if (err.kind === "not_found") {
            res.status(404).json({ message: `Task not found with id ${id}` });
        } else {
            console.error("Error deleting task:", err);
            res.status(500).json({ message: `Error deleting task with id ${id}`, error: err });
        }
    }
};

export const deleteAllTasks = async (req, res) => {
    try {
        await Task.removeAll();
        res.status(200).json({ message: "All tasks deleted successfully" });
    } catch (err) {
        console.error("Error deleting all tasks:", err);
        res.status(500).json({ message: "Error deleting all tasks", error: err });
    }
};

export const getCompletedTasks = async (req, res) => {
    try {
        const data = await Task.getAllCompleted();
        res.status(200).json(data);
    } catch (err) {
        console.error("Error retrieving completed tasks:", err);
        res.status(500).json({ message: "Error retrieving completed tasks", error: err });
    }
};

export const findTasksByTitle = async (req, res) => {
    const title = req.query.title;
    if (!title) {
        return res.status(400).json({ message: "Title query parameter is required" });
    }

    try {
        const data = await Task.findByTitle(title);
        res.status(200).json(data);
    } catch (err) {
        console.error("Error retrieving tasks by title:", err);
        res.status(500).json({ message: `Error retrieving tasks with title containing '${title}'`, error: err });
    }
};
