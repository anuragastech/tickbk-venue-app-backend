const express=require("express")
const router=express.Router()
const clientAuth=require("../middlewares/auth")
const userAuth=require("../middlewares/userAuth")


const  clientController=require("../controller/clientController")
const userController=require("../controller/userController")

router.post("/signup/client",clientController.signupClient)   

router.post('/login/client',clientController.LoginClient)
router.post("/logout/client",clientAuth,clientController.Logout)


router.post("/signup",userController.signupUser)

router.post('/login',userController.LoginUser)
router.post("/logout",userAuth,userController.Logout)



module.exports=router;