module.exports = event => {
  const log = require(`node-file-logger`)
  const { options } = require(`../configs/options`)
  log.SetUserOptions(options)

  log.Info(`Client's WebSocket disconnected! Code: ${event.code}`)
}
