const { Command } = require(`discord.js-commando`);
const { RichEmbed } = require(`discord.js`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);
let randomHexColor = require(`random-hex-color`);

module.exports = class PC1Command extends Command {
  constructor(client) {
    super(client, {
      name: `pc1`,
      group: `pc`,
      memberName: `pc1`,
      description: `Replies with a user's configuration.`,
      examples: [`pc1 @oko123#8509`],
      args: [
        {
          key: `user`,
          prompt: `Which user's configuration would you like to view?`,
          type: `user`,
          default: ``
        }
      ]
    });
  }
  run(msg, { user }) {
    const fs = require(`fs`);
    let readFrom = `${__dirname}/../../conf1`;

    function retrievePC(user) {
      fs.readFile(`${readFrom}/${user.id}.txt`, `utf8`, function onDone(err, data) {
        if (err) {
          msg.reply(`This person doesn't have a configuration yet!`);
          console.log(err);
        } else {
          const embed = new RichEmbed()
            .setTitle(`Here's ${user.username}'s configuration!`)
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
      retrievePC(msg.author);
    } else {
      retrievePC(user);
    }

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
