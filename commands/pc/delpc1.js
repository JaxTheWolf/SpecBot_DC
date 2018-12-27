const {
  Command
} = require(`discord.js-commando`);

module.exports = class DelPC1Command extends Command {
  constructor(client) {
    super(client, {
      name: `delpc1`,
      group: `pc`,
      memberName: `delpc1`,
      description: `Deletes your configuration`,
      examples: [`delpc1`]
    });
  }
  run(msg) {
    const fs = require(`fs`);
    let owner = msg.author;

    function log() {
      let path = require('path');
      let filename = path.basename(__filename, `.js`);
      console.log(`${filename} was used by ${msg.author.tag}.`);
    }

    fs.unlink(`${__dirname}/../../conf1/${msg.guild.id}/${owner.username}#${owner.discriminator}.txt`, function(err) {
      if (err) {
        console.log(err);
        msg.reply(`You don't have a configuration yet or an error has occured. (\`${err}\`)`).then(log());
      } else {
        msg.reply(`Your configuration has been successcully deleted!`).then(log());
      }
    });
  }
};
