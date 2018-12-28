const {
  Command
} = require(`discord.js-commando`);
const {
  log
} = require(`../../logger`);

module.exports = class CreditsCommand extends Command {
  constructor(client) {
    super(client, {
      name: `credits`,
      group: `pc`,
      memberName: `credits`,
      description: `Credits creators.`,
      examples: [`credits`]
    });
  }
  run(msg) {
    function log() {
      let path = require('path');
      let filename = path.basename(__filename, `.js`);
      console.log(`${filename} was used by ${msg.author.tag}.`);
    }

    return msg.say(`SpecBot is coded by Roman Lubij, oko123#8509 and Designed by Jonne-Patrik Savimäki, The76i#1234`).then(log(__filename, msg));
  }
};
