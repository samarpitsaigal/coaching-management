const express = require('express')
const cors = require("cors");
require('dotenv').config()
require('./Models/dbConnection')
const authRoutes = require('./Routes/authRoutes')
const studentRoutes = require("./Routes/studentRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");
const bodyParser = require('body-parser');


const app = express()


const PORT = process.env.PORT || 8080


app.get('/ping',(req,res)=>{
  res.send("<h1>hello</h1>")
})

app.use(cors())
app.use(bodyParser.json())

app.use("/auth",authRoutes);
app.use("/studentsRouter",studentRoutes);
app.use("/paymentRouter",paymentRoutes);

app.listen(PORT,()=>{
  console.log(`server running on ${PORT}`)
})