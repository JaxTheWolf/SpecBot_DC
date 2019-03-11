const randomHexColor = require(`random-hex-color`)
const { sendErrorEmbed, sendSimpleEmbededMessage, sendSuccessEmbed } = require(`./embeds`)

exports.setMsg = (msg, jMsg, jl) => {
  if (!jMsg.includes(`%s`)) {
    return sendErrorEmbed(msg, `❌ The ${jl} message doesn't contain "%s" (which will get replaced for the tag)`, `Aborting...`, 7500)
  } else {
    return msg.client.provider.set(msg.guild, jl, jMsg)
      .then(s => sendSuccessEmbed(msg, `✅ The ${jl} message has been set to`, s.replace(/(%s)/gi, `\`tag\``)))
      .catch(e => {
        sendErrorEmbed(msg, `An error has occured.`, e.message, 7500)
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
    return sendSimpleEmbededMessage(msg, joinOrLeaveMsg.replace(/(%s)/gi, `\`tag\``), randomHexColor().replace(`#`, `0x`), `The current ${jl} message is`)
  } else {
    return sendErrorEmbed(msg, `❌ The ${jl} message isn't set!`, `Try setting it up with \`${jl}message set Your message here (%s will get substituted for the tag)\``)
  }
}
