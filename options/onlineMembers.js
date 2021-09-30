module.exports = {
  name: "onlineMembers",
  execute: async (client, interaction, categoryId) => {
    const guildMembers = await client.guilds.cache.get(process.env.GUILDID).members.fetch({ withPresences: true })
    let onlineMembers = await guildMembers.filter(member => !member.user.bot && member.presence?.status === "online").size

    const channelOptions = {
        name: `${process.env.ONLINEMEMBERS_CHANNELNAME} ${onlineMembers}`,
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
