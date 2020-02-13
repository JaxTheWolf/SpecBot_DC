module.exports = info => {
  const { Warn, SetUserOptions } = require(`node-file-logger`)
  const { options } = require(`../configs/options`)
  SetUserOptions(options)

  Warn(info)
}
