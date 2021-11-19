const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  name: 'menu',
  data: new SlashCommandBuilder()
    .setName('menu')
    .setDescription('Shows the menu for creating stats channels'),
  async execute (client, interaction) {
    require('../menues/selectCategoryMenu').execute(interaction)
  }
}
