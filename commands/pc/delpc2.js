const {
  Command
} = require(`discord.js-commando`);
const {
  log
} = require(`../../logger`);

module.exports = class DelPC2Command extends Command {
  constructor(client) {
    super(client, {
      name: `delpc2`,
      group: `pc`,
      memberName: `delpc2`,
      description: `Deletes your second configuration`,
      examples: [`delpc2`]
    });
  }
  run(msg) {
    const fs = require(`fs`);
    let owner = msg.author;

    fs.unlink(`${__dirname}/../../conf2/${msg.guild.id}/${msg.guild.id}/${owner.tag}.txt`, function(err) {
      if (err) {
        console.log(err);
        msg.reply(`You don't have a configuration yet or an error has occured. (\`${err}\`)`).then(log(__filename, msg));
      } else {
        msg.reply(`Your configuration has been successcully deleted!`).then(log(__filename, msg));
      }
    });
  }
};
