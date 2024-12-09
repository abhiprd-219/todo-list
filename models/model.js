import sql from './db.js';

class Task {
    constructor(task) {
        this.title = task.title;
        this.description = task.description;
        this.due_date = task.due_date;
        this.is_completed = task.is_completed;
        this.created_at = task.created_at;
    }

    // Method to fetch all tasks
    static getAll(result) {
        sql.query("SELECT * FROM tasks", (err, res) => {
            if (err) {
                console.log("Error retrieving tasks: ", err);
                result(err, null);
                return;
            }

            if (res.length === 0) {
                console.log("No tasks found.");
                result(null, []);
                return;
            }

            console.log("Tasks found: ", res);
            result(null, res);
        });
    }

    // Method to fetch a task by ID
    static findById(id, result) {
        sql.query("SELECT * FROM tasks WHERE id = ?", [id], (err, res) => {
            if (err) {
                console.log("Error retrieving task by ID: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("Task found: ", res[0]);
                result(null, res[0]);
                return;
            }

            console.log("Task not found with ID: ", id);
            result({ kind: "not_found" }, null);
        });
    }

    // Method to add a new task
    static create(newTask, result) {
        sql.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
            if (err) {
                console.log("Error creating task: ", err);
                result(err, null);
                return;
            }

            console.log("Created task: ", { id: res.insertId, ...newTask });
            result(null, { id: res.insertId, ...newTask });
        });
    }

    // Method to update a task by ID
    static updateById(id, task, result) {
        sql.query(
            "UPDATE tasks SET title = ?, description = ?, due_date = ?, is_completed = ? WHERE id = ?",
            [task.title, task.description, task.due_date, task.is_completed, id],
            (err, res) => {
                if (err) {
                    console.log("Error updating task: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows === 0) {
                    console.log("Task not found with ID: ", id);
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("Updated task: ", { id: id, ...task });
                result(null, { id: id, ...task });
            }
        );
    }

    // Method to delete a task by ID
    static remove(id, result) {
        sql.query("DELETE FROM tasks WHERE id = ?", [id], (err, res) => {
            if (err) {
                console.log("Error deleting task: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                console.log("Task not found with ID: ", id);
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Deleted task with ID: ", id);
            result(null, res);
        });
    }

    // Method to remove all tasks
    static removeAll(result) {
        sql.query("DELETE FROM tasks", (err, res) => {
            if (err) {
                console.log("Error deleting all tasks: ", err);
                result(null, err);
                return;
            }

            console.log(`Deleted ${res.affectedRows} tasks`);
            result(null, res);
        });
    }

    // Method to find all completed tasks
    static getAllCompleted(result) {
        sql.query("SELECT * FROM tasks WHERE is_completed = true", (err, res) => {
            if (err) {
                console.log("Error retrieving completed tasks: ", err);
                result(null, err);
                return;
            }

            if (res.length === 0) {
                console.log("No completed tasks found.");
                result(null, []);
                return;
            }

            console.log("Completed tasks found: ", res);
            result(null, res);
        });
    }

    // Method to find all tasks with a specific keyword in the title
    static findByTitle(title, result) {
        sql.query("SELECT * FROM tasks WHERE title LIKE ?", [`%${title}%`], (err, res) => {
            if (err) {
                console.log("Error retrieving tasks by title: ", err);
                result(err, null);
                return;
            }

            if (res.length === 0) {
                console.log("No tasks found with title containing: ", title);
                result(null, []);
                return;
            }

            console.log("Tasks found by title: ", res);
            result(null, res);
        });
    }
}

export default Task;
