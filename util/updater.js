const schedule = require('node-schedule')

module.exports = {
  execute: async (client) => {
    try {
      // Run this job every 2 hours
      const updateMemberCountJob = schedule.scheduleJob('0 */2 * * *', () => {
        require('../options/jobs/updateMemberCount').execute(client)
      })

      // Run this job every 5 minutes
      const updateOnlineMembers = schedule.scheduleJob('*/5 * * * *', () => {
        require('../options/jobs/updateOnlineMembers').execute(client)
      })
    } catch (error) {
      // Create info object for error report
      const time = new Date().toUTCString()
      const guild = await client.guilds.fetch(process.env.GUILDID)
      const info = {
        error: error.message.substr(error.message.indexOf(' ') + 1),
        guild: guild.name,
        time,
        user: client.user.username,
        channel: '__Digital Ocean__',
        icon: client.user.displayAvatarURL(),
        usedCommand: 'Upadte-Job'
      }

      guild.members.fetch(process.env.DEVELOPERID)
        .then(member => {
          member.send({
            embeds: [require('../embeds/errorReport')(info)]
          })
        })
        .catch(() => console.log('Couldn\'t send error report'))
    }
  }
}
