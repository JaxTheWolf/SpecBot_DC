exports.setMoney = (client, score, op, amount) => {
  switch (op) {
  case `+`:
    score.money += amount
    break
  case `-`:
    score.money -= amount
    break
  }
  const userLevel = Math.floor(0.25 * Math.sqrt(score.points))
  score.level = userLevel < 1 ? 1 : userLevel

  client.setScore.run(score)
}
