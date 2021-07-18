const Discord = require('discord.js');
const logger = require("../logging/logger");
const guildDatabase = require("../database/guild");

/**
 * Setup is a command that initializes a server
 * @param {Object} arguments A object containing information that is needed for the command
 * @returns {Promise<String|Object>} Message that the bot is sending back to the user
 */
exports.run = async (arguments) => {
    //Check if server is already initialized
    let isInitialized = await guildDatabase.getGuildFromId(arguments.messageObject.guild.id);
    if(isInitialized.status) return "This server is already initialized!";
    
    //Creating channels
    logger.debug('Initializing new discord server');
    let guild = new Discord.GuildChannelManager(arguments.messageObject.guild);
    return guild.create("USN", {type: "category"}).then(async (cat) => {
        let updates = await guild.create("usn-bot-updates", {
            parent: cat,
            type: "text"
        });
        let news = await guild.create("usn-news", {
            parent: cat,
            type: "text"
        });
        let meetings = await guild.create("usn-meetings", {
            parent: cat,
            type: "text"
        });
        let announcements = await guild.create("usn-announcements", {
            parent: cat,
            type: "text"
        });
        guild.create("usn-commands", {
            parent: cat,
            type: 'text'
        });

        //Add to db
        let dbResult = await guildDatabase.newGuild(arguments.messageObject.guild.id, updates.id, news.id, meetings.id, announcements.id);
        if(!dbResult) return "Could not save guild to database. Please start over again and try in a bit.";
    
        logger.info(`Successfully initialized server with id: ${arguments.messageObject.guild.id}`);
        return "Successfully initialized server";
    });
}