const { Command } = require(`discord.js-commando`);
const { RichEmbed } = require(`discord.js`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);
let randomHexColor = require(`random-hex-color`);

module.exports = class ServerCommand extends Command {
  constructor(client) {
    super(client, {
      name: `server`,
      group: `pc`,
      memberName: `server`,
      description: `Replies with a user's server.`,
      examples: [`server @oko123#8509`],
      args: [
        {
          key: `user`,
          prompt: `Which user's server would you like to view?`,
          type: `user`,
          default: ``
        }
      ]
    });
  }
  run(msg, { user }) {
    const fs = require(`fs`);
    let readFrom = `${__dirname}/../../server`;

    function retrieveServer(user) {
      fs.readFile(`${readFrom}/${user.id}.txt`, `utf8`, function(err, data) {
        if (err) {
          msg.reply(`This person doesn't have a server or they haven't saved it yet!`);
          console.log(err);
        } else {
          const embed = new RichEmbed()
            .setTitle(`Here's ${user.username}'s server!`)
            .setAuthor(user.username, user.displayAvatarURL)
            .setDescription(`${data}`)
            .setColor(randomHexColor());
          msg.channel.send({
            embed
          });
        }
      });
    }

    if (user === ``) {
      retrieveServer(msg.author);
    } else {
      retrieveServer(user);
    }

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
