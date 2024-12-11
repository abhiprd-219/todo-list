import sql from './db.js';

class Task {
    // Method to fetch tasks based on dynamic filters
    static filterTasks(query, params, result) {
        sql.query(query, params, (err, res) => {
            if (err) {
                console.log("Error executing dynamic filter query: ", err);
                result(err, null);
                return;
            }

            if (res.length === 0) {
                console.log("No tasks found for the given filters.");
                result(null, []);
                return;
            }

            console.log("Filtered tasks: ", res);
            result(null, res);
        });
    }
}

export default Task;