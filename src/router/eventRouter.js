const express=require("express")
const router=express.Router()
const clientAuth=require("../middlewares/auth")
const userAuth=require("../middlewares/userAuth")

const  clientController=require("../controller/clientController")
const userController=require("../controller/userController")

router.post("/addEvent",clientAuth,clientController.addEvent)
router.get("/events", userController.Getevents); 

router.post("/bookEvent",userAuth,userController.bookevent)



module.exports=router
