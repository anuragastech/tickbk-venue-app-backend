const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};
// connectDB()
//   .then(() => {
//     console.log("Connected to the database");

//   })
//   .catch((error) => {
//     console.error("Failed to connect to the database:", error);
//   });

module.exports = connectDB;
