'use strict';

const Discord = require('discord.js');
const messageSystem = require('../systems/messageSystem');

exports.run = async (arguments) => {

    let message = await messageSystem.sendChatMessage(arguments.messageObject,loadingEmbed);


}