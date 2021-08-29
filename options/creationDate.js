module.exports = {
  name: "creationDate",
  execute: async (client, interaction, categoryId) => {
    function convertDate(date) {
      return date.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }

    const { createdAt } = interaction.guild;
    const creationDate = convertDate(createdAt);

    // Create the channel => Do this in util/createChannel.js
    interaction.guild.channels.create(`Erstellt am: ${creationDate}`, {
        parent: categoryId,
        type: 'GUILD_VOICE',
        permissionOverwrites: [
            {
                id: interaction.guild.id,
                deny: ['CONNECT'],
            }
        ]
    })
  },
};
