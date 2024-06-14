const PARENTHESIS_REGEX = /\((?<equation>[^\(\)]*)\)/
const EXPONENTIAL_REGEX =
  /(?<operand1>\S+)\s*(?<operator>\^)\s*(?<operand2>\S+)/
const MULTIPLY_DIVIDE_REGEX =
  /(?<operand1>\S+)\s*(?<operator>[\/\*])\s*(?<operand2>\S+)/
const ADD_SUBTRACT_REGEX =
  /(?<operand1>\S+)\s*(?<operator>(?<!e)[\-\+])\s*(?<operand2>\S+)/

export default function parse(equation) {
  if (equation.match(PARENTHESIS_REGEX)) {
    const subEqn = equation.match(PARENTHESIS_REGEX).groups.equation
    const result = parse(subEqn)
    const newEqn = equation.replace(PARENTHESIS_REGEX, result)
    return parse(newEqn)
  } else if (equation.match(EXPONENTIAL_REGEX)) {
    const result = handleMath(equation.match(EXPONENTIAL_REGEX).groups)
    const newEqn = equation.replace(EXPONENTIAL_REGEX, result)
    return parse(newEqn)
  } else if (equation.match(MULTIPLY_DIVIDE_REGEX)) {
    const result = handleMath(equation.match(MULTIPLY_DIVIDE_REGEX).groups)
    const newEqn = equation.replace(MULTIPLY_DIVIDE_REGEX, result)
    return parse(newEqn)
  } else if (equation.match(ADD_SUBTRACT_REGEX)) {
    const result = handleMath(equation.match(ADD_SUBTRACT_REGEX).groups)
    const newEqn = equation.replace(ADD_SUBTRACT_REGEX, result)
    return parse(newEqn)
  } else {
    return parseFloat(equation)
  }
}

function handleMath({ operand1, operand2, operator }) {
  const num1 = parseFloat(operand1)
  const num2 = parseFloat(operand2)

  switch (operator) {
    case "*":
      return num1 * num2
    case "/":
      return num1 / num2
    case "+":
      return num1 + num2
    case "-":
      return num1 - num2
    case "^":
      return num1 ** num2
  }
}
