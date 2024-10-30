const express=require("express")
const router=express.Router()
const clientAuth=require("../middlewares/auth")
const userAuth=require("../middlewares/userAuth")

const  clientController=require("../controller/clientController")
const userController=require("../controller/userController")













module.exports=router
