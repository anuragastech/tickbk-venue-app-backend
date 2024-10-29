const express = require("express");
const app = express();
const connectDB =require("./confic/database")
const cookieParser = require("cookie-parser");



app.use(cookieParser());

app.use(express.json())


const authRouter=require("./router/authRouter")

app.use("/",authRouter);





connectDB()
  .then(() => {
    console.log("Connected to the database");
    app.listen(3005, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
