module.exports = (error) => {
  const { options } = require(`../configs/options`)
  const log = require(`node-file-logger`)
  log.SetUserOptions(options)

  log.Error(`A WebSocket error has emerged! Perish you bastard!`, `Event handlrs`, `nothing`, error)
}
