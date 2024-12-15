import { Router } from 'express';
import logger from '../logger.js'; // Import the logger

// Import controllers
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

import { 
    getAllProjects, 
    getProjectById, 
    updateProjectById, 
    deleteProjectById, 
    deleteAllProjects, 
    markProjectAsFavorite 
} from '../controllers/controllersProject.js';

import { filterTasks } from '../controllers/controllersFilter.js';

import { 
    getAllComments, 
    getCommentById, 
    createComment, 
    updateCommentById, 
    deleteCommentById 
} from '../controllers/comment.js';

import { 
    getAllUsers, 
    createUser, 
    deleteUserById, 
    getUserById, 
    updateUserById 
} from '../controllers/users.js';

import { 
    registerUser, 
    loginUser, 
    getProtectedInfo 
} from '../controllers/users.js';

import { verifyToken } from '../auth.js';

const routes = (app) => {
    const router = Router();

    // Middleware to log every request
    router.use((req, res, next) => {
        logger.info({
            method: req.method,
            route: req.originalUrl,
            timestamp: new Date().toISOString()
        });
        next();
    });

    // User Authentication
    router.post('/register', registerUser); // Register
    router.post('/user/login', loginUser); // Login
    router.get('/user/protected', verifyToken, getProtectedInfo); // Protected route

    // Tasks
    router.get("/tasks/", getAllTasks);
    router.get("/tasks/:id", getTaskById);
    router.post("/createNew/task", createTask);
    router.put("/updateTaskById/:id", updateTaskById);
    router.delete("/deleteTaskById/:id", deleteTaskById);
    router.delete("/deleteAllTasks/", deleteAllTasks);
    router.get("/completedTask/getAll/", getCompletedTasks);
    router.get("/titleTaskById/", findTasksByTitle);
    router.get('/tasksFilter/filterBy', filterTasks);

    // Projects
    router.get("/getAllProjects", getAllProjects);
    router.get("/getProjectById/:id", getProjectById);
    router.put("/updateProjectById/:id", updateProjectById);
    router.delete("/deleteProjectById/:id", deleteProjectById);
    router.delete("/deleteAllProject/", deleteAllProjects);
    router.patch("/markFavorite/:id", markProjectAsFavorite);

    // Comments
    router.get('/comment/getComments', getAllComments);
    router.get('/comment/:id', getCommentById);
    router.post('/comment/create', createComment);
    router.delete('/comment/delete/:id', deleteCommentById);
    router.put('/comment/update:id', updateCommentById);

    // Users
    router.get('/user/getAll', getAllUsers);
    router.post('/user/create', createUser);
    router.delete('/user/deleteById/:id', deleteUserById);
    router.get('/user/getUserById/:id', getUserById);
    router.put('/user/updateById/:id', updateUserById);

    app.use('/api', router);

    logger.info('Routes successfully initialized'); // Log when routes are initialized
};

export default routes;
