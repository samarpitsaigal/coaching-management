const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String,
    require:true
  },
  role:{
    type:String,
    enum:["admin","student"],
    default:"student"
  }
})

const UserSchema = mongoose.model("User",Schema)

module.exports = UserSchema