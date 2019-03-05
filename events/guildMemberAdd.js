module.exports = (client, member) => {
  const joinChannID = client.provider.get(member.guild, `joinchann`, null)
  if (joinChannID !== null) {
    return client.channels.get(joinChannID).send(`Welcome, <@${member.user.id}>! Enjoy our server!`)
  }
}
