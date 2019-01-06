const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class InviteCommand extends Command {
  constructor(client) {
    super(client, {
      name: `invite`,
      group: `main`,
      memberName: `invite`,
      description: `Replies with the bot's oauth2 link.`,
      examples: [`invite`]
    });
  }
  run(msg) {
    this.client
      .generateInvite([`SEND_MESSAGES`, `MANAGE_MESSAGES`])
      .then(link =>
        msg
          .say(`Here's the invite link! ${link}`)
          .then(msg.say(`I hope you'll enjoy the bot!`))
      );

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
