const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const User = require('./db/models/user');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const privateKey = 'Uz6gxZ/+NIuMwe1mcBMngBJEb0gUo0+0m1Ocd76USgqzOCeebNJwwtzZiro7WkIpkIWq+tuIFIfY/RDlab/woIhyANx7hz6MyV+6k81DJ2dA8eyvTPqlp5iVGbs2numR5IDvNbEJkOXkHNtFgxWfhAgbJnvuc575Ha0xqCwEIAYrj2L1SbMccixaBliCvhApOGhCPo/+zftlw9CM9Lgf4rhmXHIqjKkLmFRe2BweiJ6rRK++voMGNnHUHAOIZ0ng7uNN5u4icTSimjlnj5XzDXTpf3lAsGxtl43U65cUWU5tX11WnUFkJHsC+fsa1Jigpf/GubaBFX+/HemW7fy3RA==';


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async(req, res)=>{
  res.send("hello world")
})

const authenticateToken = (req, res, next)=>{
  const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1]; 
  const token = authHeader
  if(!token)
    res.sendStatus(401)
  jwt.verify(token, privateKey, (err, user)=>{
    if(!!err)res.sendStatus(403)
    req.user = user;
    next()  
  })
}


app.get('/protected', authenticateToken , (req,res)=>{
  console.log(req);
})

app.post('/register', async (req, res)=>{
  const {username, email, password} = req.body;
  if(!(!!username && !!email && !!password)){
    res.send("All creadentials are required")
  }
  const user = await User.findOne({
    where : {email: email}
  })

  if(!!user && !!(await bcrypt.compare(user.password_hash, password))){
    res.send('user already present')
  }
  else if(!!user){
    res.send("incorrect password")
  }
  else{
    const encriptedPass = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      username: username,
      password_hash : encriptedPass,
      email: email,
      mobile_number: 1234567890
    });
    user.password_hash = null;
    user.mobile_number = null;

    const accessToken = jwt.sign({
      username: user.username,
      email: user.email
    }, privateKey, {
      expiresIn: "15m"
    })
    res.json({
    accessToken
    })
  }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});