const Account = require("./Account.js")
const fs = require("fs")

beforeEach(() => {
  try {
    fs.mkdirSync("accounts")
  } catch {
    //ignore error since folder already exists
  }
})

afterEach(() => {
  fs.rmSync("accounts", { recursive: true, force: true })
})

describe(".create", () => {
  test("should create a new account and a file.", async () => {
    //create an account
    const name = "Aayush"
    const account = await Account.create(name)
    //check if the name is correct
    expect(account.name).toBe(name)
    //check the balance
    expect(account.balance).toBe(0)
    //check to ensure if the file was created
    expect(fs.readFileSync(account.filePath).toString()).toBe("0")
  })
})

describe(".find", () => {
  test("should return the account.", async () => {
    const name = "Aayush"
    const balance = 1000
    fs.writeFileSync(`accounts/${name}.txt`, balance.toString())
    const account = await Account.find(name)

    expect(account.name).toBe(name)
    expect(account.balance).toBe(balance)
  })

  describe("when there is no existing account.", () => {
    test("should return undefined.", async () => {
      const name = "Aayush"
      const account = await Account.find(name)
      expect(account).toBeUndefined()
    })
  })
})
