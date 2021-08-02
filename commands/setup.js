'use strict';

const Discord = require('discord.js');
const logger = require("../logging/logger");
const guildDatabase = require("../database/guild");
const utilities = require("../utils/utilities");
const messageSystem = require('../systems/messageSystem');

/**
 * Setup is a command that initializes a server
 * @param {Object} arguments A object containing information that is needed for the command
 * @returns {Promise<String|Object>} Message that the bot is sending back to the user
 */
exports.run = async (arguments) => {
    //Check if server is already initialized
    let isInitialized = await guildDatabase.getGuildFromId(arguments.messageObject.guild.id);
    if(isInitialized.status) {
        messageSystem.sendChatMessage(arguments.messageObject,"This server is already initialized!");
        return;
    }
    
    //Creating channels
    logger.debug('Initializing new discord server');
    let guild = new Discord.GuildChannelManager(arguments.messageObject.guild);
    let dbResult;
    await guild.create("USN", {type: "category"}).then(async (cat) => {
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
        dbResult = await guildDatabase.newGuild(arguments.messageObject.guild.id, updates.id, news.id, meetings.id, announcements.id);
    });
    //Checking DB return
    if(!dbResult) {
        logger.warn(`Can not communicate with database. ${dbResult}`)
        messageSystem.sendChatMessage(arguments.messageObject,"Could not save guild to database. Please start over again and try in a bit.");
        return;
    }
    let loadingEmbed = new Discord.MessageEmbed()
        .setTitle("Initializing server")
        .setColor("ORANGE")
        .addField(`------------------------`,`=          0%`)
        .addField('\u200B', 'Creating channels...');

    logger.info(`Successfully initialized server with id: ${arguments.messageObject.guild.id}`);

    //Variables
    let message = await messageSystem.sendChatMessage(arguments.messageObject,loadingEmbed);
    let percentage = 0;
    let string = `=          `;
    let operations = ['Managing channels...', 'Changing permissions...', 'It’s not a bug – it’s an undocumented feature...', 'Communicating with database...', 'Final touches...'];

    //Loading embed changes
    for(let i = 0; i < 10; i++) {
        await utilities.methods.timer(1000);
        percentage += 10;
        string = utilities.methods.replaceAt(string, i, "=");
        loadingEmbed.fields[0].value = `${string}${percentage}%`
        if(i % 2 == 0) {
            loadingEmbed.fields[1].value = operations[i / 2];
        }
        message.edit({embed: loadingEmbed})
    }

    //Success message
    delete loadingEmbed.fields[1];
    delete loadingEmbed.fields[0];
    loadingEmbed.setImage('http://www.iconninja.com/files/408/837/211/mark-correct-tick-success-check-yes-circle-icon.png');
    loadingEmbed.setTitle('Initialization success!');
    loadingEmbed.setColor("GREEN");

    message.edit({embed: loadingEmbed});
}