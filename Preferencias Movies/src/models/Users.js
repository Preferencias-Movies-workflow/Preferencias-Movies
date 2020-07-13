const mongoose = require("mongoose")
const db = require("./../mongoDB/index.js");

const Schema = mongoose.Schema;

const usersSchema = new Schema
({
    email :{type:String,unique:true,required:true},
    userName :{type:String},
    password :{type:String,required:true },
    age:{type :Number}
});

let Users = mongoose.model('Users', usersSchema);

// /////////////test ////////////////////


// let form2Test = new Users({
//   email:"Aml@gmail.com",
//   userName:"aml",
//   password:"Novel",
//   age:14
// });

// form2Test.save((err)=>{
//   if (err){
//      console.log("error while saving to DB",err);

//   } else {
//       console.log("form1 saved")

//   }
// });


module.exports = Users;

