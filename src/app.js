const express = require("express");
const app = express();
const connectDB =require("./confic/database")
const cookieParser = require("cookie-parser");
const cors = require("cors"); 

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(cookieParser());

app.use(express.json())


const authRouter=require("./router/authRouter")
const eventRouter=require("./router/eventRouter")
const profileRouter=require("./router/profileRouter")


app.use("/",authRouter);
app.use("/",eventRouter);
app.use("/",profileRouter);


connectDB()
  .then(() => {
    console.log("Connected to the database");
    app.listen(3005, () => {
      console.log("Server is running on port 3005");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
