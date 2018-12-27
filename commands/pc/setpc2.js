const {
  Command
} = require(`discord.js-commando`);

module.exports = class Setpc2Command extends Command {
  constructor(client) {
    super(client, {
      name: `setpc2`,
      group: `pc`,
      memberName: `setpc2`,
      description: `Sets a computer.`,
      examples: [`setpc2`],
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
    console.log(`setpc1 used!`);

    let content = `CPU: ${CPU}\nGPU: ${GPU}\nRAM: ${RAM}\nCASE: ${CASE}\nMOBO: ${MOBO}\nPSU: ${PSU}\nCOOLER: ${COOLER}\nSTORAGE: ${STORAGE}\nSCREEN: ${SCREEN}\nKEYBOARD: ${KEYBOARD}\nMOUSE: ${MOUSE}\nHEADSET: ${HEADSET}`;
    let owner = msg.author;
    let fs = require('fs');

    fs.promises.mkdir(`${__dirname}/../../conf2/${msg.guild.id}`, {
      recursive: true
    }).then(x => fs.promises.writeFile(`${__dirname}/../../conf2/${msg.guild.id}/${owner.username}#${owner.discriminator}.txt`, content));
    return msg.say(`Done!`);
  }
};
