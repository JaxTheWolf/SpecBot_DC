const {
  Command
} = require(`discord.js-commando`);
const {
  log
} = require(`../../logger`);

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

    fs.unlink(`${__dirname}/../../conf1/${msg.guild.id}/${owner.id}.txt`, function(err) {
      if (err) {
        console.log(err);
        msg.reply(`You don't have a configuration yet or an error has occured. (\`${err}\`)`);
      } else {
        msg.reply(`Your configuration has been successcully deleted!`);
      }
    });
    log(__filename, msg);
  }
};
