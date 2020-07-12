const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/Users")
users.use(cors())
process.env.SECRET_KEY = 'secret'

//register
users.post('/register',(req,res) => {
// const today = new Date() 
const userData = {
    email : req.body.email,
    userName :req.body.userName,
    password :req.body.password,
    age:req.body.age
}
User.findOne({email : req.body.email}).then(user => {
    if(!user){
        bcrypt.hash(req.body.password,10,(err,hash)=> {
            userData.password = hash
            User.create(userData)
            .then(user => {
                res.json({status: user.email + ' registered!'})
            })
            .catch(err => {res.send('error: '+ err)
          })
           
        })
    }else{
        res.json({error: 'User aleady exists'})
    }
})
.catch(err => {
    res.send('error: ' + err)
})
})

// login
users.post('/login',(req,res) => {
    User.findOne({
        email:req.body.email
    })
    .then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                //password match
                const loginData = {
                                _id: user._id,
                                email : user.email,
                                userName :user.userName,
                                password :user.password,
                                age:user.age
                              }
            let token = jwt.sign(loginData,process.env.SECRET_KEY,{
                expiresIn: 1440
            })  
            
            res.send(token) 
        } else { 
           //  Passwords don't match
          res.json({ error: 'User does not exist' })
        }
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
  
users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})



module.exports = users




