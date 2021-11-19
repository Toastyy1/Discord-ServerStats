const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  name: 'help',
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows help about the usage.'),
  async execute (client, interaction) {
    const developer = await interaction.guild.members.fetch('224501142237741057')

    const embed = {
      title: 'Server-Stats help',
      description: 'Using this bot only requires two simple steps:',
      thumbnail: {
        url: client.user.avatarURL()
      },
      color: 0x2e2eff,
      fields: [
        {
          name: 'Step 1',
          value: 'At first, you have to select the category you want the stats-channels created in'
        },
        {
          name: 'Step 2',
          value: 'Select the kind of stats-channel you want to create'
        },
        {
          name: '(Step 3)',
          value: 'If you\'ve selected the option "Member Goal" you have to enter the goal as number within 5 seconds'
        },
        {
          name: '\u200b',
          value: '\u200b'
        },
        {
          name: 'That\'s it! You\'re done 😄',
          value: '\u200B'
        }
      ],
      footer: {
        text: 'Created by Toasty',
        icon_url: developer.user.avatarURL()
      }
    }

    interaction.reply({ content: ' ', embeds: [embed], ephemeral: true })
  }
}
