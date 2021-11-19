const { MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
  execute: async (interaction) => {
    try {
      const categories = interaction.guild.channels.cache
        .filter((c) => c.parent?.type === 'GUILD_CATEGORY')
        .map((c) => c.parent)
      const uniqueCategories = [...new Set(categories)]

      const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId('selectCategory')
          .setPlaceholder('Select a category')
      )

      uniqueCategories.forEach(category => {
        row.components[0].addOptions([
          {
            label: category.name,
            description: ' ⁣',
            value: category.id
          }
        ])
      })

      await interaction.reply({
        content: 'Select the category you want the stats to show up:',
        components: [row],
        ephemeral: true
      })
    } catch (error) {
      console.log(`Could not create the "select category menu": ${error}`)
      await interaction.reply({
        content: ' ⁣',
        embeds: [client.responseEmbeds.get('errorEmbed').embed],
        ephemeral: true
      })
    }
  }
}
