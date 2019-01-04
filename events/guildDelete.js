module.exports = (client, guild) => {
  function setActivity() {
    client.user.setActivity(`in ${client.guilds.size} servers|-help`);
  }

  const { options } = require(`../options`);
  const log = require(`node-file-logger`);
  log.SetUserOptions(options);
  let path = require(`path`);

  setActivity();
  log.Info(`Left guild "${guild.name}".`);
};
