const mongoose = require('mongoose')
const events = require('./Event.js')

const CalendarSchema = new mongoose.Schema({
    name: String,
    userId: {
        type: String, 
        required: true,
    },    
    events: [events],
    People: [{
        userId: {
            type: String,
        },
        permission: {
            type: String,
            default: 'view'
        }
    }] 
}, {
    timestamps: true
})

module.exports = CalendarSchema