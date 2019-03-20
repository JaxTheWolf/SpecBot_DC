const randomHexColor = require(`random-hex-color`)
const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)
const { sendErrorEmbed } = require(`../../libs/embeds`)
const { setPoints } = require(`../../libs/dbLibs`)
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
    function flip () {
      return Math.floor(Math.random() * 2) === 0
    }
    const cf = flip()
    const score = this.client.getScore.get(msg.author.id, msg.guild.id)
    const cpus = [`https://www.dropbox.com/s/a0w5kdqterb29gk/cpu-back.png?dl=1`,
      `https://www.dropbox.com/s/dhmpmc16wt1glfu/cpu-front.png?dl=1`]
    const embed = new RichEmbed()
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
      .setColor(randomHexColor())
      .setImage(cf === true ? cpus[0] : cpus[1])
      .setTitle(`Flip result:`)

    let convState
    if (allowed.slice(5, 8).includes(gstate)) {
      convState = true
    } else {
      convState = false
    }
    if (score.points < bet) {
      return sendErrorEmbed(msg, `❌ Insufficent funds!`, ``)
    }
    if (convState === cf) {
      const points = Math.floor(bet * 1.75)
      setPoints(this.client, score, `+`, points)
      embed.setDescription(`${convState === true ? `CPU has been successfully inserted!` : `Overclock is stable!`} +**${points}** points! (Total: **${score.points}**)`)
    } else {
      setPoints(this.client, score, `-`, bet)
      embed.setDescription(`${convState === true ? `You've bent the pins :(` : `You fried the poor CPU!`} -**${bet}** points! (Total: **${score.points}**)`)
    }
    return msg.say({ embed })
  }
}
