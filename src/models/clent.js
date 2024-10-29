const mongoose = require("mongoose");
const validate = require('validate');

const clientSchema = new mongoose.Schema({
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
                throw new Error("Gender data is not valid");
            }
        },
    },
    skill: {
        type: [String],
    },
    companyName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
        },
    ],
}, { timestamps: true });

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
