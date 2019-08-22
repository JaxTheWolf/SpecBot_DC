module.exports = (client, member) => {
  const joinChannID = client.provider.get(member.guild, `joinchann`, null)
  const leaveMsg = client.provider.get(member.guild, `leave`, `We're sorry to see you leaving, ${member.user.tag} \\:(`)
  if (joinChannID !== null) {
    return client.channels.get(joinChannID).send(leaveMsg.replace(/(%s)/gi, `${member.user.tag}`))
  }
  client.removeRow.run(member.user.id)
}
