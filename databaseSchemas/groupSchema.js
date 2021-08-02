'use strict';

const mongoose = require('mongoose');

//Schema til quote
const groupSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },
    channels: {
        type: String,
        required: true
        
    },
});

module.exports = mongoose.model('group', groupSchema);