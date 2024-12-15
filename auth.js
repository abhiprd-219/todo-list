import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key_here'; // Replace with a strong key or ENV variable

// Generate a JWT token
export const generateToken = (user) => {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified; // Attach user info to request
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
};
