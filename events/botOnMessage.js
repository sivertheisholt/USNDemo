'use strict';

const messageSystem = require("../systems/messageSystem");

exports.bot_message = function(bot, prefix) {
    bot.on('message', message => {
        messageSystem.message_chat_route(message, message.author, prefix)
    });
}