import sql from './db.js';

class Project {
    constructor(project) {
        this.name = project.name;
        this.color = project.color;
        this.is_favorite = project.is_favorite;
        this.created_at = project.created_at;
    }

    // Fetch all projects
    static getAll(result) {
        sql.query("SELECT * FROM projects", (err, res) => {
            if (err) {
                console.log("Error retrieving projects: ", err);
                result(err, null);
                return;
            }

            console.log("Projects found: ", res);
            result(null, res);
        });
    }

    // Fetch a single project by ID
    static findById(id, result) {
        const query = `
            SELECT 
                projects.*, 
                tasks.id AS task_id, 
                tasks.title AS task_name
                FROM 
                projects
            LEFT JOIN 
                tasks 
            ON 
                projects.id = tasks.project_id
            WHERE 
                projects.id = ?`;
    
        sql.query(query, [id], (err, res) => {
            if (err) {
                console.log("Error retrieving project by ID: ", err);
                result(err, null);
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
                    }))
                };
    
                console.log("Project with tasks found: ", project);
                result(null, project);
                return;
            }
    
            console.log("Project not found with ID: ", id);
            result({ kind: "not_found" }, null);
        });
    }
    

    // Create a new project
    static create(newProject, result) {
        sql.query("INSERT INTO projects SET ?", newProject, (err, res) => {
            if (err) {
                console.log("Error creating project: ", err);
                result(err, null);
                return;
            }

            console.log("Created project: ", { id: res.insertId, ...newProject });
            result(null, { id: res.insertId, ...newProject });
        });
    }

    // Update a project by ID
    static updateById(id, project, result) {
        sql.query(
            "UPDATE projects SET name = ?, color = ?, is_favorite = ? WHERE id = ?",
            [project.name, project.color, project.is_favorite, id],
            (err, res) => {
                if (err) {
                    console.log("Error updating project: ", err);
                    result(err, null);
                    return;
                }

                if (res.affectedRows === 0) {
                    console.log("Project not found with ID: ", id);
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("Updated project: ", { id: id, ...project });
                result(null, { id: id, ...project });
            }
        );
    }



    static updateFavoriteById(id, project, result) {
        sql.query(
            "UPDATE projects SET  is_favorite = ? WHERE id = ?",
            [project.is_favorite, id],
            (err, res) => {
                if (err) {
                    console.log("Error updating project: ", err);
                    result(err, null);
                    return;
                }

                if (res.affectedRows === 0) {
                    console.log("Project not found with ID: ", id);
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("Updated project: ", { id: id, ...project });
                result(null, { id: id, ...project });
            }
        );
    }


    // Delete a project by ID
    static remove(id, result) {
        sql.query("DELETE FROM projects WHERE id = ?", [id], (err, res) => {
            if (err) {
                console.log("Error deleting project: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows === 0) {
                console.log("Project not found with ID: ", id);
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Deleted project with ID: ", id);
            result(null, res);
        });
    }

    // Delete all projects
    static removeAll(result) {
        sql.query("DELETE FROM projects", (err, res) => {
            if (err) {
                console.log("Error deleting all projects: ", err);
                result(err, null);
                return;
            }

            console.log(`Deleted ${res.affectedRows} projects`);
            result(null, res);
        });
    }
}

export default Project;
