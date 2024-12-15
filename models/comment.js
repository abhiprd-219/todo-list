// Model
import sql from './db.js';

class Comment {
    // Fetch all comments
    static getAll() {
        return new Promise((resolve, reject) => {
            sql.query('SELECT * FROM commentTable', (err, res) => {
                if (err) {
                    console.log("Error fetching comments: ", err);
                    reject(err);
                    return;
                }
                console.log("Comments retrieved: ", res);
                resolve(res);
            });
        });
    }

    // Fetch a single comment by ID
    static getById(id) {
        return new Promise((resolve, reject) => {
            sql.query('SELECT * FROM commentTable WHERE id = ?', [id], (err, res) => {
                if (err) {
                    console.log(`Error fetching comment with ID ${id}: `, err);
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    console.log(`No comment found with ID ${id}`);
                    resolve(null);
                    return;
                }
                console.log(`Comment retrieved with ID ${id}: `, res[0]);
                resolve(res[0]);
            });
        });
    }

    // Insert a new comment
    static create(content, project_id, task_id, user_id) {
        return new Promise((resolve, reject) => {
            sql.query(
                'INSERT INTO commentTable (content, project_id, task_id, user_id) VALUES (?, ?, ?, ?)',
                [content, project_id, task_id, user_id],
                (err, res) => {
                    if (err) {
                        console.log("Error inserting comment: ", err);
                        reject(err);
                        return;
                    }
                    console.log("Comment created: ", { id: res.insertId, content, project_id, task_id, user_id });
                    resolve({ id: res.insertId, content, project_id, task_id, user_id });
                }
            );
        });
    }

    // Update an existing comment
    static update(id, content, project_id, task_id) {
        return new Promise((resolve, reject) => {
            sql.query(
                'UPDATE commentTable SET content = ?, project_id = ?, task_id = ? WHERE id = ?',
                [content, project_id, task_id, id],
                (err, res) => {
                    if (err) {
                        console.log(`Error updating comment with ID ${id}: `, err);
                        reject(err);
                        return;
                    }
                    if (res.affectedRows === 0) {
                        console.log(`No comment found with ID ${id} to update.`);
                        resolve(null);
                        return;
                    }
                    console.log(`Comment updated with ID ${id}: `, { id, content, project_id, task_id });
                    resolve({ id, content, project_id, task_id });
                }
            );
        });
    }

    // Delete a comment by ID
    static delete(id) {
        return new Promise((resolve, reject) => {
            sql.query('DELETE FROM commentTable WHERE id = ?', [id], (err, res) => {
                if (err) {
                    console.log(`Error deleting comment with ID ${id}: `, err);
                    reject(err);
                    return;
                }
                if (res.affectedRows === 0) {
                    console.log(`No comment found with ID ${id} to delete.`);
                    resolve(null);
                    return;
                }
                console.log(`Comment deleted with ID ${id}`);
                resolve({ message: "Comment deleted successfully" });
            });
        });
    }

    // Delete all comments
    static deleteAll() {
        return new Promise((resolve, reject) => {
            sql.query('DELETE FROM commentTable', (err, res) => {
                if (err) {
                    console.log("Error deleting all comments: ", err);
                    reject(err);
                    return;
                }
                console.log("All comments deleted successfully");
                resolve(res);
            });
        });
    }
}

export default Comment;
