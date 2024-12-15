import sql from './db.js';

class Task {
    // Method to fetch tasks based on dynamic filters
    static filterTasks(query, params) {
        return new Promise((resolve, reject) => {
            sql.query(query, params, (err, res) => {
                if (err) {
                    console.error("Error executing dynamic filter query:", err);
                    reject(err);
                    return;
                }

                if (res.length === 0) {
                    console.log("No tasks found for the given filters.");
                    resolve([]);
                    return;
                }

                console.log("Filtered tasks:", res);
                resolve(res);
            });
        });
    }
}

export default Task;
