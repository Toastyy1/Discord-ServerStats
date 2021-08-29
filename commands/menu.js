const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: "menu",
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows the menu for creating stats channels"),
  async execute(client, interaction) {
    const categories = interaction.guild.channels.cache
      .filter((c) => c.parent?.type === "GUILD_CATEGORY")
      .map((c) => c.parent);
    const uniqueCategories = [...new Set(categories)];

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("selectCategory")
        .setPlaceholder("Select a category")
    );

    uniqueCategories.forEach((category) => {
      row.components[0].addOptions([
        {
          label: category.name,
          description: "This is a description",
          value: category.id,
        },
      ]);
    });

    await interaction.reply({
      content: "Select the category you want the stats to show up:",
      components: [row],
    });
  },
};
