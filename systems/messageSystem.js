'use strict';

const logger = require('../logging/logger');

/**
 * Handles the command from chat
 * @param {Object} messageObject 
 * @param {String} discordUser 
 * @param {String} prefix 
 * @returns 
 */
exports.message_chat_route = async function(messageObject, discordUser, prefix) {
    //Check if user is bot and if command
    if (!messageObject.content.startsWith(prefix)) return;

    logger.debug("Command received, executing command");

    //Formats message
    const formatMessage = await messageFormatter(messageObject.content, prefix);

    let commandFile = require(`../commands/${formatMessage[0]}.js`);
    messageObject.channel.startTyping();
    await commandFile.run({messageObject: messageObject, discordUser: discordUser});

/*     //Try to start command
    try {
        let commandFile = require(`../commands/${formatMessage[0]}.js`);
        messageObject.channel.startTyping();
        await commandFile.run({messageObject: messageObject, discordUser: discordUser});
        

        //sendChatMessage(formatMessage[0], messageObject, await commandFile.run({messageObject: messageObject, discordUser: discordUser}));
    } catch (err) {
        logger.error(err);
        messageObject.channel.stopTyping();
    } */
}

/**
 * Handles the slash command
 * @param {Object} bot 
 * @param {String} channelId 
 * @param {String} messageString 
 * @param {String} prefix 
 */
exports.message_slash_route = function(bot, channelId, messageString, prefix) {

}

exports.sendChatMessage = async function(messageObject, result) {
    try {
        console.log("Sending message");
        return await messageObject.channel.send(result);
    }catch(err) {
        logger.warn("Could not send message in channel");
    } finally {
        messageObject.channel.stopTyping();
    }
}

/**
 * Formats the message
 * @param {String} message Message from user 
 * @param {String} prefix Prefix for bot
 * @returns Array of strings
 */
function messageFormatter(message, prefix) {
    let msg = message.toLowerCase().slice(prefix.length);
    return msg.split(" ");
}

