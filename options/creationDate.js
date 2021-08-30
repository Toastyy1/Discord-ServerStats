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

    const channelOptions = {
      name: `${process.env.CREATEDAT_CHANNELNAME} ${creationDate}`,
      type: "GUILD_VOICE",
      category: categoryId,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: ["CONNECT"],
        },
      ],
    };

    //Create the channel
    require("../util/createChannel").execute(interaction, channelOptions);
  },
};
