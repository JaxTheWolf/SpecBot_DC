const { sendErrorEmbed, sendSimpleEmbededMessage, sendSuccessEmbed, hexColorWith0x } = require(`./embeds`)

exports.setMsg = (msg, jMsg, jl) => {
  if (!jMsg.includes(`%s`)) {
    return sendErrorEmbed(msg, `❌ The ${jl} message doesn't contain "%s" (which will get replaced for the tag)`, `Aborting...`, 7500)
  } else {
    return msg.client.provider.set(msg.guild, jl, jMsg)
      .then(s => sendSuccessEmbed(msg, `✅ The ${jl} message has been set to`, s.replace(/(%s)/gi, `\`tag\``)))
      .catch(e => {
        sendErrorEmbed(msg, `An error has occurred.`, e.message, 7500)
      })
  }
}

exports.disableMsg = (msg, jl) => {
  const joinOrLeaveMsg = msg.client.provider.get(msg.guild, jl, null)

  if (joinOrLeaveMsg === null) {
    return sendErrorEmbed(msg, `❌ The ${jl} message isn't set!`, `Try setting it up with \`${jl}message set Your message here (%s will get substituted for the tag)\``)
  } else {
    msg.client.provider.remove(msg.guild, jl)
      .then(() => {
        return sendSuccessEmbed(msg, `✅ The ${jl} message has been set to default`, ``)
      })
  }
}

exports.showMsg = (msg, jl) => {
  const joinOrLeaveMsg = msg.client.provider.get(msg.guild, jl, null)

  if (joinOrLeaveMsg !== null) {
    return sendSimpleEmbededMessage(msg, `The current ${jl} message is`, joinOrLeaveMsg.replace(/(%s)/gi, `\`tag\``), hexColorWith0x())
  } else {
    return sendErrorEmbed(msg, `❌ The ${jl} message isn't set!`, `Try setting it up with \`${jl}message set Your message here (%s will get substituted for the tag)\``)
  }
}
