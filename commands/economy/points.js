const jimp = require(`jimp`)
const { Command } = require(`discord.js-commando`)
const { sendErrorEmbed } = require(`../../libs/embeds`)

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
    const sendCard = (user, client) => {
      const images = [
        `${__dirname}/raw/rect.png`,
        user.displayAvatarURL,
        `${__dirname}/raw/mask.png`
      ]
      const jimps = []
      const score = client.getScore.get(user.id, msg.guild.id)
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
          return jimp.loadFont(jimp.FONT_SANS_16_WHITE)
        })
        .then(font => {
          const circleAvatar = avatar
            .clone()
            .resize(80, 80)
            .mask(mask, 0, 0)
          bg.composite(circleAvatar, 10, 10)
            .print(font, 100, 22, `Points: ${score.points}`)
            .print(font, 100, 52, `Level: ${score.level}`)
            .print(font, 210, 52, `(${score.money} Spec$)`)
            .getBufferAsync(jimp.MIME_PNG)
            .then(img => {
              msg.say({ files: [{ attachment: img, name: `card.png` }] })
            })
        })
    }
    try {
      if (member === ``) {
        return sendCard(msg.author, this.client)
      } else {
        try {
          return sendCard(member.user, this.client)
        } catch (e) {
          return sendErrorEmbed(msg, `❌ This user doesn't have any points!`, ``, 7500)
        }
      }
    } catch (e) {
      return sendErrorEmbed(msg, `An error has occured`, e.message, 7500)
    }
  }
}
