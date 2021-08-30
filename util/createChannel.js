module.exports = {
  execute: (interaction, options) => {
    // Deconstruct the options
    const { name, type, category, permissionOverwrites } = options;

    // Create the channel
    interaction.guild.channels.create(`${name}`, {
      parent: category,
      type: type,
      permissionOverwrites,
    });
  },
};
