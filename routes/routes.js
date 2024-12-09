import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById,
    deleteAllTasks,
    getCompletedTasks,
    findTasksByTitle
} from '../controllers/controllers.js';

import { Router } from 'express';

const routes = (app) => {
    const router = Router();

    // Route to get all tasks
    router.get("/", getAllTasks);

    // Route to get a task by ID
    router.get("/:id", getTaskById);

    // Route to create a new task
    router.post("/createNew/", createTask);

    // Route to update a task by ID
    router.put("/updateById/:id", updateTaskById);

    // Route to delete a task by ID
    router.delete("/deleteById/:id", deleteTaskById);

    // Route to delete all tasks
    router.delete("/deleteAll/", deleteAllTasks);

    // Route to get all completed tasks
    router.get("/completed/getAll/", getCompletedTasks);

    // Route to find tasks by title keyword
    router.get("/title/", findTasksByTitle);

    app.use('/api/tasks', router);
};

export default routes;
