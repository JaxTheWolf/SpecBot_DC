module.exports = info => {
  const log = require(`node-file-logger`)
  const { options } = require(`../configs/options`)
  log.SetUserOptions(options)

  log.Info(info)
}
