module.exports = (client, guild) => {
  function setActivity () {
    const { version } = require(`../package.json`)
    client.user.setActivity(
      `in ${client.guilds.size} servers|-help|v.${version}`
    )
  }

  const { options } = require(`../configs/options`)
  const log = require(`node-file-logger`)
  log.SetUserOptions(options)

  setActivity()

  log.Info(`Left guild "${guild.name}".`)
}
