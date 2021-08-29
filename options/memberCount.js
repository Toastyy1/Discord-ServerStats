module.exports = {
    name: "memberCount",
    execute: async (client, interaction) => {
        const members = await interaction.guild.members.fetch();
        console.log(members.filter(m => !m.user.bot).size)
    }
}