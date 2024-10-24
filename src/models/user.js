const mongoose=require("mongoose")
const express=require('express')
const validate = require('validate');

const userSchema=mongoose.Schema({


        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        emailId: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
        },
        password: {
          type: String,
          required: true,
        },
        age: {
          type: Number,
          required: true,
          min: 5,
          max: 50,
        },
        gender: {
          type: String,
          required: true,
          validate(value) {
            if (!["male", "female", "others"].includes(value)) {
              throw new Error("gender data is not valid"); 
            }
          },
        },
        skill: {
          type: [String],
        }
      }, {
        timestamps: true, 
      },
)

const User=mongoose.model("user",userSchema)
module.exports=User;
