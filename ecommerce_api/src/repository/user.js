const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../model/user");

const SECRET_KEY = process.env.SECRET_VALUE_KEY

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw new Error("Error finding user by email");
  }
};

const createUser = async (payload) => {
  try {
    const newUser = await User.create(payload);
    return newUser;
  } catch (error) {
    throw new Error("Error creating new user");
  }
};

// Register User
const register = async (req) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let payload;
    if (role) {
      payload = {
        password : hashedPassword,
        role,
        username,
        email,
      };
    } else {
      payload = {
        password: hashedPassword,
        username,
        email,
      };
    }
    const newUser = await createUser(payload);

    return {
      message: "User registered successfully",
      user: newUser,
    };
  } catch (error) {
    throw new Error(error.message || "Error registering user");
  }
};

const loginUser = async (email, password) => {
  try {
   
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "2d" }
    );

    return {
      message: "Login successful",
      data: {
        ...user.dataValues,
        token: token,
      },
    };
  } catch (error) {
    throw new Error(error.message || "Error logging in user");
  }
};

module.exports = {
  register,
  loginUser,
};
