import sql from './db.js';

class Comment {
    // Fetch all comments
    static getAll(result) {
        sql.query('SELECT * FROM commentTable', (err, res) => {
            if (err) {
                console.log("Error fetching comments: ", err);
                result(err, null);
                return;
            }
            console.log("Comments retrieved: ", res);
            result(null, res);
        });
    }

    // Fetch a single comment by ID
    static getById(id, result) {
        sql.query('SELECT * FROM commentTable WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.log(`Error fetching comment with ID ${id}: `, err);
                result(err, null);
                return;
            }
            if (res.length === 0) {
                console.log(`No comment found with ID ${id}`);
                result(null, []);
                return;
            }
            console.log(`Comment retrieved with ID ${id}: `, res[0]);
            result(null, res[0]);
        });
    }

    // Insert a new comment
    static create(content, project_id, task_id, user_id, result) {
        sql.query(
            'INSERT INTO commentTable (content, project_id, task_id, user_id) VALUES (?, ?, ?, ?)',
            [content, project_id, task_id, user_id],
            (err, res) => {
                if (err) {
                    console.log("Error inserting comment: ", err);
                    result(err, null);
                    return;
                }
                console.log("Comment created: ", { id: res.insertId, content, project_id, task_id, user_id });
                result(null, { id: res.insertId, content, project_id, task_id, user_id });
            }
        );
    }

    // Update an existing comment
    static update(id, content, project_id, task_id, result) {
        sql.query(
            'UPDATE commentTable SET content = ?, project_id = ?, task_id = ? WHERE id = ?',
            [content, project_id, task_id, id],
            (err, res) => {
                if (err) {
                    console.log(`Error updating comment with ID ${id}: `, err);
                    result(err, null);
                    return;
                }
                if (res.affectedRows === 0) {
                    console.log(`No comment found with ID ${id} to update.`);
                    result(null, { message: "No record found to update" });
                    return;
                }
                console.log(`Comment updated with ID ${id}: `, { id, content, project_id, task_id });
                result(null, { id, content, project_id, task_id });
            }
        );
    }

    // Delete a comment by ID
    static delete(id, result) {
        sql.query('DELETE FROM commentTable WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.log(`Error deleting comment with ID ${id}: `, err);
                result(err, null);
                return;
            }
            if (res.affectedRows === 0) {
                console.log(`No comment found with ID ${id} to delete.`);
                result(null, { message: "No record found to delete" });
                return;
            }
            console.log(`Comment deleted with ID ${id}`);
            result(null, { message: "Comment deleted successfully" });
        });
    }
}

export default Comment;






