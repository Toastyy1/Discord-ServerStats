// This represents the commmand handler

const fs = require("fs");
const path = require("path");
const rootDir = path.dirname(require.main.filename);
let selectedCategoryId;

module.exports = async (client, interaction) => {
  // Move this to selectCategoryMenu.js

  if (interaction.isCommand()) {
    const { commandName } = interaction;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(client, interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }

  if (interaction.isSelectMenu()) {
    const { values } = interaction;

    switch (interaction.customId) {
      case "selectCategory":
        selectedCategoryId = values[0];
        require("../../menues/optionMenu").execute(client, interaction, values);
        break;
      case "optionMenu":
        await interaction.deferReply();
        values.forEach((element) => {
          const menuCommand = client.menuOptions.get(element);
          if (!menuCommand) return;
          menuCommand.execute(client, interaction, selectedCategoryId);
        });
        await interaction.editReply('All operations finishes successfully!');
        break;
    }
  }
};
