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
import {getAllComments, getCommentById, createComment, updateCommentById, deleteCommentById} from '../controllers/comment.js';
import {getAllUsers, createUser, deleteUserById, getUserById, updateUserById} from '../controllers/users.js';

import { Router } from 'express';

const routes = (app) => {
    const router = Router();

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


    //Projects
    router.get("/getAllProjects", getAllProjects);
    router.get("/getProjectById/:id", getProjectById);
    router.put("/updateProjectById/:id", updateProjectById);
    router.delete("/deleteProjectById/:id", deleteProjectById);
    router.delete("/deleteAllProject/", deleteAllProjects);
    router.patch("/markFavorite/:id", markProjectAsFavorite);


   

    //comments
    router.get('/comment/getComments', getAllComments);
    router.get('/comment/:id', getCommentById);
    router.post('/comment/create', createComment);
    router.delete('/comment/delete/:id', deleteCommentById);
    router.put('/comment/update:id', updateCommentById);

    //users
    router.get('/user/getAll', getAllUsers);
    router.post('/user/create', createUser);
    router.delete('/user/deleteById/:id',deleteUserById)
    router.get('/user/getUserById/:id', getUserById);
    router.put('/user/updateById/:id', updateUserById);
    app.use('/api', router);
};

export default routes;
