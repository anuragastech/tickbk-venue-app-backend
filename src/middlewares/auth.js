
const jwt=require("jsonwebtoken")
const Client=require("../models/client")


const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies || !cookies.token) {
            return res.status(401).json({ message: "No token provided, unauthorized access" });
        }

        const { token } = cookies;
        const data = jwt.verify(token, "helloMone");
        const { _id } = data;

        const user = await Client.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized access" });
    }
};

module.exports = userAuth;




// const userAuth=async(req,res,next)=>{

//     try{
//         const cookies=req.cookies
//         const {token}=cookies
//         // console.log(cookies)

//         const data=jwt.verify(token,"helloMone")

//         const {_id}=data
//         // console.log(data);

//         const user=await User.find({_id})
//         // console.log(user);

//                 req.user = user; 

//         next()

//     }catch{
        
//     return res.status(401).json({ message: "Unauthorized access" });
//     }
// }



// module.exports=userAuth
