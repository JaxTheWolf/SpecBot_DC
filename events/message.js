module.exports = (client, msg) => {
  if (msg.author.bot) return
  if (msg.guild) {
    let score = client.getScore.get(msg.author.id, msg.guild.id)
    if (!score) {
      score = {
        id: `${msg.guild.id}-${msg.author.id}`,
        user: msg.author.id,
        guild: msg.guild.id,
        points: 0,
        level: 1,
        money: 5
      }
    }
    score.points++

    const curLevel = Math.floor(0.25 * Math.sqrt(score.points))

    if (score.level < curLevel) {
      score.level++
      score.money += Math.round(Math.sqrt(curLevel * 5))
      msg.reply(`You've leveled up to level **${score.level}**\nYou've also gained **${score.money}** Spec$!`).then(m => m.delete(3000))
    }
    client.setScore.run(score)
  }
}
