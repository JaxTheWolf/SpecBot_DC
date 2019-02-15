const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const path = require(`path`)
const randomHexColor = require(`random-hex-color`)

module.exports = class ReportCommand extends Command {
  constructor (client) {
    super(client, {
      name: `report`,
      aliases: [`repo`, `specbotreport`, `spreport`, `sprepo`],
      group: `main`,
      memberName: `report`,
      description: `Reports a user to the server owner.`,
      examples: [
        `report @user#0000 "Hate messages" no`,
        `report @user0000 "no" yes`
      ],
      args: [
        {
          key: `user`,
          prompt: `Who would you like to report?`,
          type: `user`,
          error: `Invalid user mention. Please try again.`
        },
        {
          key: `reason`,
          prompt: `What's the reason?`,
          type: `string`
        },
        {
          key: `confirm`,
          prompt: `ABUSE OF THIS COMMAND CAN RESULT IN A PUNISHMENT! Do you still want to proceed? (yes if you understand, no otherwise.)`,
          type: `string`,
          oneOf: [`yes`, `no`],
          error: `Reply with yes/no.`
        }
      ]
    })
  }
  run (msg, { user, reason, confirm }) {
    const guildOwner = msg.guild.owner.user

    if (confirm === `no`) {
      return msg.reply(`Cancelled command.`)
    } else {
      const embed = new RichEmbed()
        .setAuthor(
          `Report from ${msg.author.username}:`,
          msg.author.displayAvatarURL
        )
        .setDescription(`**Remember to punish the offending user if needed!**`)
        .setColor(randomHexColor())
        .addField(`User:`, `**${user.tag}**`, false)
        .addField(`Reason:`, `**${reason}**`, false)
        .addField(`Guild:`, `**${msg.guild.name}**`, false)
        .addField(`Channel:`, `**${msg.channel.name}**`, false)
        .addField(
          `If you feel that this report is unnecessary and/or you believe the command has been abused:`,
          ` you may want to "punish" the author (**${msg.author.tag}**).`, false)
        .setFooter(new Date(), user.displayAvatarURL)
      guildOwner
        .send(embed)
        .then(msg.reply(`User \`${user.tag}\` has been reported to the server owner!`))
    }

    log.Info(`${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
