const express=require("express")
const router=express.Router()
const clientAuth=require("../middlewares/auth")
const userAuth=require("../middlewares/userAuth")

const multer = require('../confic/multer');
const upload = multer.single("image");


const  clientController=require("../controller/clientController")
const userController=require("../controller/userController")

router.post("/addEvents",upload,clientController.addEvents)
router.get("/events",userController.Getevents); 

router.post("/bookEvent/:eventId",userAuth,userController.bookevent)
router.get("/events/client", clientController.Getevents); 
router.delete("/events/:eventId", userAuth, clientController.deleteEvent);
router.put("/events/:eventId", userAuth, clientController.editEvent);



module.exports=router
