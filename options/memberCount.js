module.exports = {
  name: 'memberCount',
  execute: async (client, interaction, categoryId) => {
    const members = await interaction.guild.members.fetch()
    const realMembers = members.filter((m) => !m.user.bot).size

    const channelOptions = {
      name: `${process.env.MEMBERCOUNT_CHANNELNAME} ${realMembers}`,
      type: 'GUILD_VOICE',
      category: categoryId,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: ['CONNECT']
        }
      ]
    }

    // Create the channel
    require('../util/createChannel').execute(interaction, channelOptions)
  }
}
