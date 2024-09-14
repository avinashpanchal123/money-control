require('dotenv').config(); // for loading environment variables
const express = require('express');
// const {Server} = require('socket.io')
// const {createServer} = require('http')
const app = express();
// const server = createServer(app)
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cors = require("cors")

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // allow the frontend's origin
//     methods: ["GET", "POST"], // specify allowed methods
//     // credentials: true, // if you're using cookies or authentication
//   },
// });

// const userRoutes = require('./routes/userRoutes');
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
//app.use('/users', userRoutes); // Example user route

app.use('/category', categoryRoutes);

// app.get('/', (req, res) => {
//   res.send("Hello World!");
// });


// io.on('connection',(socket)=>{

//   socket.on('joinRoom',(roomId)=>{
//     socket.join(roomId)
//     console.log(`joined the group :${roomId}`)
//   })
//  socket.on('transactions',(data)=>{
//   const { roomId, transaction } = data;
//     console.log(`Transaction Data Received for room ${roomId}:`, transaction);
//     io.to(roomId).emit('updateData', transaction);
//    })
//   socket.on('disconnect',()=>{
//     console.log("connection to socket is disconneced")
//   })

// })
const PORT = process.env.app_port || 5141;
app.listen(PORT, async() => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
