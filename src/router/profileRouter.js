const express=require("express")
const router=express.Router()
const clientAuth=require("../middlewares/auth")
const userAuth=require("../middlewares/userAuth")

const  clientController=require("../controller/clientController")
const userController=require("../controller/userController")


router.get("/profile/client", clientAuth, clientController.profile);


router.get("/profile/user", userAuth, userController.profile);
router.put("/profile/user", userAuth, userController.profileEdit);
router.delete("/profile", userAuth, userController.profileDelete);











module.exports=router
