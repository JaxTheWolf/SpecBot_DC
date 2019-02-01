const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class XYZCommand extends Command {
  constructor(client) {
    super(client, {
      name: `base`,
      aliases: [`base1`],
      group: `main`,
      memberName: `base`,
      description: `A base command to copy.`,
      examples: [`base`]
      //args: [{}]
    });
  }
  run(msg, {}) {
    msg.say(`Change me you fool`);
    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
