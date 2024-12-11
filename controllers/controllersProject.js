import Project from '../models/projectssModel.js';

// Controller function to get all projects
export const getAllProjects = (req, res) => {
    Project.getAll((err, data) => {
        if (err) {
            console.error("Error retrieving projects:", err);
            return res.status(500).json({
                message: "Error retrieving projects",
                error: err,
            });
        }

        if (data.length === 0) {
            return res.status(404).json({
                message: "No projects found",
            });
        }

        res.status(200).json(data);
    });
};

// Controller function to get a project by ID
export const getProjectById = (req, res) => {
    const id = req.params.id;
    Project.findById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    message: `Project not found with id ${id}`,
                });
            }

            console.error("Error retrieving project:", err);
            return res.status(500).json({
                message: `Error retrieving project with id ${id}`,
                error: err,
            });
        }

        res.status(200).json(data);
    });
};

// Controller function to create a new project
export const createProject = (req, res) => {
    const newProject = new Project(req.body);

    Project.create(newProject, (err, data) => {
        if (err) {
            console.error("Error creating project:", err);
            return res.status(500).json({
                message: "Error creating project",
                error: err,
            });
        }

        res.status(201).json(data);
    });
};

// Controller function to update a project by ID
export const updateProjectById = (req, res) => {
    const id = req.params.id;
    const project = new Project(req.body);

    Project.updateById(id, project, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    message: `Project not found with id ${id}`,
                });
            }

            console.error("Error updating project:", err);
            return res.status(500).json({
                message: `Error updating project with id ${id}`,
                error: err,
            });
        }

        res.status(200).json(data);
    });
};

// Controller function to delete a project by ID
export const deleteProjectById = (req, res) => {
    const id = req.params.id;

    Project.remove(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    message: `Project not found with id ${id}`,
                });
            }

            console.error("Error deleting project:", err);
            return res.status(500).json({
                message: `Error deleting project with id ${id}`,
                error: err,
            });
        }

        res.status(200).json({
            message: `Project with id ${id} deleted successfully`,
        });
    });
};

// Controller function to delete all projects
export const deleteAllProjects = (req, res) => {
    Project.removeAll((err, data) => {
        if (err) {
            console.error("Error deleting all projects:", err);
            return res.status(500).json({
                message: "Error deleting all projects",
                error: err,
            });
        }

        res.status(200).json({
            message: `All projects deleted successfully`,
        });
    });
};

// Controller function to mark a project as favorite
export const markProjectAsFavorite = (req, res) => {
    const id = req.params.id;

    Project.updateFavoriteById(
        id,
        { is_favorite: true },
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).json({
                        message: `Project not found with id ${id}`,
                    });
                }

                console.error("Error marking project as favorite:", err);
                return res.status(500).json({
                    message: `Error marking project as favorite with id ${id}`,
                    error: err,
                });
            }

            res.status(200).json({
                message: `Project with id ${id} marked as favorite successfully`,
            });
        }
    );
};
