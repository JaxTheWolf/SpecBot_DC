module.exports = (client, guild) => {
  const { options } = require(`../configs/options`)
  const { setActivity } = require(`../libs/eventLibs`)
  const log = require(`node-file-logger`)
  log.SetUserOptions(options)

  setActivity(client)

  log.Info(`Left guild "${guild.name}".`)
}
