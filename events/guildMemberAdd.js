module.exports = (client, member) => {
  const joinChannID = client.provider.get(member.guild, `joinchann`, null)
  const joinMsg = client.provider.get(member.guild, `join`, `Welcome, %s! Enjoy our server!`)
  if (joinChannID !== null) {
    return client.channels.get(joinChannID).send(joinMsg.replace(/(%s)/gi, `<@${member.user.id}>`))
  }
}
