const {
  Command
} = require(`discord.js-commando`);

module.exports = class Setpc1Command extends Command {
  constructor(client) {
    super(client, {
      name: `setpc1`,
      group: `pc`,
      memberName: `setpc1`,
      description: `Sets a computer.`,
      examples: [`setpc1`],
      args: [{
          key: `CPU`,
          prompt: `Which CPU do you have?`,
          type: `string`
        },
        {
          key: `GPU`,
          prompt: `Which GPU do you have?`,
          type: `string`
        },
        {
          key: `RAM`,
          prompt: `What RAM do you have?`,
          type: `string`
        }, {
          key: `CASE`,
          prompt: `Which CASE do you have?`,
          type: `string`
        },
        {
          key: `MOBO`,
          prompt: `Which MOBO do you have?`,
          type: `string`
        },
        {
          key: `PSU`,
          prompt: `Which PSU do you have?`,
          type: `string`
        },
        {
          key: `COOLER`,
          prompt: `Which COOLER do you use?`,
          type: `string`
        },
        {
          key: `STORAGE`,
          prompt: `Which STORAGE do you have?`,
          type: `string`
        },
        {
          key: `SCREEN`,
          prompt: `Which SCREEN do you have?`,
          type: `string`
        },
        {
          key: `KEYBOARD`,
          prompt: `Which KEYBOARD do you have?`,
          type: `string`
        },
        {
          key: `MOUSE`,
          prompt: `Which MOUSE do you have?`,
          type: `string`
        },
        {
          key: `HEADSET`,
          prompt: `Which HEADSET do you use?`,
          type: `string`
        },
      ]
    });
  }
  run(msg, {
    CPU,
    GPU,
    RAM,
    CASE,
    MOBO,
    PSU,
    COOLER,
    STORAGE,
    SCREEN,
    KEYBOARD,
    MOUSE,
    HEADSET
  }) {

    let content = `CPU: ${CPU}\nGPU: ${GPU}\nRAM: ${RAM}\nCASE: ${CASE}\nMOBO: ${MOBO}\nPSU: ${PSU}\nCOOLER: ${COOLER}\nSTORAGE: ${STORAGE}\nSCREEN: ${SCREEN}\nKEYBOARD: ${KEYBOARD}\nMOUSE: ${MOUSE}\nHEADSET: ${HEADSET}`;
    let owner = msg.author;
    let fs = require('fs');

    function log() {
      let path = require('path');
      let filename = path.basename(__filename, `.js`);
      console.log(`${filename} was used by ${msg.author.tag}.`);
    }

    fs.promises.mkdir(`${__dirname}/../../conf1/${msg.guild.id}`, {
      recursive: true
    }).then(x => fs.promises.writeFile(`${__dirname}/../../conf1/${msg.guild.id}/${owner.username}#${owner.discriminator}.txt`, content)).then(log());
    return msg.say(`Done!`);
  }
};
