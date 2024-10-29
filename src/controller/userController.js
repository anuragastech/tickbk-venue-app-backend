const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Event = require("../models/event");


const signupUser = async (req, res) => {
    // validateSignupData(req);
    console.log(req.body);
  
    try {
      const { firstName, lastName, emailid, age, skill, password, gender } =
        req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      console.log(passwordHash);
  
      const user = new User({
        firstName,
        lastName,
        emailId: emailid,
        password: passwordHash,
        age,
        skill,
        gender,
      });
      await user.save();
  
      res.send("success");
    } catch (err) {
      console.log("data not added");
    }
  };
  
  const LoginUser = async (req, res) => {
    try {
      const { emailId, password } = req.body;
  
      const user = await User.findOne({ emailId });
      console.log(user, "njf");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      console.log(passwordCompare);
  
      const token = jwt.sign({ _id: user._id }, "helloMone", { expiresIn: "1h" });
  
      res.cookie("token", token);
  
      res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (error) {
      res.status(500).json({ message: "An error occurred during login" });
    }
  };


  const Logout = async (req, res) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
      });
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("An error occurred during logout:", error);
      res.status(500).json({ message: "An error occurred during logout" });
    }
  };
  



module.exports={LoginUser,signupUser,Logout}