const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class SuggestCommand extends Command {
  constructor(client) {
    super(client, {
      name: `suggest`,
      aliases: [`sugg`, `request`, `featurereq`, `suggestion`],
      group: `main`,
      memberName: `suggestion`,
      description: `Suggest a feature for SpecBot.`,
      examples: [`suggest pc edits`]
    });
  }
  run(msg) {
    return msg.say(
      `Suggest new features here! https://goo.gl/forms/4LEfWSqBWHgi3umX2`
    );
    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
