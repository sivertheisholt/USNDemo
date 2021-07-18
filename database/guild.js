const Guild = require("../databaseSchemas/guildSchema");
const logger = require("../logging/logger");


/**
 * Creates a new guild in the database
 * @param {String} guildId The id of the guild
 * @param {String} channelBotUpdatesId The id of the bot updates channel
 * @param {String} channelNewsId The id of the news channel
 * @param {String} channelMeetingsId The id of the meetings channel
 * @param {String} channelAnnouncementsId The id of the announcements channel
 * @returns Boolean - If the operation was succesful or not
 */
exports.newGuild = async function(guildId, channelBotUpdatesId, channelNewsId,channelMeetingsId,channelAnnouncementsId) {
    logger.info("Creating new guild in database");
    let guild = new Guild({
        guildId: guildId, 
        channelBotUpdatesId: channelBotUpdatesId, 
        channelNewsId, channelNewsId, 
        channelMeetingsId: channelMeetingsId,
        channelAnnouncementsId: channelAnnouncementsId
    })
    
    return guild.save().then((doc, err) => {
        if(err) {
            logger.error(`Could not save guild to database! ${err}`);
            return false;
        }
        return true;
    }).catch(err =>{
        logger.error(err);
        return false;
    })
}


/**
 * Get guild from ID from database
 * @typedef {Object} DatabaseResult
 * @property {boolean} status - The status of the operation
 * @property {Object} guild - Result from database
 * 
 * @param {String} guildId The id of the guild
 * @returns {Promise<DatabaseResult>} The result of the operation
 */
exports.getGuildFromId = async function(guildId) {
    logger.debug(`Getting guild with ID ${guildId} from database`);
    const guild = await Guild.findOne({guildId: guildId});
    if(!guild) {
        logger.debug(`Guild with ID ${guildId} was not found`);
        return {status: false, guild: undefined}
    }
    return {status: true, guild: guild}
}