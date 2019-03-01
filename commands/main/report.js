const log = require(`node-file-logger`)
const randomHexColor = require(`random-hex-color`)
const { Command } = require(`discord.js-commando`)
const { RichEmbed } = require(`discord.js`)
const { basename } = require(`path`)
const { options } = require(`../../configs/options`)
const { sendSuccessEmbed } = require(`../../libs/embeds`)
log.SetUserOptions(options)

module.exports = class ReportCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`repo`, `specbotreport`, `spreport`, `sprepo`],
      description: `Reports a user to the server owner`,
      examples: [`report @user#0000 "Hate messages" no`, `report @user0000 "no" yes`],
      group: `main`,
      memberName: `report`,
      name: `report`,
      args: [
        {
          error: `Invalid user mention. Please try again.`,
          key: `user`,
          prompt: `Who would you like to report?`,
          type: `user`
        },
        {
          key: `reason`,
          prompt: `What's the reason?`,
          type: `string`
        },
        {
          error: `Reply with yes/no.`,
          key: `confirm`,
          oneOf: [`yes`, `no`],
          prompt: `ABUSE OF THIS COMMAND CAN RESULT IN A PUNISHMENT! Do you still want to proceed? (yes if you understand, no otherwise.)`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { user, reason, confirm }) {
    if (confirm === `no`) {
      return msg.reply(`Cancelled command.`)
    } else {
      const embed = new RichEmbed()
        .addField(`User:`, `**${user.tag}**`, false)
        .addField(`Reason:`, `**${reason}**`, false)
        .addField(`Guild:`, `**${msg.guild.name}**`, false)
        .addField(`Channel:`, `**${msg.channel.name}**`, false)
        .addField(`If you feel that this report is unnecessary and/or you believe the command has been abused:`, ` you may want to "punish" the author (**${msg.author.tag}**).`, false)
        .setAuthor(`Report from ${msg.author.username}:`, msg.author.displayAvatarURL)
        .setColor(randomHexColor())
        .setDescription(`**Remember to punish the offending user if needed!**`)
        .setFooter(new Date(), user.displayAvatarURL)

      log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

      return msg.guild.owner.user.send(embed)
        .then(sendSuccessEmbed(msg, `User \`${user.tag}\` has been reported to the server owner!`, ``))
    }
  }
}
