import Project from '../models/projectssModel.js';
import { projectSchema } from "../validation/projects.js";
import logger from '../logger.js'; // Import the logger

// Controller function to get all projects
export const getAllProjects = async (req, res) => {
    try {
        const data = await Project.getAll();
        if (data.length === 0) {
            logger.warn({
                action: "Get all projects",
                status: "No Projects Found",
                message: "No projects found in the database",
                timestamp: new Date().toISOString(),
            });
            return res.status(404).json({
                message: "No projects found",
            });
        }
        logger.info({
            action: "Get all projects",
            status: "Success",
            resultCount: data.length,
            timestamp: new Date().toISOString(),
        });
        res.status(200).json(data);
    } catch (err) {
        logger.error({
            action: "Get all projects",
            status: "Error",
            error: err.message || err,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({
            message: "Error retrieving projects",
            error: err,
        });
    }
};

// Controller function to get a project by ID
export const getProjectById = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Project.findById(id);
        logger.info({
            action: "Get project by ID",
            projectId: id,
            status: "Success",
            timestamp: new Date().toISOString(),
        });
        res.status(200).json(data);
    } catch (err) {
        if (err.kind === "not_found") {
            logger.warn({
                action: "Get project by ID",
                projectId: id,
                status: "Project Not Found",
                message: `Project not found with id ${id}`,
                timestamp: new Date().toISOString(),
            });
            return res.status(404).json({
                message: `Project not found with id ${id}`,
            });
        }
        logger.error({
            action: "Get project by ID",
            projectId: id,
            status: "Error",
            error: err.message || err,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({
            message: `Error retrieving project with id ${id}`,
            error: err,
        });
    }
};

// Controller function to create a project
export const createProject = async (req, res) => {
    try {
        // Validate request body
        await projectSchema.validate(req.body, { abortEarly: false });

        const newProject = new Project(req.body);
        const data = await Project.create(newProject);

        logger.info({
            action: "Create project",
            status: "Success",
            projectId: data.id,
            timestamp: new Date().toISOString(),
        });
        res.status(201).json(data);
    } catch (err) {
        if (err.name === "ValidationError") {
            logger.warn({
                action: "Create project",
                status: "Validation Failed",
                errors: err.errors,
                timestamp: new Date().toISOString(),
            });
            return res.status(400).json({ message: "Validation failed", errors: err.errors });
        }
        logger.error({
            action: "Create project",
            status: "Error",
            error: err.message || err,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({ message: "Error creating project", error: err });
    }
};

// Controller function to update a project by ID
export const updateProjectById = async (req, res) => {
    const id = req.params.id;
    try {
        // Validate request body
        await projectSchema.validate(req.body, { abortEarly: false });

        const project = new Project(req.body);
        const data = await Project.updateById(id, project);

        logger.info({
            action: "Update project by ID",
            projectId: id,
            status: "Success",
            timestamp: new Date().toISOString(),
        });
        res.status(200).json(data);
    } catch (err) {
        if (err.name === "ValidationError") {
            logger.warn({
                action: "Update project by ID",
                projectId: id,
                status: "Validation Failed",
                errors: err.errors,
                timestamp: new Date().toISOString(),
            });
            return res.status(400).json({ message: "Validation failed", errors: err.errors });
        } else if (err.kind === "not_found") {
            logger.warn({
                action: "Update project by ID",
                projectId: id,
                status: "Project Not Found",
                message: `Project not found with id ${id}`,
                timestamp: new Date().toISOString(),
            });
            return res.status(404).json({ message: `Project not found with id ${id}` });
        }
        logger.error({
            action: "Update project by ID",
            projectId: id,
            status: "Error",
            error: err.message || err,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({ message: `Error updating project with id ${id}`, error: err });
    }
};

// Controller function to delete a project by ID
export const deleteProjectById = async (req, res) => {
    const id = req.params.id;
    try {
        await Project.remove(id);
        logger.info({
            action: "Delete project by ID",
            projectId: id,
            status: "Success",
            timestamp: new Date().toISOString(),
        });
        res.status(200).json({
            message: `Project with id ${id} deleted successfully`,
        });
    } catch (err) {
        if (err.kind === "not_found") {
            logger.warn({
                action: "Delete project by ID",
                projectId: id,
                status: "Project Not Found",
                message: `Project not found with id ${id}`,
                timestamp: new Date().toISOString(),
            });
            return res.status(404).json({
                message: `Project not found with id ${id}`,
            });
        }
        logger.error({
            action: "Delete project by ID",
            projectId: id,
            status: "Error",
            error: err.message || err,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({
            message: `Error deleting project with id ${id}`,
            error: err,
        });
    }
};

// Controller function to delete all projects
export const deleteAllProjects = async (req, res) => {
    try {
        await Project.removeAll();
        logger.info({
            action: "Delete all projects",
            status: "Success",
            timestamp: new Date().toISOString(),
        });
        res.status(200).json({
            message: `All projects deleted successfully`,
        });
    } catch (err) {
        logger.error({
            action: "Delete all projects",
            status: "Error",
            error: err.message || err,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({
            message: "Error deleting all projects",
            error: err,
        });
    }
};

// Controller function to mark a project as favorite
export const markProjectAsFavorite = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Project.updateFavoriteById(id, { is_favorite: true });
        logger.info({
            action: "Mark project as favorite",
            projectId: id,
            status: "Success",
            timestamp: new Date().toISOString(),
        });
        res.status(200).json({
            message: `Project with id ${id} marked as favorite successfully`,
        });
    } catch (err) {
        if (err.kind === "not_found") {
            logger.warn({
                action: "Mark project as favorite",
                projectId: id,
                status: "Project Not Found",
                message: `Project not found with id ${id}`,
                timestamp: new Date().toISOString(),
            });
            return res.status(404).json({
                message: `Project not found with id ${id}`,
            });
        }
        logger.error({
            action: "Mark project as favorite",
            projectId: id,
            status: "Error",
            error: err.message || err,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({
            message: `Error marking project as favorite with id ${id}`,
            error: err,
        });
    }
};
