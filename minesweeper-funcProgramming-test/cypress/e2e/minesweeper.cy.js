import { TILE_STATUSES } from "../../minesweeper.js"

describe("user left clicks on tile.", () => {
  describe("when the tile is not a mine", () => {
    it("reveals itself and displays the number of mines", () => {
      cy.visitBoard([
        [
          { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: true },
          { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
        ],
        [
          { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
        ]
      ])

      cy.get('[data-x="0"][data-y="1"]').click()
      cy.get('[data-x="0"][data-y="1"]').should("have.text", "1")
    })
  })

  describe("when the tile is a mine", () => {
    it("reveals itself and displays the number of mines", () => {
      cy.visitBoard([
        [
          { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: true },
          { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
        ],
        [
          { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
        ]
      ])

      //click on the mine
      cy.get('[data-x="0"][data-y="0"]').click()
      cy.get('[data-x="0"][data-y="0"]').should(
        "have.attr",
        "data-status",
        TILE_STATUSES.MINE
      )

      //should reveal other mines too
      cy.get('[data-x="0"][data-y="1"]').should(
        "have.attr",
        "data-status",
        TILE_STATUSES.MINE
      )

      //should display the losing message
      cy.get(".subtext").should("have.text", "You Lose")

      //not being able to click other tiles
      cy.get('[data-x="1"][data-y="0"]').click()
      cy.get('[data-x="1"][data-y="0"]').should(
        "have.attr",
        "data-status",
        TILE_STATUSES.HIDDEN
      )
    })
  })
})

describe("user right clicks on tile.", () => {
  describe("when the tile is not marked.", () => {
    it("marks itself", () => {
      cy.visitBoard([
        [
          { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: true },
          { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
        ],
        [
          { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
        ]
      ])

      cy.get('[data-x="0"][data-y="0"]').rightclick()
      cy.get('[data-x="0"][data-y="0"]').should(
        "have.attr",
        "data-status",
        TILE_STATUSES.MARKED
      )
    })
  })

  describe("when the tile is marked.", () => {
    it("marks itself", () => {
      cy.visitBoard([
        [
          { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: true },
          { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
        ],
        [
          { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
        ]
      ])

      cy.get('[data-x="0"][data-y="0"]').rightclick()
      cy.get('[data-x="0"][data-y="0"]').should(
        "have.attr",
        "data-status",
        TILE_STATUSES.HIDDEN
      )
    })
  })
})
