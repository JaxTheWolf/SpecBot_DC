const allowed = [
  `h`,
  `heads`,
  `heatspreader`,
  `hs`,
  `ihs`,
  `p`,
  `pins`,
  `t`,
  `tails`
]
const randomHexColor = require(`random-hex-color`)
const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)
const { sendErrorEmbed } = require(`../../libs/embeds`)
const { setPoints, updateLevel } = require(`../../libs/dbLibs`)

module.exports = class FlipCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Flips a coin. If you guess the coin state your bet gets multiplied by 1.5!`,
      examples: [`flip 10 pins (pins = tails in this case)`, `flip 10 p`],
      group: `economy`,
      guildOnly: true,
      memberName: `flip`,
      name: `flip`,
      args: [
        {
          error: `You can only bet 2 points or more.`,
          key: `bet`,
          min: 2,
          prompt: `How many points do you wish to bet?`,
          type: `integer`
        },
        {
          error: `Invalid side. Please try again.`,
          key: `gstate`,
          oneOf: allowed,
          prompt: `Which side do you think the coin's going to land on?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { bet, gstate }) {
    const score = this.client.getScore.get(msg.author.id, msg.guild.id)
    const embed = new RichEmbed()
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setColor(randomHexColor())
      .setTitle(`Flip result:`)
    const cf = () => Math.floor(Math.random() * 2) === 0
    const cpub = `https://www.dropbox.com/s/a0w5kdqterb29gk/cpu-back.png?dl=1`
    const cpuf = `https://www.dropbox.com/s/dhmpmc16wt1glfu/cpu-front.png?dl=1`
    let gstateConv

    try {
      if (allowed.slice(0, 4).includes(gstate.toLowerCase())) {
        gstateConv = true
      } else {
        gstateConv = false
      }
      if (score.points < bet) {
        return msg.reply(`Insufficent funds.`)
      }
      if (gstateConv === cf) {
        const toAdd = Math.floor(bet * 1.5)
        setPoints(score, `+`, toAdd)
        updateLevel(score)
        this.client.setScore.run(score)
        embed
          .setDescription(`${gstateConv === true ? `CPU has been successfully inserted!` : `Overclock is stable!`} +${toAdd === 1 ? `${toAdd} point!` : `${toAdd} points!`} (Total: ${score.points})`)
          .setImage(cf === true ? cpub : cpuf)
      } else {
        setPoints(score, `-`, bet)
        updateLevel(score)
        this.client.setScore.run(score)
        embed
          .setDescription(`${gstateConv === true ? `You've bent the pins :(` : `You fried the poor CPU!`} -${bet === 1 ? `${bet} point!` : `${bet} points!`} (Total: ${score.points})`)
          .setImage(cf === true ? cpub : cpuf)
      }

      return msg.say({ embed })
    } catch (e) {
      return sendErrorEmbed(msg, `An error has occured`, e.message, 7500)
    }
  }
}
