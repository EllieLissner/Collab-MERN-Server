const mongoose = require('mongoose')
const events = require('./Event.js')

const CalendarSchema = new mongoose.Schema({
    name: String,
    userId: {
        type: String, 
        required: true,
    },    
    events: [events],
    people: [{
        userId: {
            type: String,
        }
    }] 
}, {
    timestamps: true
})

module.exports = CalendarSchema