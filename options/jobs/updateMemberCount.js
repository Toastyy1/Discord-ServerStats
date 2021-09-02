module.exports = {
    execute: async (client) => {
        console.log('Updating member count...');
        const guild = client.guilds.cache.get(process.env.GUILDID);
        const memberCountChannel = guild.channels.cache.find(channel => channel.name.includes('Members'));

        if(!memberCountChannel) return console.log('Member count channel not found');

        let newRealMembers = 0;

        try {
            const newMembers = await guild.members.fetch();
            newRealMembers = newMembers.filter(m => !m.user.bot).size;
        } catch (error) {
            return console.log(`Couldn't get the new member count: ${error}`);
        }

        await memberCountChannel.setName({name: `${process.env.MEMBERCOUNT_CHANNELNAME} ${newRealMembers}`,
        reason: 'Updated member count' })
        .catch(e => console.log(`Couldn't update the channel: ${e}`));
        console.log('Member count updated');
    }
}