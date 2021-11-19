const wait = require('util').promisify(setTimeout)

module.exports = {
  name: 'memberGoal',
  execute: async (client, interaction, categoryId) => {
    await interaction.editReply(
      'Please enter a even, valid number. This command will stop listening after 5 seconds!'
    )

    let goal = 0
    const filter = (m) => !isNaN(parseInt(m.content)) && m.author.id === interaction.user.id

    try {
      const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 5000, errors: ['time'] })
      goal = parseInt(collected.first().content)
    } catch (error) {
      return await interaction.editReply({
        content: ' ',
        embeds: [
          require('../embeds/errorOutput')(
            'No (valid) answer after 5 seconds, operation canceled'
          )
        ]
      })
    }

    const channelOptions = {
      name: `${process.env.MEMBERGOAL_CHANNELNAME} ${goal}`,
      type: 'GUILD_VOICE',
      category: categoryId,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: ['CONNECT']
        }
      ]
    }

    const existingChannel = interaction.guild.channels.cache.find(channel =>
      channel.parentId === categoryId && channel.name.includes(process.env.MEMBERGOAL_CHANNELNAME)
    )
    if (existingChannel) {
      // Update the existing channel
      await existingChannel.setName(
        `${process.env.MEMBERGOAL_CHANNELNAME} ${goal}`,
        'Updated member goal'
      )
    } else {
      // Create the channel
      require('../util/createChannel').execute(interaction, channelOptions)
    }

    await interaction.channel.bulkDelete(1)
      .catch(e => console.log('Could not delete the user response message: ' + e))
  }
}
