const { Command } = require(`discord.js-commando`)
const { setMsg, disableMsg, showMsg } = require(`../../libs/welcomeLib`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)

module.exports = class LeaveMsg extends Command {
  constructor (client) {
    super(client, {
      description: `Set the leave message`,
      examples: [`leavemsg set Hello, %s!`, `leavemsg delete`, `leavemsg`],
      group: `settings`,
      memberName: `leavemsg`,
      name: `leavemessage`,
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
          prompt: `What should the leave message be?`,
          type: `string`
        }
      ]
    })
  }

  hasPermission (msg) {
    return this.client.isOwner(msg.author) || msg.member.hasPermission(`ADMINISTRATOR`)
  }

  run (msg, { action, jMsg }) {
    if (action === ``) {
      return sendCMDUsage(msg, this, [`action (set, disable, show)`, `message`])
    } else {
      switch (action) {
      case `set`:
        return setMsg(msg, jMsg, `leave`)
      case `disable`:
        return disableMsg(msg, `leave`)
      case `show`:
        return showMsg(msg, `leave`)
      }
    }
  }
}
