const { Command } = require(`discord.js-commando`)
const { options } = require(`../../options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class Setpc1Command extends Command {
  constructor (client) {
    super(client, {
      name: `setpc1`,
      group: `pc`,
      memberName: `setpc1`,
      description: `Sets a computer.`,
      examples: [`setpc1`],
      args: [
        {
          key: `CPU`,
          prompt: `What CPU do you have?`,
          type: `string`,
          wait: 90
        },
        {
          key: `GPU`,
          prompt: `What GPU do you have?`,
          type: `string`,
          wait: 90
        },
        {
          key: `RAM`,
          prompt: `What RAM do you use?`,
          type: `string`,
          wait: 90
        },
        {
          key: `CASE`,
          prompt: `Which CASE do you have?`,
          type: `string`,
          wait: 90
        },
        {
          key: `MOBO`,
          prompt: `What MOBO do you have?`,
          type: `string`,
          wait: 90
        },
        {
          key: `PSU`,
          prompt: `What PSU do you have?`,
          type: `string`,
          wait: 90
        },
        {
          key: `COOLER`,
          prompt: `What COOLER do you use?`,
          type: `string`,
          wait: 90
        },
        {
          key: `STORAGE`,
          prompt: `What STORAGE do you use?`,
          type: `string`,
          wait: 90
        },
        {
          key: `SCREEN`,
          prompt: `What SCREEN do you have?`,
          type: `string`,
          wait: 90
        },
        {
          key: `KEYBOARD`,
          prompt: `What KEYBOARD do you use?`,
          type: `string`,
          wait: 90
        },
        {
          key: `MOUSE`,
          prompt: `What MOUSE do you use?`,
          type: `string`,
          wait: 90
        },
        {
          key: `HEADSET`,
          prompt: `What HEADSET do you use?`,
          type: `string`,
          wait: 90
        },
        {
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
    }
  ) {
    const content = `CPU: ${CPU}\nGPU: ${GPU}\nRAM: ${RAM}\nCASE: ${
      CASE
    }\nMOBO: ${MOBO}\nPSU: ${PSU}\nCOOLER: ${COOLER}\nSTORAGE: ${
      STORAGE
    }\nSCREEN: ${SCREEN}\nKEYBOARD: ${KEYBOARD}\nMOUSE: ${MOUSE}\nHEADSET: ${
      HEADSET
    }\nEXTRA: ${EXTRA}`
    const owner = msg.author
    const fs = require(`fs`)
    const writeTo = `${__dirname}/../../conf1`

    fs.writeFile(`${writeTo}/${owner.id}.txt`, content, function onError (err) {
      if (err) {
        msg.say(`There was a problem while saving your file. (\`${err}\`)`)
      } else {
        return msg.say(`Configuration saved succesfully!`)
      }
    })

    const toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`

    console.log(toLog)
    log.Info(toLog)
  }
}
