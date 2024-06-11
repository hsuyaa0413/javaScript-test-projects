const Account = require("./Account")
const CommandLine = require("./CommandLine")

async function main() {
  try {
    const accountName = await CommandLine.ask(
      "Which account would you like to access?"
    )

    const account = await Account.find(accountName)
    if (account == null) account = await promptCreateAccount(accountName)
    if (account != null) await promptTask(account)
  } catch (err) {
    CommandLine.print(`ERROR! Please Try Again!`)
  }
}

async function promptCreateAccount(accountName) {
  const response = await CommandLine.ask(
    "That account doesn't exist. Would you like to create one? (yes/no)"
  )

  if (response === "yes") {
    return await Account.create(accountName)
  }
}

async function promptTask(account) {
  const response = await CommandLine.ask(
    "What would you like to do? (view/deposit/withdraw)"
  )

  if (response === "deposit") {
    const amount = parseFloat(await CommandLine.ask("How much?"))
    await account.deposit(amount)
  } else if (response === "withdraw") {
    const amount = parseFloat(await CommandLine.ask("How much?"))
    try {
      await account.withdraw(amount)
    } catch (err) {
      CommandLine.print(`Insufficient balance!`)
    }
  }

  CommandLine.print(`Your account balance is: ${account.balance}`)
}

main()
