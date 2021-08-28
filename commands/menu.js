const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: 'menu',
	data: new SlashCommandBuilder()
		.setName('help1')
		.setDescription('Shows the menu for creating stats channels'),
	async execute(client, interaction) {
		await interaction.reply('Nicht so eilig, kommt schon noch! Kek');
	},
};