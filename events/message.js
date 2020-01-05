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
        level: 1
      }
    }
    score.points++

    const curLevel = Math.floor(0.25 * Math.sqrt(score.points))

    if (score.level < curLevel) {
      score.level++
      msg.reply(`You've leveled up to level **${curLevel}**`).then(m => m.delete(3000))
    }
    client.setScore.run(score)
  }
}
