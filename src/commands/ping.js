module.exports = {
    name: 'ping',
    description: 'Commande de ping',
    execute(message, args){
        message.channel.send("Ping en cours...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;

            m.edit(`Pong! Latence: ${ping}ms`)
        })
    },
};