const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class SetServerCommand extends Command {
  constructor(client) {
    super(client, {
      name: `setserver`,
      group: `pc`,
      memberName: `setserver`,
      description: `Sets a server.`,
      examples: [`setserver`],
      args:[{
        key: `serverconf`,
        prompt: `Type out your server specs here:`,
        type: `string`
      },]
    });
  }
  run(
    msg,
    {
      serverconf
    }
  ) {
    let content = `Server: ${serverconf}`;
    let owner = msg.author;
    let fs = require(`fs`);
    let writeTo = `${__dirname}/../../server`;

    fs.writeFile(`${writeTo}/${owner.id}.txt`, content, function(err) {
      if (err) {
        msg.say(`There was a problem while saving your file. (\`${e}\`)`);
      } else {
        return msg.say(`Configuration saved succesfully!`);
      }
    });

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
