const {
  Command
} = require(`discord.js-commando`);
const {
  RichEmbed
} = require(`discord.js`);

module.exports = class PC1Command extends Command {
  constructor(client) {
    super(client, {
      name: `pc1`,
      group: `pc`,
      memberName: `pc1`,
      description: `Replies with a user's configuration`,
      examples: [`pc1 @oko123#8509`],
      args: [{
        key: `user`,
        prompt: `Which user's configuration would you like to view?`,
        type: `user`
      }]
    });
  }
  run(msg, {
    user
  }) {
    const fs = require(`fs`);

    function log() {
      let path = require('path');
      let filename = path.basename(__filename, `.js`);
      console.log(`${filename} was used by ${msg.author.tag}.`);
    }

    fs.readFile(`${__dirname}/../../conf1/${msg.guild.id}/${user.username}#${user.discriminator}.txt`, `utf8`, function(err, data) {
      if (err) {
        msg.reply(`This person doesn't have a configuration yet!`).then(log());
        console.log(err);
      } else {
        let colour = `#` + (`00000` + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);

        const embed = new RichEmbed()
          .setTitle(`Here's ${user.username}'s configuration!`)
          .setDescription(`${data}`)
          .setColor(colour);
        msg.channel.send({
          embed
        }).then(log());
      }
    });
  }
};
