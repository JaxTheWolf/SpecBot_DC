const { sendSimpleEmbededMessage, hexColorWith0x } = require(`./embeds`)

exports.sendCMDUsage = function (msg, cmd, args) {
  return sendSimpleEmbededMessage(msg, `Usage of \`${cmd.name}\`:`, `${cmd.usage(args, msg.guild.commandPrefix)}`, hexColorWith0x())
}
