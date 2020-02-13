module.exports = (client, guild) => {
  const { Info, SetUserOptions } = require(`node-file-logger`)
  const { options } = require(`../configs/options`)
  const { setActivity } = require(`../libs/eventLibs`)
  SetUserOptions(options)

  setActivity(client)

  let defaultChann
  guild.channels.map(c => {
    let found = 0
    if (found === 0 &&
      c.type === `text` &&
      c.permissionsFor(client.user).has(`VIEW_CHANNEL`) === true &&
      c.permissionsFor(client.user).has(`SEND_MESSAGES`) === true) {
      found = 1
      defaultChann = c.id
    }
  })

  client.provider.set(guild, `annchan`, defaultChann)
  client.provider.set(guild, `muteann`, false)

  Info(`Joined guild "${guild.name}".`)
}
