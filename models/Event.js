const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    title: String,
    startDate: String,
    endDate: String,
    startTime: String,
    endTime: String,
    location: String,
}, {
    timestamps: true
})

module.exports = EventSchema