module.exports = {
  execute: async (client) => {
    console.log('Updating online members...')
    const guild = client.guilds.cache.get(process.env.GUILDID)
    const onlineMemberChannel = guild.channels.cache.find(channel => channel.name.includes('Online:'))

    if (!onlineMemberChannel) return console.log(`${guild.name}: Online Member channel not found`)

    let newOnlineMembers = 0

    try {
      const guildMembers = await client.guilds.cache.get(process.env.GUILDID).members.fetch({ withPresences: true })
      newOnlineMembers = await guildMembers.filter((online) => online.presence?.status === 'online').size
    } catch (error) {
      return console.log(`Couldn't get the new online members: ${error}`)
    }

    await onlineMemberChannel.setName(`${process.env.ONLINEMEMBERS_CHANNELNAME} ${newOnlineMembers}`, 'Updated online members')
      .catch(e => console.log(`Couldn't update the channel: ${e}`))
    console.log(`${guild.name}: Online Members updated`)
  }
}
