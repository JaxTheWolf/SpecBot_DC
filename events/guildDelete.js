module.exports = (client, guild) => {
  const log = require(`node-file-logger`)
  const { options } = require(`../configs/options`)
  const { setActivity } = require(`../libs/eventLibs`)
  log.SetUserOptions(options)

  setActivity(client)

  log.Info(`Left guild "${guild.name}".`)
}
