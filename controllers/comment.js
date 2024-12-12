import Comment from '../models/comment.js'; // Adjust the path as needed

// Controller function to get all comments
export const getAllComments = (req, res) => {
    Comment.getAll((err, data) => {
        if (err) {
            console.error("Error retrieving comments:", err);
            return res.status(500).json({
                message: "Error retrieving comments",
                error: err,
            });
        }

        if (data.length === 0) {
            return res.status(404).json({
                message: "No comments found",
            });
        }

        res.status(200).json(data);
    });
};


// Controller function to get a comment by ID
export const getCommentById = (req, res) => {
    const id = req.params.id;
    Comment.getById(id, (err, data) => {
        if (err) {
            console.error("Error retrieving comment:", err);
            return res.status(500).json({
                message: `Error retrieving comment with id ${id}`,
                error: err,
            });
        }

        if (!data) {
            return res.status(404).json({
                message: `Comment not found with id ${id}`,
            });
        }

        res.status(200).json(data);
    });
};

// Controller function to create a new comment
export const createComment = (req, res) => {
    const { content, project_id, task_id, user_id } = req.body;

    if (!content || !user_id || (!project_id && !task_id)) {
        return res.status(400).json({
            message: "Missing required fields: content, user_id, and either project_id or task_id",
        });
    }

    Comment.create(content, project_id, task_id, user_id, (err, data) => {
        if (err) {
            console.error("Error creating comment:", err);
            return res.status(500).json({
                message: "Error creating comment",
                error: err,
            });
        }

        res.status(201).json({
            message: "Comment created successfully",
            comment: data,
        });
    });
};
// Controller function to update a comment by ID
export const updateCommentById = (req, res) => {
    const id = req.params.id;
    const { content, project_id, task_id } = req.body;

    if (!content || !project_id || !task_id) {
        return res.status(400).json({
            message: "Missing required fields: content, project_id, task_id",
        });
    }

    Comment.update(id, content, project_id, task_id, (err, data) => {
        if (err) {
            console.error("Error updating comment:", err);
            return res.status(500).json({
                message: `Error updating comment with id ${id}`,
                error: err,
            });
        }

        if (!data) {
            return res.status(404).json({
                message: `Comment not found with id ${id}`,
            });
        }

        res.status(200).json({
            message: "Comment updated successfully",
            comment: data,
        });
    });
};

// Controller function to delete a comment by ID
export const deleteCommentById = (req, res) => {
    const id = req.params.id;

    Comment.delete(id, (err, data) => {
        if (err) {
            console.error("Error deleting comment:", err);
            return res.status(500).json({
                message: `Error deleting comment with id ${id}`,
                error: err,
            });
        }

        if (!data) {
            return res.status(404).json({
                message: `Comment not found with id ${id}`,
            });
        }

        res.status(200).json({
            message: `Comment with id ${id} deleted successfully`,
        });
    });
};

// Controller function to delete all comments
export const deleteAllComments = (req, res) => {
    Comment.deleteAll((err, data) => {
        if (err) {
            console.error("Error deleting all comments:", err);
            return res.status(500).json({
                message: "Error deleting all comments",
                error: err,
            });
        }

        res.status(200).json({
            message: "All comments deleted successfully",
        });
    });
};

