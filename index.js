
const mongoose=require('mongoose')
// OOXrRIlRa4j8AuVf
// mongoose.connect('mongodb+srv://nihalmuhaednihal_db_user:OOXrRIlRa4j8AuVf@cluster0.apbrfeo.mongodb.net/?user-managment=Cluster0');
  mongoose.connect('mongodb+srv://nihalmuhaednihal_db_user:OOXrRIlRa4j8AuVf@cluster0.apbrfeo.mongodb.net/user_management?retryWrites=true&w=majority');
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
console.log('server is running on port 4000 ')
})

