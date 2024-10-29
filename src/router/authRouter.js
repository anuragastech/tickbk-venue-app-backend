const express=require("express")
const router=express.Router()
const userAuth=require("../middlewares/auth")


const  clientController=require("../controller/clientController")
const userController=require("../controller/userController")

router.post("/signup",clientController.signupClient)

router.post('/login',clientController.LoginClient)
router.post("/logout",userAuth,clientController.Logout)
router.post("/addEvent",userAuth,clientController.addEvent)



router.post("/signup",userController.signupClient)

router.post('/login',userController.LoginClient)

module.exports=router;