const mongoose = require('mongoose');

//Schema til quote
const guildSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },
    channelBotUpdatesId: {
        type: String,
        required: true
    },
    channelNewsId: {
        type: String,
        required: true
    },
    channelMeetingsId: {
        type: String,
        required: true
    },
    channelAnnouncementsId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('guild', guildSchema); //ES6 Module