beforeEach(() => {
  cy.visit("")
})

describe("calculator", () => {
  it("should handle calculations correctly", () => {
    cy.getButton("5").click()
    cy.getButton(".").click()
    cy.getButton("5").click()
    cy.get(".primary-operand").should("have.text", "5.5")
    cy.getButton("+").click()
    cy.get(".primary-operand").should("have.text", "0")
    cy.get(".secondary-operand").should("have.text", "5.5")
    cy.get(".history > [data-operation]").should("have.text", "+")
    cy.getButton("7").click()
    cy.getButton("=").click()
    cy.get(".primary-operand").should("have.text", "12.5")
    cy.get(".secondary-operand").should("have.text", "")
    cy.get(".history > [data-operation]").should("have.text", "")
  })

  it("should handle all clear", () => {
    cy.getButton("5").click()
    cy.getButton("5").click()
    cy.getButton("AC").click()
    cy.get(".primary-operand").should("have.text", "0")
    cy.get(".secondary-operand").should("have.text", "")
    cy.get(".history > [data-operation]").should("have.text", "")
  })

  it("should handle delete button", () => {
    cy.getButton("5").click()
    cy.getButton("5").click()
    cy.getButton("5").click()
    cy.getButton("DEL").click()
    cy.get(".primary-operand").should("have.text", "55")
  })
})
