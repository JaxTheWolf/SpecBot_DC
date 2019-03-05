module.exports = (client, member) => {
  const joinChannID = client.provider.get(member.guild, `joinchann`, null)
  if (joinChannID !== null) {
    return client.channels.get(joinChannID).send(`We're sorry to see you leaving, ${member.user.tag} \\:(`)
  }
}
