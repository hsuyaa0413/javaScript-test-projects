import parse from "./parse.js"

describe("#parse", () => {
  test("should perform addition correctly.", () => {
    expect(parse("10+5")).toBe(15)
  })

  test("should perform subtraction correctly.", () => {
    expect(parse("10-5")).toBe(5)
  })

  test("should perform multiplication correctly.", () => {
    expect(parse("10*5")).toBe(50)
  })

  test("should perform division correctly.", () => {
    expect(parse("10/5")).toBe(2)
  })

  test("should perform exponential operation correctly.", () => {
    expect(parse("10^3")).toBe(1000)
  })

  test("should evaluate parenthesis operation correctly.", () => {
    expect(parse("(2 + 7 ) * 3")).toBe(27)
  })
})
