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

import{getAllProjects,getProjectById,updateProjectById,deleteProjectById,deleteAllProjects,markProjectAsFavorite} from '../controllers/controllersProject.js'
import { filterTasks } from '../controllers/controllersFilter.js';

import { Router } from 'express';

const routes = (app) => {
    const router = Router();

    // Route to get all tasks
    router.get("/tasks/", getAllTasks);

    // Route to get a task by ID
    router.get("/tasks/:id", getTaskById);

    // Route to create a new task
    router.post("/createNew/task", createTask);

    // Route to update a task by ID
    router.put("/updateTaskById/:id", updateTaskById);

    // Route to delete a task by ID
    router.delete("/deleteTaskById/:id", deleteTaskById);

    // Route to delete all tasks
    router.delete("/deleteAllTasks/", deleteAllTasks);

    // Route to get all completed tasks
    router.get("/completed/getAll/", getCompletedTasks);

    // Route to find tasks by title keyword
    router.get("/titleTaskById/", findTasksByTitle);

    router.get("/", getAllProjects);

    // Route to get a project by ID
    router.get("/:id", getProjectById);

    // Route to update a project by ID
    router.put("/updateProjectById/:id", updateProjectById);

    // Route to delete a project by ID
    router.delete("/deleteProjectById/:id", deleteProjectById);

    // Route to delete all projects
    router.delete("/deleteAllProject/", deleteAllProjects);

    // Route to mark a project as favorite
    router.patch("/markFavorite/:id", markProjectAsFavorite);


    //filter
    router.get('/tasksFilter/filterBy', filterTasks);
    app.use('/api', router);
};

export default routes;
