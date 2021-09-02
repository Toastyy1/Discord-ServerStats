module.exports = async client => {
	client.user.setActivity('your server ( ͡° ͜ʖ ͡°)', { type: 'WATCHING' });
	console.log('Bot is online!');
	require('../../util/updater').execute(client);
};