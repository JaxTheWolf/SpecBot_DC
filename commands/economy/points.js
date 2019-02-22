const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
const jimp = require(`jimp`)
log.SetUserOptions(options)
const path = require(`path`)

module.exports = class PointsCommand extends Command {
  constructor (client) {
    super(client, {
      name: `points`,
      group: `economy`,
      memberName: `points`,
      description: `Shows how many points you have.`,
      guildOnly: true,
      examples: [`points`, `points @user#0000`],
      args: [
        {
          key: `member`,
          prompt: `Whose info would you want to see?`,
          default: ``,
          type: `member`,
          error: `Invalid user mention. Please try again.`
        }
      ]
    })
  }
  run (msg, { member }) {
    const client = this.client

    function sendCard (user) {
      const images = [
        `${__dirname}/raw/rect.png`,
        user.displayAvatarURL,
        `${__dirname}/raw/mask.png`
      ]
      const jimps = []
      let bg, avatar, mask
      const points = client.getScore.get(user.id, msg.guild.id).points
      const level = client.getScore.get(user.id, msg.guild.id).level

      for (let i = 0; i < images.length; i++) {
        jimps.push(jimp.read(images[i]))
      }

      Promise.all(jimps)
        .then(data => {
          bg = data[0]
          avatar = data[1]
          mask = data[2]
          return Promise.all(jimps)
        })
        .then(() => {
          return jimp.loadFont(`${__dirname}/font/noto_sans_ui_16_b.fnt`)
        })
        .then(font => {
          const circleAvatar = avatar
            .clone()
            .resize(80, 80)
            .mask(mask, 0, 0)
          bg
            .composite(circleAvatar, 10, 10)
            .print(font, 100, 22, `Points: ${points}`)
            .print(font, 100, 52, `Level: ${level}`)
            .writeAsync(`${__dirname}/export/card${user.id}.png`)
            .then(setTimeout(() => msg.say({ file: `${__dirname}/export/card${user.id}.png` }), 500))
        })
    }

    try {
      if (member === ``) {
        sendCard(msg.author)
      } else {
        try {
          sendCard(member.user)
        } catch (e) {
          return msg.say(`This user doesn't have any points!`)
        }
      }
    } catch (e) {
      return msg.reply(`An error has occured (The database is most likely not ready yet). Try waiting for a moment before retrying.`)
    }

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
