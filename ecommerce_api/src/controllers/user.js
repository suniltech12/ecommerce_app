const userService = require('../service/user');

// Register User
 const register = async (req, res) => {
  try {
    const response = await userService.register(req);
    return res.status(201).json(response);
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

// Login User
 const loginUser = async (req, res) => {
  try {
    const response = await userService.loginUser(req);
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};


module.exports = {
    register,
    loginUser
}