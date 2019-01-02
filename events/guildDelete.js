module.exports = (client, guild) => {
  function setActivity() {
    client.user.setActivity(`in ${client.guilds.size} servers|-help`);
  }

  setActivity();
  console.log(`Left guild "${guild.name}".`);
};
