const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class GitHubCommand extends Command {
  constructor(client) {
    super(client, {
      name: `github`,
      aliases: [`gh`, `gith`],
      group: `main`,
      memberName: `github`,
      description: `Show the GitHub page of the bot`,
      examples: [`github`]
    });
  }

  run(msg) {
    msg
      .say(
        `GitHub repository can be found here: https://github.com/JaxTheWolf/SpecBot_DC`
      )
      .then(
        msg.say(
          `Homepage can be found here: https://JaxTheWolf.github.io/SpecBot_DC`
        )
      );
    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
