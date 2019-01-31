const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class XYZCommand extends Command {
  constructor(client) {
    super(client, {
      name: `purge`,
      aliases: [`del`],
      group: `main`,
      memberName: `purge`,
      description: `Purges specified amount of messages.`,
      examples: [`purge @user#0000 52`, `purge 10`],
      args: [
        {
          key: `user`,
          prompt: `Which user's messages would you like to delete?`,
          type: `user`,
          default: ``
        },
        {
          key: `amount`,
          prompt: `How many messages would you like to delete?`,
          type: `integer`,
          min: 2,
          max: 100
        }
      ]
    });
  }
  async run(msg, { user, amount }) {
    let messages = await msg.channel.fetchMessages({ limit: 100 });
    if (user !== ``) {
      messages = messages.array().filter(m => m.author.id === user.id);
      messages.length = amount;
    } else {
      messages = messages.array();
      messages.length = amount + 1;
    }
    messages.map(async m => await m.delete().catch(console.error));

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
