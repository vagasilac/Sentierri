const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the token from the 'Authorization' header
    const authHeader = req.headers.authorization;
  
    // If there's no token, return a 401 Unauthorized status
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // Extract the token from the 'Authorization' header
    const token = authHeader.split(' ')[1];
  
    // Verify the token and handle errors
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
  