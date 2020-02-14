module.exports = (client, guild) => {
  const { Info, SetUserOptions } = require(`node-file-logger`)
  const { options } = require(`../configs/options`)
  const { setActivity } = require(`../libs/eventLibs`)
  SetUserOptions(options)

  setActivity(client)

  Info(`Left guild "${guild.name}".`)
}
