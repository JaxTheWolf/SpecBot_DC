module.exports = client => {
  function setActivity() {
    let { version } = require(`../package.json`);
    client.user.setActivity(
      `in ${client.guilds.size} servers|-help|v.${version}`
    );
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
