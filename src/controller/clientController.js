
const User=require("../models/user")
const bcrypt=require("bcryptjs")

const signupClient=async(req,res)=>{
    // validateSignupData(req);
    console.log(req.body);

    try{
    const {firstName,lastName,emailid,age,skill,password,gender}=req.body
    // const passwordHash=await bcrypt.hash(password,10)
    // console.log(passwordHash);
    
    const user=new User({
        firstName,lastName,emailId:emailid,password,age,skill,gender
    })
    await user.save()
  
        res.send("success")        

    }catch(err){
console.log("data not added");

    }
}

const LoginClient=(req,res)=>{
    try{
        const {email,password}=req.body 
        
        
            }catch(error){
                res.status(500).json({message:"error occureds "})
                
            }
}




module.exports={LoginClient,signupClient}