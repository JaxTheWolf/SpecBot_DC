const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: `say`,
      group: `main`,
      memberName: `say`,
      description: `Repeats whatever you specify.`,
      examples: [`say oko sux`],
      clientPermissions: [`MANAGE_MESSAGES`],
      args: [
        {
          key: `say`,
          prompt: `What would you like the bot to repeat?`,
          type: `string`
        }
      ]
    });
  }
  run(msg, { say }) {
    msg.delete();
    msg.say(say);

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
