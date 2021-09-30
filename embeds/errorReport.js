module.exports = function (info) {
    const { error, guild, time, user, channel, icon, usedCommand } = info
    return {
          "title": 'Used Command: `' + usedCommand + '`',
          "color": 0xff3333,
          "timestamp": time,
          "thumbnail": {
            "url": icon
          },
          "author": {
            "name": `❗ Error in guild "${guild}" ❗`,
            "icon_url": icon
          },
          "fields": [
            {
              "name": "**Channel:**",
              "value": channel,
              "inline": true
            },
            {
                "name": "**Used by:**",
                "value": user,
                "inline": true
            },
            {
                "name": "**Error:**",
                "value": '`' + error + '`',
                "inline": false
            },
          ]
      }
  };