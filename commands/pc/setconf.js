const { Command } = require(`discord.js-commando`)
const { sendCMDUsage } = require(`../../libs/miscLibs`)
const { setConf } = require(`../../libs/pcLibs`)

module.exports = class Setpc1Command extends Command {
  constructor (client) {
    super(client, {
      description: `Sets a configuration (1, 2 or server)`,
      examples: [`setconf 1 ...`],
      group: `pc`,
      memberName: `setconf`,
      name: `setconf`,
      args: [
        {
          key: `conf`,
          prompt: `Which configuration would you like to set? (1 or 2)`,
          error: `Please enter a valid configuration (1 or 2)`,
          type: `string`,
          default: ``,
          oneOf: [`1`, `2`]
        },
        {
          default: ``,
          key: `CPU`,
          prompt: `What CPU do you have?`,
          type: `string`,
          wait: 90
        },
        {
          default: ``,
          key: `GPU`,
          prompt: `What GPU do you have?`,
          type: `string`,
          wait: 90
        },
        {
          default: ``,
          key: `RAM`,
          prompt: `What RAM do you use?`,
          type: `string`,
          wait: 90
        },
        {
          default: ``,
          key: `CASE`,
          prompt: `Which CASE do you have?`,
          type: `string`,
          wait: 90
        },
        {
          default: ``,
          key: `MOBO`,
          prompt: `What MOBO do you have?`,
          type: `string`,
          wait: 90
        },
        {
          default: ``,
          key: `PSU`,
          prompt: `What PSU do you have?`,
          type: `string`,
          wait: 90
        },
        {
          default: ``,
          key: `COOLER`,
          prompt: `What COOLER do you use?`,
          type: `string`,
          wait: 90
        },
        {
          default: ``,
          key: `STORAGE`,
          prompt: `What STORAGE do you use?`,
          type: `string`,
          wait: 90
        },
        {
          default: ``,
          key: `SCREEN`,
          prompt: `What SCREEN do you have?`,
          type: `string`,
          wait: 90
        },
        {
          default: ``,
          key: `KEYBOARD`,
          prompt: `What KEYBOARD do you use?`,
          type: `string`,
          wait: 90
        },
        {
          default: ``,
          key: `MOUSE`,
          prompt: `What MOUSE do you use?`,
          type: `string`,
          wait: 90
        },
        {
          default: ``,
          key: `HEADSET`,
          prompt: `What HEADSET do you use?`,
          type: `string`,
          wait: 90
        },
        {
          default: ``,
          key: `EXTRA`,
          prompt: `Do you have any extra accessories?`,
          type: `string`,
          wait: 90
        }
      ]
    })
  }
  run (
    msg,
    {
      conf,
      CASE,
      COOLER,
      CPU,
      EXTRA,
      GPU,
      HEADSET,
      KEYBOARD,
      MOBO,
      MOUSE,
      PSU,
      RAM,
      SCREEN,
      STORAGE
    }
  ) {
    if (conf === ``) {
      return sendCMDUsage(msg, this, [`configuration (1, 2 or server)`, `CPU`, `GPU`, `RAM`, `CASE`, `MOBO`, `PSU`, `COOLER`, `STORAGE`, `SCREEN`, `KEYBOARD`, `MOUSE`, `HEADSET`, `EXTRA`])
    } else {
      const content = `CPU: ${CPU}\nGPU: ${GPU}\nRAM: ${RAM}\nCASE: ${CASE}\nMOBO: ${MOBO}\nPSU: ${PSU}\nCOOLER: ${COOLER}\nSTORAGE: ${STORAGE}\nSCREEN: ${SCREEN}\nKEYBOARD: ${KEYBOARD}\nMOUSE: ${MOUSE}\nHEADSET: ${HEADSET}\nEXTRA: ${EXTRA}`
      switch (conf) {
      case `1`:
        return setConf(msg, content, `conf1`, __dirname)
      case `2`:
        return setConf(msg, content, `conf2`, __dirname)
      }
    }
  }
}
