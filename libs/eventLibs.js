exports.setActivity = function (client) {
  const { version } = require(`../package.json`)
  client.user.setActivity(`in ${client.guilds.size} servers|-help|v.${version}`)
}
