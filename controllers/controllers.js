import Task from '../models/model.js'; // Adjust the path as needed

// Controller function to get all tutorials
export const getAllTasks = (req, res) => {
    Task.getAll((err, data) => {
        if (err) {
            console.error("Error retrieving tasks:", err);
            return res.status(500).json({
                message: "Error retrieving tasks",
                error: err,
                
            });
        }

        if (data.length === 0) {
            return res.status(404).json({
                message: "No tasks found",
                
            });
        }

        res.status(200).json(data);
    });
};

// Controller function to get a tutorial by ID
export const getTaskById = (req, res) => {
    const id = req.params.id;
    Task.findById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    message: `Tasks not found with id ${id}`,
                });
            }

            console.error("Error retrieving task:", err);
            return res.status(500).json({
                message: `Error retrieving task with id ${id}`,
                error: err,
            });
        }

        res.status(200).json(data);
    });
};

// Controller function to create a new tutorial
export const createTask = (req, res) => {
    const newTask = new Task(req.body);

    Task.create(newTask, (err, data) => {
        if (err) {
            console.error("Error creating task:", err);
            return res.status(500).json({
                message: "Error creating task",
                error: err,
            });
        }

        res.status(201).json(data);
    });
};

// Controller function to update a tutorial by ID
export const updateTaskById = (req, res) => {
    const id = req.params.id;
    const task = new Task(req.body);

    Task.updateById(id, task, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    message: `Task not found with id ${id}`,
                });
            }

            console.error("Error updating task:", err);
            return res.status(500).json({
                message: `Error updating task with id ${id}`,
                error: err,
            });
        }

        res.status(200).json(data);
    });
};

// Controller function to delete a tutorial by ID
export const deleteTaskById = (req, res) => {
    const id = req.params.id;

    Task.remove(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    message: `Task not found with id ${id}`,
                });
            }

            console.error("Error deleting task:", err);
            return res.status(500).json({
                message: `Error deleting task with id ${id}`,
                error: err,
            });
        }

        res.status(200).json({
            message: `Task with id ${id} deleted successfully`,
        });
    });
};

// Controller function to delete all tutorials
export const deleteAllTasks = (req, res) => {
    Task.removeAll((err, data) => {
        if (err) {
            console.error("Error deleting all tasks:", err);
            return res.status(500).json({
                message: "Error deleting all tasks",
                error: err,
            });
        }

        res.status(200).json({
            message: `All tasks deleted successfully`,
        });
    });
};

// Controller function to get all published tutorials
export const getCompletedTasks = (req, res) => {
    Task.getAllPublished((err, data) => {
        if (err) {
            console.error("Error retrieving published tasks:", err);
            return res.status(500).json({
                message: "Error retrieving published tasks",
                error: err,
            });
        }

        if (data.length === 0) {
            return res.status(404).json({
                message: "No published tasks found",
            });
        }

        res.status(200).json(data);
    });
};

// Controller function to find tutorials by title keyword
export const findTasksByTitle = (req, res) => {
    const title = req.query.title;

    if (!title) {
        return res.status(400).json({
            message: "Title query parameter is required",
        });
    }

    Task.findByTitle(title, (err, data) => {
        if (err) {
            console.error("Error retrieving tasks by title:", err);
            return res.status(500).json({
                message: `Error retrieving tasks with title containing '${title}'`,
                error: err,
            });
        }

        if (data.length === 0) {
            return res.status(404).json({
                message: `No tasks found with title containing '${title}'`,
            });
        }

        res.status(200).json(data);
    });
};
