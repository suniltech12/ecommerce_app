const jwt = require('jsonwebtoken');
const { User } = require('../../model/user'); 

const SECRET_KEY = process.env.SECRET_VALUE_KEY;

const auth = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userExists = await User.findByPk(decoded.id);
    if (!userExists) {
      return res.status(401).json({ message: 'User not found or deactivated' });
    }
    req.user = userExists.dataValues
    next();
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = auth;
