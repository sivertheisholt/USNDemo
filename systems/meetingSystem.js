'use strict';

const Discord = require('discord.js');

exports.newMeeting = async function() {
    let newMeeting = new Discord.MessageEmbed()
        .setTitle("📅 Meeting created")
        .setColor("RED")
        .addField('Meeting time', '3pm EST on Wednesday, Jul 21nd (in a day)')
        .addField('Unavailable', "``` wondercrack ```")
        .setFooter('❌ RSVP | 🕐 Convert timezone');
}

exports.deleteMeeting = async function() {

}

exports.changeMeeting = async function() {

}

exports.changeMeetingTime = async function() {
    
}