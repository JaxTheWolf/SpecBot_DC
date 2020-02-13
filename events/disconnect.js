module.exports = event => {
  const { Warn, SetUserOptions } = require(`node-file-logger`)
  const { options } = require(`../configs/options`)
  SetUserOptions(options)

  Warn(`Client's WebSocket disconnected! Code: ${event.code}`)
}
