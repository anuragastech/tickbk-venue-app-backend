const express=require("express")
const router=express.Router()
const clientAuth=require("../middlewares/auth")
const userAuth=require("../middlewares/auth")


const  clientController=require("../controller/clientController")
const userController=require("../controller/userController")

router.post("/signup",clientController.signupClient)

router.post('/login',clientController.LoginClient)
router.post("/logout",clientAuth,clientController.Logout)
router.post("/addEvent",clientAuth,clientController.addEvent)



router.post("/signup",userController.LoginUser)

router.post('/login',userController.LoginUser)
router.post("/logout",userAuth,userController.Logout)


router.post("./bookEvent",userAuth,userController.bookevent)
module.exports=router;