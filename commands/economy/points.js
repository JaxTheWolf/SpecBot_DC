const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class PointsCommand extends Command {
  constructor(client) {
    super(client, {
      name: `points`,
      group: `economy`,
      memberName: `points`,
      description: `Shows how many points you have`,
      guildOnly: true,
      examples: [`points`, `points @user#0000`],
      args: [
        {
          key: `member`,
          prompt: `Whose info would you want to see?`,
          default: ``,
          type: `member`
        }
      ]
    });
  }
  run(msg, { member }) {
    let key;
    if (member === ``) {
      key = `${msg.guild.id}-${msg.author.id}`;
      msg.channel.send(
        `You currently have ${this.client.points.get(
          key,
          `points`
        )} points, and are level ${this.client.points.get(key, `level`)}!`
      );
    } else {
      try {
        key = `${msg.guild.id}-${member.user.id}`;

        msg.channel.send(
          `${member.user.username} currently has ${this.client.points.get(
            key,
            `points`
          )} points, and is level ${this.client.points.get(key, `level`)}!`
        );
      } catch {
        msg.say(`This user doesn't have any points!`);
      }
    }

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
