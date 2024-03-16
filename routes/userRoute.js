const express = require('express')
const user_route = express();
const session  = require('express-session')
const config = require('../config/config')

user_route.use(session({secret:config.sessionSecret,
    resave:true,
    saveUninitialized:true
}));

const auth = require('../middleware/auth')

user_route.set('view engine','ejs')
user_route.set('views','./views/users')


// const bodyparser = require('body-parser')

user_route.use(express.json())
user_route.use(express.urlencoded({extended:true}))
 

const userController = require ("../controller/userController");

user_route.get('/register',auth.isLogout,userController.loadRegister)

user_route.post('/register',auth.isLogin,userController.insertUser)

user_route.get('/',auth.isLogout ,userController.loginload)

user_route.get('/login',auth.isLogout,userController.loginload)

user_route.post('/login',auth.isLogout,userController.verifyLogin)

user_route.get('/home',auth.isLogin,userController.loadHome)

user_route.get('/logout',auth.isLogin,userController.userLogout)

user_route.get('/edit/:id',auth.isLogin,userController.editLoad)

user_route.post('/edit-user',auth.isLogin,userController.updateProfile)



module.exports = user_route;