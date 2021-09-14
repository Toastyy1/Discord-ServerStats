const wait = require("util").promisify(setTimeout);

module.exports = {
  name: "memberGoal",
  execute: async (client, interaction, categoryId) => {
    await interaction.editReply(
      "Please enter a even, valid number. This command will stop listening after 5 seconds!"
    );

    let goal = 0;
    const filter = (m) => !isNaN(parseInt(m.content)) && m.author.id === interaction.user.id;

    try {
      interaction.channel
        .awaitMessages({ filter, max: 1, time: 5000, errors: ["time"] })
        .then((collected) => {
          goal = collected.first().content;
        })
        .catch(collected => {
            throw new Error("No goal was entered!");
        });
      await wait(5000);
    } catch (error) {
      interaction.editReply({
        content: " ",
        embeds: [
          require("../embeds/errorOutput")(
            "No answer after 5 seconds, operation canceled"
          ),
        ],
      });
      return error;
    }

    const channelOptions = {
      name: `${process.env.MEMBERGOAL_CHANNELNAME} ${goal}`,
      type: "GUILD_VOICE",
      category: categoryId,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: ["CONNECT"],
        },
      ],
    };

    const existingChannel = interaction.guild.channels.cache.find((channel) =>
      channel.name.includes(process.env.MEMBERGOAL_CHANNELNAME)
    );
    if (existingChannel) {
      // Update the existing channel
      await existingChannel.setName(
        `${process.env.MEMBERGOAL_CHANNELNAME} ${goal}`,
        "Updated member goal"
      );
    } else {
      //Create the channel
      require("../util/createChannel").execute(interaction, channelOptions);
    }
  },
};
