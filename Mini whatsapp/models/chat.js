const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    message: {
        type: String,
        maxLength: 100
    },
    created_at: {
        type: Date,
        required: true
    }
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;