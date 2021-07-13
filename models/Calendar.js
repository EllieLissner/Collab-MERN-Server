const mongoose = require('mongoose')
const user = mongoose.model('user')
const Schema = mongoose.Schema
// const eventSchema = require('./Event.js')

const CalendarSchema = new mongoose.Schema({
    name: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }    
//     eventTypes: [{
//         eventTypeId: Number,
//         name: String
//     }],
//     events: [eventSchema],
//     people: [{
//         userId: {
//             type: String,
//         },
//         permission: {
//             type: String,
//             default: 'view'
//         }
//     }] 
// }, {
//     timestamps: true
})

module.exports = CalendarSchema