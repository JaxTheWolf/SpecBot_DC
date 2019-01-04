const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class DelPC2Command extends Command {
  constructor(client) {
    super(client, {
      name: `delpc2`,
      group: `pc`,
      memberName: `delpc2`,
      description: `Deletes your configuration`,
      examples: [`delpc2`]
    });
  }
  run(msg) {
    const fs = require(`fs`);
    let owner = msg.author;
    let delFrom = `${__dirname}/../../conf2`;

    fs.unlink(`${delFrom}/${owner.id}.txt`, function(err) {
      if (err) {
        console.log(err);
        msg.reply(
          `You don't have a configuration yet or an error has occured. (\`${
            err
          }\`)`
        );
      } else {
        msg.reply(`Your configuration has been successcully deleted!`);
      }
    });
    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
