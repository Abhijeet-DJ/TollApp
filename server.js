const express = require('express');
const route = require("./routes.user")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

mongoose.connect(process.env.MONGO_URI);

app.get("/health",(req,res)=>{
    res.json({
        message : "we are good!"
    })
})

app.use("/",route);



const port = 10101
app.listen(port,()=>{
    console.log(`Server running in port ${port}`);
    
})
