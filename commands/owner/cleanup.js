const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class CleanupCommand extends Command {
  constructor (client) {
    super(client, {
      name: `cleanup`,
      group: `owner`,
      memberName: `cleanup`,
      description: `Removes inactive users older than a month from the points database.`,
      ownerOnly: true,
      examples: [`cleanup`]
    })
  }
  run (msg) {
    const filtered = this.client.points.filter(p => p.guild === msg.guild.id)
    const rightNow = new Date()
    const toRemove = filtered.filter(data => {
      return (
        !msg.guild.members.has(data.user) ||
        rightNow - 2592000000 > data.lastSeen
      )
    })

    toRemove.forEach(data => {
      this.client.points.delete(`${msg.guild.id}-${data.user}`)
    })
    msg.say(`I've cleaned up ${toRemove.size} old members.`)

    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
