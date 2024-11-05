// src/config/razorpay.js
const Razorpay = require("razorpay");
const dotenv = require("dotenv");

dotenv.config();

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });
const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_uF6rcT6FvcQis8',
    key_secret: 'Pja8iuhLQVUicncsSVHOm2v5',
  });
module.exports = razorpayInstance;


