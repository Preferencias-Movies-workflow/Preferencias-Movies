const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/movies', { useUnifiedTopology: true }).then(()=>{
    console.log("connected!")
})
.catch((err)=>{
    console.log("Error while connecting to DB",err);
})

module.exports = db;