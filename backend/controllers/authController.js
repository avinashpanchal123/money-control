require('dotenv').config(); // for loading environment variables
const jwt = require('jsonwebtoken');
const User = require('../db/models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const privateKey = process.env.JWT_PRIVATE_KEY;

// Authenticate Token Middleware
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, privateKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.send("User not found");

  const result = await bcrypt.compare(password, user.password);
  if (!result) return res.send("Incorrect password");

  const token = jwt.sign({ username: user.username, email }, privateKey, { expiresIn: '1h' });
  res.json({ token });
};

// Register Controller
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) return res.send("All credentials are required");

  const userExists = await User.findOne({ where: { email } });
  if (userExists) return res.send("User already exists");

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      mobile_number: 1234567890
    });
    res.json({ "msg": "Sigup Successful" });      
  } catch (error) {
    res.json({"msg" :"Something Went Wrong Try Again"})
  }

  // const accessToken = jwt.sign({ username: newUser.username, email: newUser.email }, privateKey, { expiresIn: '15m' });
  // res.json({ accessToken });
  
};

// Protected Route
exports.protectedRoute = (req, res) => {
  res.send("Access granted to protected route!");
};
