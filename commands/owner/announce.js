const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class AnnounceCommand extends Command {
  constructor (client) {
    super(client, {
      name: `announce`,
      aliases: [`ann`, `announcement`],
      group: `owner`,
      memberName: `announce`,
      description: `Annonuces a message to every guild the bot is in (Owner only)`,
      examples: [`announce Bot will be down for a few minutes!`],
      ownerOnly: true,
      args: [
        {
          key: `message`,
          prompt: `What would you like to be announced?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { message }) {
    try {
      this.client.guilds.map(guild => {
        let found = 0
        guild.channels.map(c => {
          if (found === 0) {
            if (c.type === `text`) {
              if (
                c.permissionsFor(this.client.user).has(`VIEW_CHANNEL`) === true
              ) {
                if (
                  c.permissionsFor(this.client.user).has(`SEND_MESSAGES`) ===
                  true
                ) {
                  found = 1
                  return c.send(message)
                }
              }
            }
          }
        })
      })
    } catch (e) {
      log.Info(`Could not send message to a (few) guild(s)!`)
    }

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
