
const signupClient=(req,res)=>{
    try{
const {fistName,lastName,age,gender,skil}=req.body 


    }catch(error){
        res.status(500).json({message:"error occured "})
        
    }
}

const LoginClient=(req,res)=>{

}




module.exports={LoginClient,signupClient}