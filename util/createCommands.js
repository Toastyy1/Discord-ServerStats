module.exports = function () {
    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v9");
    const fs = require("fs");

    const commands = [];
    const commandFiles = fs
      .readdirSync("commands")
      .filter((file) => file.endsWith(".js"));

    // Place your client and guild ids here
    const clientId = process.env.CLIENTID
    const guildId = process.env.GUILDID;

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

    (async () => {
      try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
          body: commands,
        });

        console.log("Successfully reloaded application (/) commands.");
      } catch (error) {
        console.error(error);
      }
    })();
};
