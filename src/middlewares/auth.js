
const jwt=require("jsonwebtoken")
const User=require("../models/user")

const userAuth=((req,res)=>{
const cookies=req.cokkies
const {token}=cookies
console.log(cookies)
})

