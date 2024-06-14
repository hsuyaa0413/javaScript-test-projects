// function parse(equation) {
//   const step = getNextStep()
//   const result = solve(step)
//   replaceNextStep(equation, step, result)
// }

import parse from "./parse.js"

const inputElement = document.querySelector("#equation")
const outputElement = document.querySelector("#results")
const form = document.querySelector("#equation-form")

form.addEventListener("submit", e => {
  e.preventDefault()

  const result = parse(inputElement.value)
  outputElement.textContent = result
})
