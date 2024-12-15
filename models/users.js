// Model
import sql from './db.js';

class User {
    static getAll() {
        return new Promise((resolve, reject) => {
            sql.query('SELECT * FROM usersTable', (err, res) => {
                if (err) {
                    console.log("Error fetching users: ", err);
                    reject(err);
                    return;
                }
                console.log("Users retrieved: ", res);
                resolve(res);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            sql.query('SELECT * FROM usersTable WHERE id = ?', [id], (err, res) => {
                if (err) {
                    console.log(`Error fetching user with ID ${id}: `, err);
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    console.log(`No user found with ID ${id}`);
                    resolve(null);
                    return;
                }
                console.log(`User retrieved with ID ${id}: `, res[0]);
                resolve(res[0]);
            });
        });
    }

    static create(name, email) {
        return new Promise((resolve, reject) => {
            sql.query('INSERT INTO usersTable (name, email) VALUES (?, ?)', [name, email], (err, res) => {
                if (err) {
                    console.log("Error inserting user: ", err);
                    reject(err);
                    return;
                }
                console.log("User created: ", { id: res.insertId, name, email });
                resolve({ id: res.insertId, name, email });
            });
        });
    }

    static update(id, name, email) {
        return new Promise((resolve, reject) => {
            sql.query('UPDATE usersTable SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, res) => {
                if (err) {
                    console.log(`Error updating user with ID ${id}: `, err);
                    reject(err);
                    return;
                }
                if (res.affectedRows === 0) {
                    console.log(`No user found with ID ${id} to update.`);
                    resolve(null);
                    return;
                }
                console.log(`User updated with ID ${id}: `, { id, name, email });
                resolve({ id, name, email });
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            sql.query('DELETE FROM usersTable WHERE id = ?', [id], (err, res) => {
                if (err) {
                    console.log(`Error deleting user with ID ${id}: `, err);
                    reject(err);
                    return;
                }
                if (res.affectedRows === 0) {
                    console.log(`No user found with ID ${id} to delete.`);
                    resolve(null);
                    return;
                }
                console.log(`User deleted with ID ${id}`);
                resolve({ message: "User deleted successfully" });
            });
        });
    }
}

export default User;