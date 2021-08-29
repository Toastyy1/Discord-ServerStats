module.exports = {
  name: "memberCount",
  execute: async (client, interaction, categoryId) => {
    const members = await interaction.guild.members.fetch();
    const realMembers = members.filter((m) => !m.user.bot).size;

    // Create the channel
    interaction.guild.channels.create(`Members: ${realMembers}`, {
      parent: categoryId,
      type: "GUILD_VOICE",
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: ["CONNECT"],
        },
      ],
    });
  },
};
