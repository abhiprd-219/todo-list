// Controller
import Comment from '../models/comment.js';
import { commentsSchema } from '../validation/comments.js';
import { contentSchema } from '../validation/comments.js';
import logger from '../logger.js'; // Import the logger


// Controller function to get all comments
export const getAllComments = async (req, res) => {
    try {
        const data = await Comment.getAll();
        if (data.length === 0) {
            return res.status(404).json({ message: "No comments found" });
        }
        res.status(200).json(data);
    } catch (err) {
        console.error("Error retrieving comments:", err);
        res.status(500).json({ message: "Error retrieving comments", error: err });
    }
};

// Controller function to get a comment by ID
export const getCommentById = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Comment.getById(id);
        if (!data) {
            return res.status(404).json({ message: `Comment not found with id ${id}` });
        }
        res.status(200).json(data);
    } catch (err) {
        console.error("Error retrieving comment:", err);
        res.status(500).json({ message: `Error retrieving comment with id ${id}`, error: err });
    }
};

// Controller function to create a new comment

export const createComment = async (req, res) => {
    try {
        // Validate request body
        await commentsSchema.validate(req.body);

        const { content, project_id, task_id, user_id } = req.body;

        // Create new comment
        const data = await Comment.create(content, project_id, task_id, user_id);
        res.status(201).json({
            message: "Comment created successfully",
            comment: data,
        });
    } catch (err) {
        console.error("Error creating comment:", err);

        // Check if error is from validation
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.errors.join(", ") });
        }

        res.status(500).json({ message: "Internal server error", error: err });
    }
};


// Controller function to update a comment by ID

export const updateCommentById = async (req, res) => {
    const id = req.params.id;

    try {
        // Validate request body
        await contentSchema.validate(req.body);

        const { content, project_id, task_id } = req.body;

        // Update comment
        const data = await Comment.update(id, content, project_id, task_id);
        if (!data) {
            return res.status(404).json({ message: `Comment not found with id ${id}` });
        }
        res.status(200).json({
            message: "Comment updated successfully",
            comment: data,
        });
    } catch (err) {
        console.error("Error updating comment:", err);

        // Check if error is from validation
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.errors.join(", ") });
        }

        res.status(500).json({ message: "Internal server error", error: err });
    }
};


// Controller function to delete a comment by ID
export const deleteCommentById = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await Comment.delete(id);
        if (!data) {
            return res.status(404).json({ message: `Comment not found with id ${id}` });
        }
        res.status(200).json({
            message: `Comment with id ${id} deleted successfully`,
        });
    } catch (err) {
        console.error("Error deleting comment:", err);
        res.status(500).json({ message: `Error deleting comment with id ${id}`, error: err });
    }
};

// Controller function to delete all comments
export const deleteAllComments = async (req, res) => {
    try {
        await Comment.deleteAll();
        res.status(200).json({ message: "All comments deleted successfully" });
    } catch (err) {
        console.error("Error deleting all comments:", err);
        res.status(500).json({ message: "Error deleting all comments", error: err });
    }
};