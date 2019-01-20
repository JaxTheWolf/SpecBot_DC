const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class FlipCommand extends Command {
  constructor(client) {
    super(client, {
      name: `flip`,
      group: `economy`,
      memberName: `flip`,
      description: `Flips a coin. If you guess the coin state your bet gets doubled!`,
      examples: [`flip 10 tails`, `flip 10 t`],
      args: [
        {
          key: `bet`,
          prompt: `How many points do you wish to bet?`,
          type: `integer`,
          default: 0
        },
        {
          key: `gstate`,
          prompt: `Which side do you think the coin's going to land on?`,
          type: `string`
        }
      ]
    });
  }
  run(msg, { bet, gstate }) {
    let key = `${msg.guild.id}-${msg.author.id}`;
    let enmap = this.client.points;
    let gstateConv =
      gstate.toLowerCase() === `t` || gstate.toLowerCase() === `tails`
        ? true
        : false;

    function coinFlip() {
      return Math.floor(Math.random() * 2) == 0;
    }

    if (enmap.get(key, `points`) < bet) {
      msg.say(`Insufficent funds.`);
      return;
    } else {
      if (bet <= 1) {
        msg.reply(`You cannot bet less than 2 points!`);
        return;
      } else {
        if (gstateConv === coinFlip()) {
          let toAdd = bet * 2;
          enmap.math(key, `+`, toAdd, `points`);
          msg.reply(
            `Nice! I've given you ${
              toAdd === 1 ? `${toAdd} point!` : `${toAdd} points`
            } (Total: ${enmap.get(key, `points`)})`
          );
        } else {
          enmap.math(key, `-`, bet, `points`);
          msg.reply(
            `Better luck next time! I've removed ${
              bet === 1 ? `${bet} point!` : `${bet} points`
            } (Total: ${enmap.get(key, `points`)})`
          );
        }
      }
    }

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
