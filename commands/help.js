const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: 'help',
  data: new SlashCommandBuilder()
		.setName('help1')
		.setDescription('Shows help about the usage.'),
	async execute(client, interaction) {
		await interaction.reply('Nicht so eilig, kommt schon noch!');
	},
};