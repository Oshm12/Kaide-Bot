const mongoose = require('mongoose');

const User = mongoose.model('User', { 
    name: {
        type: String,
        required: true,
        unique: true
    },
    rank: {
        type: String,
        required: false
    },
    merits: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = User