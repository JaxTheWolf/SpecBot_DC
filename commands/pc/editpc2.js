const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);
let randomHexColor = require(`random-hex-color`);

module.exports = class EditPC2Comand extends Command {
  constructor(client) {
    super(client, {
      name: `editpc2`,
      aliases: [`edit2`],
      group: `pc`,
      memberName: `editpc2`,
      description: `Edits your configuration`,
      examples: [
        `editpc1 GPU "Radeon R4" (Wrap arguments with spaces in quotes)`
      ],
      args: [
        {
          key: `component`,
          prompt: `Which component would you like to edit?`,
          type: `string`
        },
        {
          key: `newCmp`,
          prompt: `What should the new entry be?`,
          type: `string`
        }
      ]
    });
  }
  run(msg, { component, newCmp }) {
    const fs = require(`fs`);
    let owner = msg.author;
    let rx = new RegExp(`^` + component + `:([\\s\\w].+)$`, `gmi`);
    let res;
    let dir = `${__dirname}/../../conf2`;
    let allowed = [
      `CPU`,
      `GPU`,
      `RAM`,
      `CASE`,
      `MOBO`,
      `PSU`,
      `COOLER`,
      `STORAGE`,
      `SCREEN`,
      `KEYBOARD`,
      `MOUSE`,
      `HEADSET`,
      `EXTRA`
    ];

    if (allowed.includes(component.toUpperCase())) {
      try {
        fs.readFile(`${dir}/${owner.id}.txt`, `utf8`, function(err, data) {
          if (err) {
            msg.reply(
              `You don't have a configuration yet or an error has occured.`
            );
            console.log(err);
            res = null;
          } else {
            res = data.replace(rx, `${component.toUpperCase()}: ${newCmp}`);

            fs.writeFile(`${dir}/${owner.id}.txt`, res, function(err) {
              if (err) {
                msg.say(
                  `There was a problem while saving your file. (\`${e}\`)`
                );
              } else {
                return msg.say(`Configuration saved succesfully!`);
              }
            });
          }
        });
      } catch (e) {
        msg.say(`An error has occured. ${e}`);
      }
    } else {
      msg.reply(`\`${component}\` is not a valid component!`);
    }

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
