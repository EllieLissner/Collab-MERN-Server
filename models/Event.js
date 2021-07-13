const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    name: String,
    startDate: String,
    endDate: String,
    startTime: String,
    endTime: String,
    repeating: Number,
    priority: {type: Number, default: 1}
}, {
    timestamps: true
})

module.exports = EventSchema