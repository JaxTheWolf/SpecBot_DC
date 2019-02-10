module.exports = client => {
  function setActivity () {
    const { version } = require(`../package.json`)
    client.user.setActivity(
      `in ${client.guilds.size} servers|-help|v.${version}`
    )
  }

  const { options } = require(`../options`)
  const log = require(`node-file-logger`)
  log.SetUserOptions(options)

  setActivity()

  const toLog = `Ready!`

  console.log(toLog)
  log.Info(toLog)
}
