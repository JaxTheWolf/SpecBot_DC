module.exports = (error) => {
  const log = require(`node-file-logger`)
  const { options } = require(`../configs/options`)
  log.SetUserOptions(options)

  log.Error(`A WebSocket error has emerged! Perish you bastard!`, `Event handlrs`, `nothing`, error)
}
