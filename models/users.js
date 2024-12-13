import sql from './db.js';

class User {
    // Fetch all users
    static getAll(result) {
        sql.query('SELECT * FROM usersTable', (err, res) => {
            if (err) {
                console.log("Error fetching users: ", err);
                result(err, null);
                return;
            }
            console.log("users retrieved: ", res);
            result(null, res);
        });
    }

    // Fetch a single users by ID
    static getById(id, result) {
        sql.query('SELECT * FROM usersTable WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.log(`Error fetching users with ID ${id}: `, err);
                result(err, null);
                return;
            }
            if (res.length === 0) {
                console.log(`No users found with ID ${id}`);
                result(null, []);
                return;
            }
            console.log(`Users retrieved with ID ${id}: `, res[0]);
            result(null, res[0]);
        });
    }

    // Insert a new users
    static create(name,email, result) {
        sql.query(
            'INSERT INTO usersTable (name,email) VALUES (?, ?)',
            [name,email],
            (err, res) => {
                if (err) {
                    console.log("Error inserting users: ", err);
                    result(err, null);
                    return;
                }
                console.log("Users created: ", { id: res.insertId, name,email});
                result(null, { id: res.insertId, name,email });
            }
        );
    }

    // Update an existing users
    static update(id, name,email, result) {
        sql.query(
            'UPDATE usersTable SET name = ?, email = ? WHERE id = ?',
            [name,email, id],
            (err, res) => {
                if (err) {
                    console.log(`Error updating users with ID ${id}: `, err);
                    result(err, null);
                    return;
                }
                if (res.affectedRows === 0) {
                    console.log(`No users found with ID ${id} to update.`);
                    result(null, { message: "No record found to update" });
                    return;
                }
                console.log(`users updated with ID ${id}: `, { id, name,email });
                result(null, { id, name,email});
            }
        );
    }

    // Delete a users by ID
    static delete(id, result) {
        sql.query('DELETE FROM usersTable WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.log(`Error deleting users with ID ${id}: `, err);
                result(err, null);
                return;
            }
            if (res.affectedRows === 0) {
                console.log(`No user found with ID ${id} to delete.`);
                result(null, { message: "No record found to delete" });
                return;
            }
            console.log(`user deleted with ID ${id}`);
            result(null, { message: "User deleted successfully" });
        });
    }
}

export default User;






