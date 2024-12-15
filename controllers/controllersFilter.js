import Task from '../models/filter.js'; // Import the Task model
import logger from '../logger.js'; // Import logger

// Unified filter method for tasks
export const filterTasks = async (req, res) => {
    const { project_id, due_date, is_completed } = req.query;

    if (!project_id && !due_date && !is_completed) {
        logger.warn({
            action: "Filter tasks",
            status: "Validation Error",
            message: "No filter parameters provided",
            timestamp: new Date().toISOString(),
        });
        return res.status(400).json({
            message: "At least one filter (project_id, due_date, or is_completed) is required.",
        });
    }

    let query = 'SELECT id, project_id, due_date, is_completed, created_at FROM tasks WHERE';
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

    try {
        // Use the Promises-based filterTasks method
        const data = await Task.filterTasks(query, queryParams);

        if (!data.length) {
            logger.warn({
                action: "Filter tasks",
                status: "No Results Found",
                filters: { project_id, due_date, is_completed },
                timestamp: new Date().toISOString(),
            });
            return res.status(404).json({
                message: "No tasks found for the given filters",
            });
        }

        logger.info({
            action: "Filter tasks",
            status: "Success",
            filters: { project_id, due_date, is_completed },
            resultCount: data.length,
            timestamp: new Date().toISOString(),
        });
        res.status(200).json(data);
    } catch (error) {
        logger.error({
            action: "Filter tasks",
            status: "Error",
            filters: { project_id, due_date, is_completed },
            error: error.message || error,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({
            message: "Error retrieving tasks",
            error: error.message || error,
        });
    }
};
