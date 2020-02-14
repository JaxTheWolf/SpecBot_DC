const { Command } = require(`discord.js-commando`)

module.exports = class TocTacToeCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`tictactoe`],
      description: `Game thing`,
      examples: [`tictactoe 50`, `tictactoe 50 @user#0000`],
      group: `games`,
      memberName: `tictactoe`,
      name: `tictactoe`,
      args: [
        {
          error: `You can only put in 1 Spec$ or more!`,
          key: `amount`,
          min: 1,
          prompt: `How many Spec$ would you like to put in?`,
          type: `integer`
        },
        {
          default: ``,
          error: `That's not a valid mention!`,
          key: `user`,
          prompt: `How many Spec$ would you like to give?`,
          type: `user`
        }
      ]
    })
  }
  run (msg, { amount, user }) {
    const authorScore = this.client.getScore.get(msg.author.id, msg.guild.id)
    if (amount && amount < authorScore.money) {
      const twoDBoard = new Array(3).fill(0).map(() => new Array(3).fill(0))
      this.client.on(`message`, (msg) => {
        if (!msg.content.startsWith(this.client.commandPrefix)) return
        const args = msg.content.slice(this.client.commandPrefix.length).split(` `)
        msg.channel.send(twoDBoard, args)
        if (msg.content.includes(`remove`)) {
          this.client.removeListener(`message`, () => {
            msg.channel.send(`handler removed`)
          })
        }
      })
    }
  }
}
