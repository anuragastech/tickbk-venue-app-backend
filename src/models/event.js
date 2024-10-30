const mongoose = require("mongoose");
const validate = require('validate');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    attendees: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            paymentStatus: { type: String, enum: ["pending", "completed"], default: "pending" },
            bookedAt: { type: Date, default: Date.now },
        },
    ],
    capacity: {
        type: Number,
        required: true,
    },
    tags: {
        type: [String],
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
