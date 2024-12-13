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
    static getAll() {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM tasks", (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    }

    // Method to fetch a task by ID
    static findById(id) {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM tasks WHERE id = ?", [id], (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (res.length) {
                    resolve(res[0]);
                } else {
                    reject({ kind: "not_found" });
                }
            });
        });
    }

    // Method to add a new task
    static create(newTask) {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve({ id: res.insertId, ...newTask });
            });
        });
    }

    // Method to update a task by ID
    static updateById(id, task) {
        return new Promise((resolve, reject) => {
            sql.query(
                "UPDATE tasks SET title = ?, description = ?, due_date = ?, is_completed = ? WHERE id = ?",
                [task.title, task.description, task.due_date, task.is_completed, id],
                (err, res) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (res.affectedRows === 0) {
                        reject({ kind: "not_found" });
                    } else {
                        resolve({ id, ...task });
                    }
                }
            );
        });
    }

    // Method to delete a task by ID
    static remove(id) {
        return new Promise((resolve, reject) => {
            sql.query("DELETE FROM tasks WHERE id = ?", [id], (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (res.affectedRows === 0) {
                    reject({ kind: "not_found" });
                } else {
                    resolve(res);
                }
            });
        });
    }

    // Method to remove all tasks
    static removeAll() {
        return new Promise((resolve, reject) => {
            sql.query("DELETE FROM tasks", (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    }

    // Method to find all completed tasks
    static getAllCompleted() {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM tasks WHERE is_completed = true", (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    }

    // Method to find tasks with a specific keyword in the title
    static findByTitle(title) {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM tasks WHERE title LIKE ?", [`%${title}%`], (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    }
}

export default Task;
