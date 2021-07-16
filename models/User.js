const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'event'}]
}, {
    timestamps: true
})

module.exports = UserSchema