const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'menu',
	data: new SlashCommandBuilder()
		.setName('help1')
		.setDescription('Shows the menu for creating stats channels'),
	async execute(client, interaction) {
		const row = new MessageActionRow().addComponents(
			new MessageSelectMenu()
			.setCustomId('menu')
			.setPlaceholder('Please select an option')
			.addOptions([
				{
					label: 'Member Count',
					description: 'Creates a new channel which shows the current member count',
					value: 'memberCount',
				},
				{
					label: 'Creation Date',
					description: 'Creates a new channel which shows the date the server was created',
					value: 'creationDate',
				},
				{
					label: 'Online Members',
					description: 'Creates a new channel which shows the current member count',
					value: 'memberCount',
				},
				{
					label: 'Member Goal',
					description: 'Creates a new channel which shows the current member goal',
					value: 'memberGoal',
				},
			]),
		);

		await interaction.reply({ content: 'Please select one of the available options:', components: [row] });
	}
};