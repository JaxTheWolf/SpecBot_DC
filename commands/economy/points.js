const jimp = require(`jimp`)
const log = require(`node-file-logger`)
const { basename } = require(`path`)
const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendErrorEmbed } = require(`../../libs/embeds`)
log.SetUserOptions(options)

module.exports = class PointsCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Shows how many points you have`,
      examples: [`points`, `points @user#0000`],
      group: `economy`,
      guildOnly: true,
      memberName: `points`,
      name: `points`,
      args: [
        {
          default: ``,
          error: `Invalid user mention. Please try again.`,
          key: `member`,
          prompt: `Whose info would you want to see?`,
          type: `member`
        }
      ]
    })
  }
  run (msg, { member }) {
    function sendCard (user, client) {
      const images = [
        `${__dirname}/raw/rect.png`,
        user.displayAvatarURL,
        `${__dirname}/raw/mask.png`
      ]
      const jimps = []
      const level = client.getScore.get(user.id, msg.guild.id).level
      const points = client.getScore.get(user.id, msg.guild.id).points
      let bg, avatar, mask

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
          bg.composite(circleAvatar, 10, 10)
            .print(font, 100, 22, `Points: ${points}`)
            .print(font, 100, 52, `Level: ${level}`)
            .writeAsync(`${__dirname}/export/card${user.id}.png`)
            .then(setTimeout(() => msg.say({ file: `${__dirname}/export/card${user.id}.png` }), 500))
        })
    }

    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)
    try {
      if (member === ``) {
        return sendCard(msg.author, this.client)
      } else {
        try {
          return sendCard(member.user, this.client)
        } catch (e) {
          msg.delete().catch()
          return sendErrorEmbed(msg, `❌ This user doesn't have any points!`, ``, 7500)
        }
      }
    } catch (e) {
      msg.delete().catch()
      return sendErrorEmbed(msg, `An error has occured`, e.message, 7500)
    }
  }
}
