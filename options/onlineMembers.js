module.exports = {
    name: "onlineMembers",
    execute: async (client, interaction, categoryId) => {
        const allMembers = await interaction.guild.members.fetch();
        console.log(client.guilds.cache.get(process.env.GUILDID).presences.cache.size);

        // FIXME: Fix the error of not being able to access the presence of all members
        const onlineMembers = allMembers.filter(member => !member.user.bot && member.presence.status !== "offline");
        console.log(onlineMembers)
    }
}