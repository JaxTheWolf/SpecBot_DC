const { Command } = require(`discord.js-commando`);
const { RichEmbed } = require(`discord.js`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
const https = require(`https`);
log.SetUserOptions(options);
let path = require(`path`);
let randomHexColor = require(`random-hex-color`);

module.exports = class FoxCommand extends Command {
  constructor(client) {
    super(client, {
      name: `fox`,
      aliases: [`foxxo`, `foxxie`, `fex`, `orange_doggo`, `foxy`, `weird_doggo`],
      group: `animals`,
      memberName: `fox`,
      description: `Sends a random image of a fox.`,
      examples: [`fox`]
    });
  }
  run(msg) {
    let requestURL = `https://some-random-api.ml/foximg`;
    https
      .get(requestURL, function onDone(response) {
        let data = ``;
        response.on(`data`, chunk => {
          data += chunk;
        });
        response.on(`end`, () => {
          let embed = new RichEmbed()
            .setImage(JSON.parse(data).link)
            .setFooter(`Images are fetched from https://some-random-api.ml`)
            .setColor(randomHexColor());
          msg.say(embed);
        });
      })
      .on(`error`, err => {
        msg.say(`An error has occured. (${err.message})`);
      });

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
