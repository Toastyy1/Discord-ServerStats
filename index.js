require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');

// Create a new Discord client
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ],
});

client.commands = new Collection();
client.menuOptions = new Collection();

// Load all commands in ./commands/ into the Collection
['command_handler','event_handler'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

// Login to the bot
client.login(process.env.TOKEN);