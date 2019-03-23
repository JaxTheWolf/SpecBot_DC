const { Command } = require(`discord.js-commando`)
const { setMsg, disableMsg, showMsg } = require(`../../libs/welcomeLib`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)

module.exports = class JoinMsg extends Command {
  constructor (client) {
    super(client, {
      description: `Set the join message`,
      examples: [`joinmsg set Hello, %s!`, `joinmsg delete`, `joinmsg`],
      group: `settings`,
      memberName: `joinmsg`,
      name: `joinmessage`,
      args: [
        {
          default: ``,
          error: `Invalid action. Reply with either set, show or disable.`,
          key: `action`,
          oneOf: [`set`, `show`, `disable`],
          prompt: `What action would you like to perform? (set, show, disable)`,
          type: `string`
        },
        {
          default: ``,
          key: `jMsg`,
          prompt: `What should the join message be?`,
          type: `string`
        }
      ]
    })
  }

  hasPermission (msg) {
    return this.client.isOwner(msg.author) || msg.member.hasPermission(`ADMINISTRATOR`)
  }

  run (msg, { action, jMsg }) {
    if (action === `` || jMsg === ``) {
      return sendCMDUsage(msg, this, [`action (set, disable, show)`, `message`])
    } else {
      switch (action) {
      case `set`:
        return setMsg(msg, jMsg, `join`)
      case `disable`:
        return disableMsg(msg, `join`)
      case `show`:
        return showMsg(msg, `join`)
      }
    }
  }
}
