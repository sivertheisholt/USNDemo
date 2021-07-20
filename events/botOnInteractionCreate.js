
exports.bot_interaction = function(bot, prefix) {
    bot.ws.on('INTERACTION_CREATE', async interaction => {
        let messageString = `${prefix}${interaction.data.name} `;
        if(interaction.data.options != undefined && interaction.data.options.length >= 1) {
            for(let i = 0; i < interaction.data.options.length; i++) {
                if(i == 1) messageString += " ";
                messageString += `${interaction.data.options[i].value.toLowerCase() == "yes" || interaction.data.options[i].value.toLowerCase() == "no" ? "-" + interaction.data.options[i].value : interaction.data.options[i].value}`
            }
        }
        const result = await messageHandler.slashMessage(bot, interaction.channel_id, messageString, prefix, warframeDropInfo, warframeRelicInfo, itemKeyWords)
        bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: result
            }
        })
    });
}