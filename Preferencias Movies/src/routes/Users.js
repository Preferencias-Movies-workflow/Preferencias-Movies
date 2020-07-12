const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/Users")
users.use(cors())
process.env.SECRET_KEY = 'secret'

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

module.exports = users

