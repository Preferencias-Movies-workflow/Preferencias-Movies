const express = require('express')
const cors = require("cors")
const app = express()


// connection to MongoDB
const mongoose = require("mongoose")
const db = require("./../mongoDB/index.js")

const port = 5000;


app.use(express.json());
app.use(cors())

app.use(express.static(__dirname + "/public"))
 var Users = require('./../routes/Users')
 app.use('/users',Users)
 console.log("heelllllOOO")


app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})