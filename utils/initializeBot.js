const botReady = require('../events/botOnReady');
const botMessage = require('../events/botOnMessage');
const mongoose = require('mongoose');
const database = require('../database/connect');


exports.initialize = async function(bot, prefix)  {
    //Database
    const dbResult = await database.connectToDatabase(mongoose);
    if(!dbResult) return dbResult;

    //Bot on ready
    botReady.bot_ready(bot,prefix);

    //Bot on message
    botMessage.bot_message(bot,prefix);

    return true;
}