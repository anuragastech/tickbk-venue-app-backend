const Client = require("../models/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Event = require("../models/event");

const signupClient = async (req, res) => {
  // validateSignupData(req);
  console.log(req.body);

  try {
    const { firstName, lastName, emailid, age, skill, password, gender } =
      req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new Client({
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

const LoginClient = async (req, res) => {
  try {
    const { emailId, password } = req.body;
console.log(req.body,"dkkd");

    const user = await Client.findOne({ emailId });
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

const addEvent = async (req, res) => {
    try {
      const {
        title,
        description, 
        location,
        date,
        time,
        capacity, 
        tags,
        price,
      } = req.body;
  
      console.log(req.body);
  
      const eventBook = new Event({
        title,
        description,
        date: new Date(date), 
        time,
        capacity, 
        tags,
        price,
      });
  
      console.log(eventBook); 
  
      const savedEvent = await eventBook.save(); 
  
      if (!savedEvent) {
        return res.json({ message: "Data not saved" });
      }
  
      res.status(201).json({ message: "Event created successfully", event: savedEvent });
    } catch (error) {
      console.error("Error creating event:", error); 
      res.status(500).json({ message: "Error occurred", error: error.message });
    }
  };

  const editEvent = async (req, res) => {
    try {
      const { eventId } = req.params; 
      const {
        title,
        description,
        location,
        date,
        time,
        capacity,
        tags,
        price,
      } = req.body;
  
      console.log("Edit request for event:", eventId, req.body);
  
   
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {
          title,
          description,
          location,
          date: new Date(date), 
          time,
          capacity,
          tags,
          price,
        },
        { new: true, runValidators: true } 
      );
  
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ message: "Error occurred", error: error.message });
    }
  };
  
  
  const deleteEvent = async (req, res) => {
    try {
      const { eventId } = req.params; 
  
      const deletedEvent = await Event.findByIdAndDelete(eventId);
  
      if (!deletedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ message: "Error occurred while deleting event", error: error.message });
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



const profile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ message: "Profile retrieved successfully", user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

module.exports = { LoginClient, signupClient, Logout, addEvent ,Getevents ,editEvent,deleteEvent,profile};
