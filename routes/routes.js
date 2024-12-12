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
import {getAllComments, getCommentById, createComment, updateCommentById, deleteCommentById, deleteAllComments} from '../controllers/comment.js';

import { Router } from 'express';

const routes = (app) => {
    const router = Router();

    // Tasks
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
    router.get("/completedTask/getAll/", getCompletedTasks);
    // Route to find tasks by title keyword
    router.get("/titleTaskById/", findTasksByTitle);
     //filter
    router.get('/tasksFilter/filterBy', filterTasks);


    //Projects
    router.get("/getAllProjects", getAllProjects);
    // Route to get a project by ID
    router.get("/getProjectById/:id", getProjectById);
    // Route to update a project by ID
    router.put("/updateProjectById/:id", updateProjectById);
    // Route to delete a project by ID
    router.delete("/deleteProjectById/:id", deleteProjectById);
    // Route to delete all projects
    router.delete("/deleteAllProject/", deleteAllProjects);
    // Route to mark a project as favorite
    router.patch("/markFavorite/:id", markProjectAsFavorite);


   

    //comments
    router.get('/comment/getComments', getAllComments);
    router.get('/comment/:id', getCommentById);
    router.post('/comment/create', createComment);
    router.delete('/comment/delete/:id', deleteCommentById);
    router.put('/comment/update:id', updateCommentById);

    
    app.use('/api', router);
};

export default routes;
