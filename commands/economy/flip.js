const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)
const randomHexColor = require(`random-hex-color`)
const allowed = [
  `p`,
  `pins`,
  `tails`,
  `t`,
  `h`,
  `heads`,
  `heatspreader`,
  `ihs`,
  `hs`
]

module.exports = class FlipCommand extends Command {
  constructor (client) {
    super(client, {
      name: `flip`,
      group: `economy`,
      memberName: `flip`,
      description: `Flips a coin. If you guess the coin state your bet gets multiplied by 1.5!`,
      examples: [`flip 10 pins (pins = tails in this case)`, `flip 10 p`],
      guildOnly: true,
      args: [
        {
          key: `bet`,
          prompt: `How many points do you wish to bet?`,
          type: `integer`,
          min: 2,
          error: `You can only bet 2 points or more.`
        },
        {
          key: `gstate`,
          prompt: `Which side do you think the coin's going to land on?`,
          type: `string`,
          oneOf: allowed,
          error: `Invalid side. Please try again.`
        }
      ]
    })
  }
  run (msg, { bet, gstate }) {
    const score = this.client.getScore.get(msg.author.id, msg.guild.id)

    function setPoints (userScore, operation, amount) {
      switch (operation) {
      case `-`:
        userScore.points -= amount
        break
      case `+`:
        userScore.points += amount
        break
      }
    }
    function updateLevel (userScore) {
      const userLevel = Math.floor(0.25 * Math.sqrt(userScore.points))
      userScore.level = userLevel < 1 ? 1 : userLevel
    }

    const cpub = `https://www.dropbox.com/s/a0w5kdqterb29gk/cpu-back.png?dl=1`
    const cpuf = `https://www.dropbox.com/s/dhmpmc16wt1glfu/cpu-front.png?dl=1`
    const cf = () => {
      return Math.floor(Math.random() * 2) === 0
    }
    let gstateConv
    const embed = new RichEmbed()
      .setTitle(`Flip result:`)
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setColor(randomHexColor())

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
      log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
      return msg.say({ embed })
    } catch (e) {
      return msg.reply(`An error has occured (The database is most likely not ready yet). Try waiting for a moment before retrying.`)
    }
  }
}
