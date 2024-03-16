
const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/user_managment_system');
const path=require("path")
const express=require('express')
//const //serveStatic = require('serve-static')
const app=express()
app.use(express.static(path.resolve(__dirname,'public')));

const nocache = require('nocache')
app.use(nocache())


//for admin routes
const adminRoute = require('./routes/adminRoute')
app.use('/admin',adminRoute)


//for user routes
const userRoute = require('./routes/userRoute')
app.use('/',userRoute)

const port =4000;

app.listen(port,()=>{
console.log('server is running ')
})

