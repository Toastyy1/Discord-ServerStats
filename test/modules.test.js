test('Formats date to DD-MM-YYYY', () => {
  const channelOptions = {
    name: 'Members: 100',
    type: 'GUILD_VOICE',
    category: '123456789',
    permissionOverwrites: [
      {
        id: '9999999999999999554654',
        deny: ['CONNECT']
      }
    ]
  }

  const { name, type, category, permissionOverwrites } = channelOptions
  console.log(permissionOverwrites)
})
