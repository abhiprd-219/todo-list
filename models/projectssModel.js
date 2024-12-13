import sql from './db.js';

class Project {
    constructor(project) {
        this.name = project.name;
        this.color = project.color;
        this.is_favorite = project.is_favorite;
        this.created_at = project.created_at;
    }

    // Fetch all projects
    static getAll() {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM projects", (err, res) => {
                if (err) {
                    console.log("Error retrieving projects: ", err);
                    reject(err);
                    return;
                }

                console.log("Projects found: ", res);
                resolve(res);
            });
        });
    }

    // Fetch a single project by ID
    static findById(id) {
        const query = `
            SELECT 
                projects.*, 
                tasks.id AS task_id, 
                tasks.title AS task_name,
                color,is_favorite
                FROM 
                projects
            LEFT JOIN 
                tasks 
            ON 
                projects.id = tasks.project_id
            WHERE 
                projects.id = ?`;

        return new Promise((resolve, reject) => {
            sql.query(query, [id], (err, res) => {
                if (err) {
                    console.log("Error retrieving project by ID: ", err);
                    reject(err);
                    return;
                }

                if (res.length) {
                    const project = {
                        id: res[0].id,
                        name: res[0].name,
                        description: res[0].description,
                        tasks: res.filter(row => row.task_id).map(task => ({
                            id: task.task_id,
                            name: task.task_name,
                            status: task.task_status
                        })),
                        color: res[0].color,
                        is_favorite: res[0].is_favorite

                    };

                    console.log("Project with tasks found: ", project);
                    resolve(project);
                    return;
                }

                console.log("Project not found with ID: ", id);
                reject({ kind: "not_found" });
            });
        });
    }

    // Create a new project
    static create(newProject) {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO projects SET ?", newProject, (err, res) => {
                if (err) {
                    console.log("Error creating project: ", err);
                    reject(err);
                    return;
                }

                console.log("Created project: ", { id: res.insertId, ...newProject });
                resolve({ id: res.insertId, ...newProject });
            });
        });
    }

    // Update a project by ID
    static updateById(id, project) {
        return new Promise((resolve, reject) => {
            sql.query(
                "UPDATE projects SET name = ?, color = ?, is_favorite = ? WHERE id = ?",
                [project.name, project.color, project.is_favorite, id],
                (err, res) => {
                    if (err) {
                        console.log("Error updating project: ", err);
                        reject(err);
                        return;
                    }

                    if (res.affectedRows === 0) {
                        console.log("Project not found with ID: ", id);
                        reject({ kind: "not_found" });
                        return;
                    }

                    console.log("Updated project: ", { id: id, ...project });
                    resolve({ id: id, ...project });
                }
            );
        });
    }

    // Update favorite by project ID
    static updateFavoriteById(id, project) {
        return new Promise((resolve, reject) => {
            sql.query(
                "UPDATE projects SET is_favorite = ? WHERE id = ?",
                [project.is_favorite, id],
                (err, res) => {
                    if (err) {
                        console.log("Error updating project: ", err);
                        reject(err);
                        return;
                    }

                    if (res.affectedRows === 0) {
                        console.log("Project not found with ID: ", id);
                        reject({ kind: "not_found" });
                        return;
                    }

                    console.log("Updated project: ", { id: id, ...project });
                    resolve({ id: id, ...project });
                }
            );
        });
    }

    // Delete a project by ID
    static remove(id) {
        return new Promise((resolve, reject) => {
            sql.query("DELETE FROM projects WHERE id = ?", [id], (err, res) => {
                if (err) {
                    console.log("Error deleting project: ", err);
                    reject(err);
                    return;
                }

                if (res.affectedRows === 0) {
                    console.log("Project not found with ID: ", id);
                    reject({ kind: "not_found" });
                    return;
                }

                console.log("Deleted project with ID: ", id);
                resolve(res);
            });
        });
    }

    // Delete all projects
    static removeAll() {
        return new Promise((resolve, reject) => {
            sql.query("DELETE FROM projects", (err, res) => {
                if (err) {
                    console.log("Error deleting all projects: ", err);
                    reject(err);
                    return;
                }

                console.log(`Deleted ${res.affectedRows} projects`);
                resolve(res);
            });
        });
    }
}

export default Project;
