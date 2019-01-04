module.exports = client => {
  function setActivity() {
    client.user.setActivity(`in ${client.guilds.size} servers|-help`);
  }

  const { options } = require(`../options`);
  const log = require(`node-file-logger`);
  log.SetUserOptions(options);
  let path = require(`path`);

  setActivity();

  let toLog = `Ready!`;

  console.log(toLog);
  log.Info(toLog);
};
