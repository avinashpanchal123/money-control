require('dotenv').config(); // for loading environment variables
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
//app.use('/users', userRoutes); // Example user route

app.get('/', (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.app_port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
