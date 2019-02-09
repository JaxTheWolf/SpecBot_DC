const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class GiveCommand extends Command {
  constructor(client) {
    super(client, {
      name: `give`,
      group: `economy`,
      memberName: `give`,
      description: `Gives someone x points.`,
      examples: [`give 10 @user#0000`],
      args: [
        {
          key: `amount`,
          prompt: `How many point would you like to give?`,
          type: `integer`,
          min: 1,
          error: `You can only give 1 point or more!`
        },
        {
          key: `user`,
          prompt: `Who would you like to give these points?`,
          type: `user`,
          error: `Invalid user mention. Please try again.`
        }
      ]
    });
  }
  run(msg, { amount, user }) {
    let key = `${msg.guild.id}-${msg.author.id}`;
    let enmap = this.client.points;

    try {
      if (enmap.get(key, `points`) < amount) {
        return msg.reply(`Insufficent funds`);
      }

      enmap.math(key, `-`, amount, `points`);
      key = `${msg.guild.id}-${user.id}`;
      enmap.math(key, `+`, amount, `points`);
      msg.reply(`Gave user **${user.username} ${amount}** points!`);
      user.send(
        `**${msg.author.username}** gave you **${
          amount
        }** points! (Total: **${enmap.get(key, `points`)}**)`
      );
    } catch {
      msg.reply(
        `An error has occured (The database is most likely not ready yet). Try waiting for a moment before retrying.`
      );
    }

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
