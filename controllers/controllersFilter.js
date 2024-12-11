import Task from '../models/filter.js'; // Import the Task model

// Unified filter method for tasks
export const filterTasks = (req, res) => {
    const { project_id, due_date, is_completed } = req.query;

    if (!project_id && !due_date && is_completed === undefined) {
        return res.status(400).json({
            message: "At least one filter (project_id, due_date, or is_completed) is required.",
        });
    }

    let query = 'SELECT project_id, due_date, is_completed, created_at FROM tasks WHERE';
    const queryParams = [];

    // Add conditions dynamically based on provided parameters
    if (project_id) {
        query += ' project_id = ? AND';
        queryParams.push(project_id);
    }
    if (due_date) {
        query += ' due_date = ? AND';
        queryParams.push(due_date);
    }
    if (is_completed !== undefined) {
        query += ' is_completed = ? AND';
        queryParams.push(is_completed);
    }

    // Remove trailing 'AND'
    query = query.slice(0, -4);

    Task.filterTasks(query, queryParams, (err, data) => {
        if (err) {
            console.log("Error retrieving tasks: ", err);
            return res.status(500).json({
                message: "Error retrieving tasks",
                error: err,
            });
        }
        if (!data.length) {
            return res.status(404).json({
                message: "No tasks found for the given filters",
            });
        }
        res.status(200).json(data);
    });
};
