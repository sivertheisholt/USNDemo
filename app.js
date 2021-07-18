"use strict";
require('dotenv').config();
const Discord = require('discord.js');
const logger = require('./logging/logger');
const initializer = require('./utils/initializeBot');

/**
 * Start bot
 */
async function startApplication() {
    try {
    //Prefix to use 
    const prefix = '!';

    //Bot token
    const discordToken = process.env.DISCORD_TOKEN;
    
    //Create a new bot
    const bot = new Discord.Client({
        autoReconnect: true,
        unknownCommandReponse: false
    })

    //Initialize systems
    const initResult = await initializer.initialize(bot, prefix);
    if(!initResult) throw new Error("Can't initialize bot - Check logs");

    //Log bot into server
    bot.login(discordToken);
    } catch(err) {
        logger.error(err);
    }
}

try {
    logger.info("Starting up bot");
    startApplication();
} catch(err) {
    logger.error(err);
    //Do something here
}