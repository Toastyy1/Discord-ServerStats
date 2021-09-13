// This represents the commmand handler

let selectedCategoryId;

module.exports = async (client, interaction) => {
  if (interaction.isCommand()) {
    const { commandName } = interaction;
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(client, interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: " ",
        embeds: [client.responseEmbeds.get("errorEmbed").embed],
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
        values.forEach(async (element) => {
          const menuCommand = client.menuOptions.get(element);
          if (!menuCommand) return;
          try {
            await menuCommand.execute(client, interaction, selectedCategoryId);
            await interaction.editReply({
              content: " ",
              embeds: [client.responseEmbeds.get("successful").embed],
            });
          } catch (error) {
            // Create info object for error report
            const time = new Date().toUTCString();
            const info = {
              error,
              guild: interaction.guild.name,
              time,
              user: interaction.member.nickname,
              channel: interaction.channel.name,
              icon: interaction.guild.iconURL(),
              usedCommand: element,
            };

            // Send error report
            await interaction.guild.members.fetch('224501142237741057')
            .then(member => {
                member.send({
                embeds: [require('../../embeds/errorReport')(info)]
              })
            })
            .then(() => console.log('Error report sent'))
            .catch(() => console.log(`Couldn't send error report`));

            return await interaction.editReply({
              content: " ",
              embeds: [require('../../embeds/errorOutput')('An error has occured!')],
            });
          }
        });
        break;
    }
  }
};
