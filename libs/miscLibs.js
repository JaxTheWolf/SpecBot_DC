const { sendSimpleEmbededMessage, hexColorWith0x } = require(`./embeds`)

exports.sendCMDUsage = function (msg, cmd, args) {
  if (msg.guild) {
    const prefix = msg.guild.commandPrefix
    return sendSimpleEmbededMessage(msg, `Usage of \`${cmd.name}\`:`, cmd.usage(args, prefix), hexColorWith0x())
  } else {
    return sendSimpleEmbededMessage(msg, `Usage of \`${cmd.name}\`:`, cmd.usage(args), hexColorWith0x())
  }
}
