const Discord = require('discord.js');
const fs = require('fs');
const Levels = require('discord-xp');
let db = JSON.parse(fs.readFileSync("./database/data.json"));

Levels.setURL("./database/data.json")

const client = new Discord.Client;
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

const config = require('./src/config.json');



//╔════════════════════════════════════════════════════════════════════════════════════════════════════════╗
//║                                          CREATION DES FONCTIONS                                        ║
//╚════════════════════════════════════════════════════════════════════════════════════════════════════════╝
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



//╔════════════════════════════════════════════════════════════════════════════════════════════════════════╗
//║                                            VARIABLES CONFIG                                            ║
//╚════════════════════════════════════════════════════════════════════════════════════════════════════════╝
const prefix = config.prefix;
const token = config.token;



//╔════════════════════════════════════════════════════════════════════════════════════════════════════════╗
//║                                          AVERTISSEMENTS CONSOLE                                        ║
//╚════════════════════════════════════════════════════════════════════════════════════════════════════════╝
client.on('ready', function () {
  console.log(`[DÉMMARRÉ] ${client.user.tag}`);
})

client.on('warn', err => console.warn('[ATTENTION]', err));

client.on('error', err => console.error('[ERREUR]', err));

client.on('uncaughtException', (err) => {
  console.log("Uncaught Exception: " + err)
  process.exit(1)
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('[FATAL] Possibly Unhandled Rejection at: Promise ', promise, ' reason: ', reason.message);
});

client.on('disconnect', () => {
  console.warn('[DÉCONNECTÉ]')
  process.exit(0);
})

client.on('reconnecting', () => console.warn('Reconnexion...'))



//╔════════════════════════════════════════════════════════════════════════════════════════════════════════╗
//║                                            COMMANDS HANDLERS                                           ║
//╚════════════════════════════════════════════════════════════════════════════════════════════════════════╝
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  try {
    command.execute(message, args);
    client.commands.get(commandName).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("Probleme lors de l'execution de cette commande.");
  }
})



//╔════════════════════════════════════════════════════════════════════════════════════════════════════════╗
//║                                                 LEVELING                                               ║
//╚════════════════════════════════════════════════════════════════════════════════════════════════════════╝
client.on("message", async message =>{
  if(!message.guild) return;
  if(message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const randomXp = Math.floor(getRandomInt(9) + 1);
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    message.channel.send(`LEVEL UP! Tu es désormais au niveau: ${user.level}.`)
  }
      const rankEmbed = new Discord.MessageEmbed()
      .setColor('#'+Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,'0'))
      .setTitle(message.author)
      .setDescription(`Vous êtes actuellement au niveau: **${user.level}**.`);
      message.channel.send(rankEmbed)
})



//╔════════════════════════════════════════════════════════════════════════════════════════════════════════╗
//║                                           DÉMARRAGE DU CLIENT                                          ║
//╚════════════════════════════════════════════════════════════════════════════════════════════════════════╝
client.login(process.env.TOKEN)

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.name, command)
}