const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Event = require("../models/event");

const signupUser = async (req, res) => {
  console.log(req.body);

  try {
    const { firstName, lastName, email, age, address, password, gender } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId: email,
      password: passwordHash,
      age,
      address,
      gender,
    });

    await user.save();
    console.log(user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "An error occurred; user could not be registered." });
  }
};




  
  const LoginUser = async (req, res) => {
    try {
      const { emailId, password } = req.body;
  console.log(req.body);
  
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
 
const bookevent = async (req, res) => {
    try {
      const {  eventId } = req.body;
      console.log("jbg");
      
      console.log(eventId);
      
  const userId=req.user
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      const bookedEvents = await Event.find({ "attendees.user": userId })
      .populate("attendees.user", "firstName lastName emailId") 
      .exec();
  
      const totalBookings = event.attendees.length;
      if (totalBookings >= event.capacity) {
        return res.status(400).json({ message: "Event is fully booked" });
      }
  
      const booking = {
        user: userId,
        paymentStatus: "pending", 
        bookedAt: new Date(),
      };
  
      event.attendees.push(booking);
  
      await event.save();
  
      res.status(200).json({ message: "Booking successful", event ,bookedEvents});
    } catch (error) {
      console.error("Error booking event:", error);
      res.status(500).json({ message: "An error occurred", error: error.message });
    }
  };

  const Getevents = async (req, res) => {
    try {
      console.log("Fetching events...");
  
      const eventsData = await Event.find({});
  
      res.status(200).json({
        message: "success",
        events: eventsData, 
      });
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Error occurred" });
    }
  };
  
//   const GetProfile =async(req,res)=>{
//     try{


//       const loggedUser=req.user
//       if(!loggedUser){
//         res.json({massage:'there is a error occured ,please check if you are logged in!!'})
//       }

//       const profileData=loggedUser 
//       res.json({message:"success",profileData})
//     }catch{
// res.json({message:"error in fetching profile informatioin"})
//     }
//   }


const profile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ message: "Profile retrieved successfully", user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};


const profileEdit = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { firstName, lastName, emailId, age, gender, skill } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, emailId, age, gender, skill },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

const profileDelete = async (req, res) => {
  try {
    const userId = req.user._id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Error deleting profile" });
  }
};


module.exports={LoginUser,signupUser,Logout,bookevent,Getevents,profile,profileEdit,profileDelete}