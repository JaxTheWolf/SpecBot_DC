module.exports = (client) => {
  function setActivity() {
    client.user.setActivity(`in ${client.guilds.size} servers`);
  }

  setActivity();
  console.log(`Ready!`);
};
