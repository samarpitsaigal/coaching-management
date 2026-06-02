const { date } = require('joi')
const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  studentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Student"
  },
  month:{
    type:String
  },
  amount:{
    type:Number
  },
  paymentDate:{
    type:Date,
    default:Date.now
  }
})

const PaymentSchema = mongoose.model("Payment",Schema)

module.exports = PaymentSchema