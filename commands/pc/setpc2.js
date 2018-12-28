const {
  Command
} = require(`discord.js-commando`);
const {
  log
} = require(`../../logger`);

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
          type: `string`,
          wait: 90,
        },
        {
          key: `GPU`,
          prompt: `Which GPU do you have?`,
          type: `string`,
          wait: 90,
        },
        {
          key: `RAM`,
          prompt: `What RAM do you have?`,
          type: `string`,
          wait: 90,
        }, {
          key: `CASE`,
          prompt: `Which CASE do you have?`,
          type: `string`,
          wait: 90,
        },
        {
          key: `MOBO`,
          prompt: `Which MOBO do you have?`,
          type: `string`,
          wait: 90,
        },
        {
          key: `PSU`,
          prompt: `Which PSU do you have?`,
          type: `string`,
          wait: 90,
        },
        {
          key: `COOLER`,
          prompt: `Which COOLER do you use?`,
          type: `string`,
          wait: 90,
        },
        {
          key: `STORAGE`,
          prompt: `Which STORAGE do you have?`,
          type: `string`,
          wait: 90,
        },
        {
          key: `SCREEN`,
          prompt: `Which SCREEN do you have?`,
          type: `string`,
          wait: 90,
        },
        {
          key: `KEYBOARD`,
          prompt: `Which KEYBOARD do you have?`,
          type: `string`,
          wait: 90,
        },
        {
          key: `MOUSE`,
          prompt: `Which MOUSE do you have?`,
          type: `string`,
          wait: 90,
        },
        {
          key: `HEADSET`,
          prompt: `Which HEADSET do you use?`,
          type: `string`,
          wait: 90,
        },
        {
          key: `EXTRA`,
          prompt: `Do you have any extra accessories?`,
          type: `string`,
          wait: 60,
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
    HEADSET,
    EXTRA
  }) {

    let content = `CPU: ${CPU}\nGPU: ${GPU}\nRAM: ${RAM}\nCASE: ${CASE}\nMOBO: ${MOBO}\nPSU: ${PSU}\nCOOLER: ${COOLER}\nSTORAGE: ${STORAGE}\nSCREEN: ${SCREEN}\nKEYBOARD: ${KEYBOARD}\nMOUSE: ${MOUSE}\nHEADSET: ${HEADSET}/nEXTRA: ${EXTRA}`;
    let owner = msg.author;
    let fs = require('fs');

    fs.promises.mkdir(`${__dirname}/../../conf2/${msg.guild.id}`, {
      recursive: true
    }).then(x => fs.promises.writeFile(`${__dirname}/../../conf1/${msg.guild.id}/${owner.tag}.txt`, content)).then(log(__filename, msg));
    return msg.say(`Configuration saved succesfully!`);
  }
};
