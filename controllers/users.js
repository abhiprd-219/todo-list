import User from '../models/users.js'; // Adjust the path as needed

// Controller function to get all users
export const getAllUsers = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            console.error("Error retrieving users:", err);
            return res.status(500).json({
                message: "Error retrieving users",
                error: err,
            });
        }

        if (data.length === 0) {
            return res.status(404).json({
                message: "No users found",
            });
        }

        res.status(200).json(data);
    });
};


// Controller function to get a users by ID
export const getUserById = (req, res) => {
    const id = req.params.id;
    User.getById(id, (err, data) => {
        if (err) {
            console.error("Error retrieving users:", err);
            return res.status(500).json({
                message: `Error retrieving users with id ${id}`,
                error: err,
            });
        }

        if (!data) {
            return res.status(404).json({
                message: `users not found with id ${id}`,
            });
        }

        res.status(200).json(data);
    });
};

// Controller function to create a new users
export const createUser = (req, res) => {
    const { name,email} = req.body;

    if ((!name || !email)) {
        return res.status(400).json({
            message: "Missing required fields: name,email",
        });
    }

    User.create(name,email, (err, data) => {
        if (err) {
            console.error("Error creating user:", err);
            return res.status(500).json({
                message: "Error creating user",
                error: err,
            });
        }

        res.status(201).json({
            message: "user created successfully",
            comment: data,
        });
    });
};
// Controller function to update a user by ID
export const updateUserById = (req, res) => {
    const id = req.params.id;
    const { name,email} = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Missing required fields: name,email",
        });
    }

    User.update(id, name, email, (err, data) => {
        if (err) {
            console.error("Error updating user:", err);
            return res.status(500).json({
                message: `Error updating user with id ${id}`,
                error: err,
            });
        }

        if (!data) {
            return res.status(404).json({
                message: `User not found with id ${id}`,
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: data,
        });
    });
};

// Controller function to delete a user by ID
export const deleteUserById = (req, res) => {
    const id = req.params.id;

    User.delete(id, (err, data) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).json({
                message: `Error deleting user with id ${id}`,
                error: err,
            });
        }

        if (!data) {
            return res.status(404).json({
                message: `User not found with id ${id}`,
            });
        }

        res.status(200).json({
            message: `User with id ${id} deleted successfully`,
        });
    });
};


