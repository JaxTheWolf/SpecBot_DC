module.exports = (client, guild) => {
  function setActivity() {
    client.user.setActivity(`in ${client.guilds.size} servers`);
  }

  setActivity();
  console.log(`Joined guild "${guild.name}".`);
};
