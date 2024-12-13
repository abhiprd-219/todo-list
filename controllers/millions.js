import Task from '../models/millions.js'; // Path to the file with the `Project` class

Task.createFakeTasks((err, result) => {
    if (err) {
        console.error("Error creating fake projects:", err);
    } else {
        console.log(result.message);
    }
});
