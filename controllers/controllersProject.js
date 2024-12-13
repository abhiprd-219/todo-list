import Project from '../models/projectssModel.js';

// Controller function to get all projects
export const getAllProjects = async (req, res) => {
    try {
        const data = await Project.getAll();
        if (data.length === 0) {
            return res.status(404).json({
                message: "No projects found",
            });
        }
        res.status(200).json(data);
    } catch (err) {
        console.error("Error retrieving projects:", err);
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
        res.status(200).json(data);
    } catch (err) {
        if (err.kind === "not_found") {
            return res.status(404).json({
                message: `Project not found with id ${id}`,
            });
        }
        console.error("Error retrieving project:", err);
        res.status(500).json({
            message: `Error retrieving project with id ${id}`,
            error: err,
        });
    }
};

// Controller function to create a new project
export const createProject = async (req, res) => {
    const newProject = new Project(req.body);
    try {
        const data = await Project.create(newProject);
        res.status(201).json(data);
    } catch (err) {
        console.error("Error creating project:", err);
        res.status(500).json({
            message: "Error creating project",
            error: err,
        });
    }
};

// Controller function to update a project by ID
export const updateProjectById = async (req, res) => {
    const id = req.params.id;
    const project = new Project(req.body);
    try {
        const data = await Project.updateById(id, project);
        res.status(200).json(data);
    } catch (err) {
        if (err.kind === "not_found") {
            return res.status(404).json({
                message: `Project not found with id ${id}`,
            });
        }
        console.error("Error updating project:", err);
        res.status(500).json({
            message: `Error updating project with id ${id}`,
            error: err,
        });
    }
};

// Controller function to delete a project by ID
export const deleteProjectById = async (req, res) => {
    const id = req.params.id;
    try {
        await Project.remove(id);
        res.status(200).json({
            message: `Project with id ${id} deleted successfully`,
        });
    } catch (err) {
        if (err.kind === "not_found") {
            return res.status(404).json({
                message: `Project not found with id ${id}`,
            });
        }
        console.error("Error deleting project:", err);
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
        res.status(200).json({
            message: `All projects deleted successfully`,
        });
    } catch (err) {
        console.error("Error deleting all projects:", err);
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
        res.status(200).json({
            message: `Project with id ${id} marked as favorite successfully`,
        });
    } catch (err) {
        if (err.kind === "not_found") {
            return res.status(404).json({
                message: `Project not found with id ${id}`,
            });
        }
        console.error("Error marking project as favorite:", err);
        res.status(500).json({
            message: `Error marking project as favorite with id ${id}`,
            error: err,
        });
    }
};
