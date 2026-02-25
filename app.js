require("dotenv").config()
const mongoose = require('mongoose')
const express = require('express')
const usersRoutes = require('./routes/user')
const app = express()


app.use('/users', usersRoutes)
mongoose.connect(process.env.MONGO_URI)


mongoose.connection.once('open', () => {
console.log('Connected to MongoDB')
})
module.exports
app.listen(3000, () => console.log(`Server running on port${process.env.PORT}`))

exports.errorHandler=((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500) .json({message:"Something broke!"})

})


