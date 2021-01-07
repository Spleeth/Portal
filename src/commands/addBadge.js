const Discord = require('discord.js');
const fs = require('fs');
const Levels = require('discord-xp');
const mongoose = require('mongoose');
let db = JSON.parse(fs.readFileSync("PortalBeta/database/data.json"));

Levels.setURL("PortalBeta/database/data.json")

const client = new Discord.Client;
var json = JSON.parse('{"variable1": "pomme"}');
let userInfo = db[mentions.members.first()];

module.exports = {
    name: 'addBadge',
    description: "Ajouter un badge à quelqu'un",
    execute(message, args){
        if (message.author.bot) return;

        if(message.channel.author.roles.cache.has('MANAGE_ROLES')){
              userInfo.variable1 = json.variable1 + " banane"
            }
        }
    };
