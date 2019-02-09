const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class ServerCommand extends Command {
  constructor(client) {
    super(client, {
      name: `delserver`,
      group: `pc`,
      memberName: `delserver`,
      description: `Deletes your server.`,
      examples: [`delserver true`],
      args: [
        {
          key: `confirm`,
          prompt: `Do you want to proceed? (true = yes, false = no)`,
          type: `string`,
          oneOf: [`yes`, `no`],
          error: `Reply with yes/no.`
        }
      ]
    });
  }
  run(msg, { confirm }) {
    if (confirm === `no`) {
      return msg.reply(`Cancelled command.`);
    } else {
      const fs = require(`fs`);
      let owner = msg.author;
      let delFrom = `${__dirname}/../../server`;

      fs.unlink(`${delFrom}/${owner.id}.txt`, function onError(err) {
        if (err) {
          console.log(err);
          msg.reply(
            `You don't have a server saved yet or an error has occured. (\`${
              err
            }\`)`
          );
        } else {
          msg.reply(`Your server has been successcully deleted!`);
        }
      });
    }

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
