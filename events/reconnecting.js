module.exports = () => {
  const log = require(`node-file-logger`)
  const { options } = require(`../configs/options`)
  log.SetUserOptions(options)

  log.Info(`Client's WebSocket is reconnecting!`)
}
