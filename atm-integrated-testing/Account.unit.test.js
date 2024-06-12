const FileSystem = require("./FileSystem.js")
const Account = require("./Account.js")

beforeEach(() => {
  jest.restoreAllMocks()
})

describe("#deposit", () => {
  test("should add the money to the account.", async () => {
    //create an account with name and balance
    const startingBalance = 1000
    const amount = 2000
    const account = await createAccount("Aayush", startingBalance)
    const spy = jest
      .spyOn(FileSystem, "write")
      .mockReturnValue(Promise.resolve())
    //call the deposit method
    await account.deposit(amount)
    //check the balance of the account
    expect(account.balance).toBe(amount + startingBalance)
    //check if the file is correct
    expect(spy).toBeCalledWith(account.filePath, amount + startingBalance)
  })

  test("test", () => {
    const spy = jest.spyOn(FileSystem, "write")
    expect(spy).not.toBeCalled()
  })
})

describe("#withdraw", () => {
  test("should remove the money from the account.", async () => {
    const startingBalance = 1000
    const amount = 500
    const account = await createAccount("Aayush", startingBalance)
    const spy = jest
      .spyOn(FileSystem, "write")
      .mockReturnValue(Promise.resolve())
    await account.withdraw(amount)
    expect(account.balance).toBe(startingBalance - amount)
    expect(spy).toBeCalledWith(account.filePath, startingBalance - amount)
  })

  describe("with not enough money in the account.", () => {
    test("should throw an error.", async () => {
      const startingBalance = 1000
      const amount = 2000
      const account = await createAccount("Aayush", startingBalance)
      const spy = jest.spyOn(FileSystem, "write")
      await expect(account.withdraw(amount)).rejects.toThrow()
      expect(account.balance).toBe(startingBalance)
      expect(spy).not.toBeCalled()
    })
  })
})

async function createAccount(name, balance) {
  const spy = jest
    .spyOn(FileSystem, "read")
    .mockReturnValueOnce(Promise.resolve(balance))

  const account = await Account.find(name)
  spy.mockRestore()
  return account
}
