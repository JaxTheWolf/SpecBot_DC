exports.setPoints = function (score, operation, amount) {
  switch (operation) {
  case `-`:
    score.points -= amount
    break
  case `+`:
    score.points += amount
    break
  }
}

exports.updateLevel = function (userScore) {
  const userLevel = Math.floor(0.25 * Math.sqrt(userScore.points))
  userScore.level = userLevel < 1 ? 1 : userLevel
}
