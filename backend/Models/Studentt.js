const { number, date } = require('joi')
const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  class:{
    type:String,
    require:true
  },
  mobile:{
    type:String
  },
  monthlyFees:{
    type:Number
  },
  admissionDate:{
    type:Date,
    default:Date.now
  }
})

const StudentSchema = mongoose.model("Student",Schema)

module.exports = StudentSchema