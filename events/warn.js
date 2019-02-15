module.exports = info => {
  const { options } = require(`../configs/options`)
  const log = require(`node-file-logger`)
  log.SetUserOptions(options)

  log.Info(info)
}
