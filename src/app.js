const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3005; 

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', 
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const authRouter = require("./router/authRouter");
const eventRouter = require("./router/eventRouter");
const profileRouter = require("./router/profileRouter");

app.use("/", authRouter);
app.use("/", eventRouter);
app.use("/", profileRouter);

connectDB()
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An error occurred", error: err.message });
});
