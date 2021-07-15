const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({

            kind: String,
            title: String,
            description: String,
            location: String,
            creator: {
              name: String,
              userId: String,
            },
            start: {
              date: String,
              time: { hours: String, minutes: String, ap: String, allday: Boolean },
            },
            end: {
              date: String,
              time: { hours: String, minutes: String, ap: String, allday: Boolean },
            }
}, {
    timestamps: true
})

module.exports = EventSchema