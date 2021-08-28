require('dotenv').config();
const { Client, Intents } = require('discord.js');

// Create a new Discord client
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ],
});

// Call the event handler
require(`./handlers/event_handler.js`)(client);

// Login to the bot
client.login(process.env.TOKEN);