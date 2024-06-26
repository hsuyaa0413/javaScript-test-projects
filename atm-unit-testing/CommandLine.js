const readline = require("readline")

module.exports = class CommandLine {
  static ask(question) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    return new Promise(resolve => {
      rl.question(`${question} `, ans => {
        resolve(ans)
        rl.close()
      })
    })
  }

  static print(text) {
    console.log(text)
  }
}
