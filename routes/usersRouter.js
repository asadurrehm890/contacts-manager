const express=require('express')

const {registerUser, loginUser, currentUser}= require('../controllers/userController')

const route=express.Router();

const validateToken=require('../middlewares/validateToken')

route.post("/register",registerUser)

route.post('/login',loginUser)


route.get('/current',validateToken, currentUser)

module.exports=route



