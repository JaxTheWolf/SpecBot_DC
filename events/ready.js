module.exports = (client) => {
  function setActivity() {
    client.user.setActivity(`in ${client.guilds.size} servers|-help`);
  }

  setActivity();
  console.log(`Ready!`);
};
