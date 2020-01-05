exports.setPoints = (client, score, operation, amount) => {
  switch (operation) {
  case `-`:
    score.points -= amount
    break
  case `+`:
    score.points += amount
    break
  }
  const userLevel = Math.floor(0.25 * Math.sqrt(score.points))
  score.level = userLevel < 1 ? 1 : userLevel

  client.setScore.run(score)
}
