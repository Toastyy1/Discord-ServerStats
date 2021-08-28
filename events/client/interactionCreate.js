// This represents the commmand handler

const fs = require("fs");
const path = require("path");
const rootDir = path.dirname(require.main.filename);

module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(client, interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
};
