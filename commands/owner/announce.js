const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const { owner } = require(`../../conf.json`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class AnnounceCommand extends Command {
  constructor(client) {
    super(client, {
      name: `announce`,
      aliases: [`ann`, `announcement`],
      group: `owner`,
      memberName: `announce`,
      description: `Annonuces a message to every guild the bot is in (Owner only)`,
      examples: [`announce Bot will be down for a few minutes!`],
      ownerOnly: true,
      args: [
        {
          key: `message`,
          prompt: `What would you like to be announced?`,
          type: `string`
        }
      ]
    });
  }
  run(msg, { message }) {
    try {
      this.client.guilds.map(guild => {
        let found = 0;
        guild.channels.map(c => {
          if (found === 0) {
            if (c.type === `text`) {
              if (
                c.permissionsFor(this.client.user).has(`VIEW_CHANNEL`) === true
              ) {
                if (
                  c.permissionsFor(this.client.user).has(`SEND_MESSAGES`) ===
                  true
                ) {
                  c.send(message);
                  found = 1;
                }
              }
            }
          }
        });
      });
    } catch (err) {
      let toLog = `Could not send message to a (few) guild(s)!`;
      console.log(toLog);
      log.Info();
    }

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
