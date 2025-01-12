

const userRepo = require('../repository/user');

// Register User
 const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
        throw new Error("Email , password and username are required.");
      }
    const response = await userRepo.register(req);
    return response;
  } catch (error) {
    return  error
  }
};

// Login User
 const loginUser = async (req, res) => {
  try {
 
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("Email and password are required.");
      }
    const response = await userRepo.loginUser(email, password);
    if(response){
        return response;
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error(error || 'Error logging in user');
  }
};


module.exports = {
    register,
    loginUser
}