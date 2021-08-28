// This represents the commmand handler

const fs = require('fs');
const path = require('path');
const rootDir = path.dirname(require.main.filename);

module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;

	const { commandName } = interaction;

    const fileArray = [];

	function readCommands(dir) {

		const __dirname = rootDir;

		// Read out all command files
		const files = fs.readdirSync(path.join(__dirname, dir));

		// Loop through all the files in ./commands
		for (const file of files) {
			// Get the status of 'file' (is it a file or directory?)
			const stat = fs.lstatSync(path.join(__dirname, dir, file));

			// If the 'file' is a directory, call the 'readCommands' function
			// again with the path of the subdirectory
			if (stat.isDirectory()) {
				readCommands(path.join(dir, file));
			}
			else {
				fileArray.push(file.replace('.js', ''));
			}
		}
	}

    readCommands('commands');

    require(`../../commands/${commandName}`).execute(client, interaction);
};