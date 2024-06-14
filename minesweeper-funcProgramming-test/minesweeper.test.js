import {
  checkLose,
  checkWin,
  createBoard,
  markedTilesCount,
  markTile,
  positionMatch,
  revealTile,
  TILE_STATUSES
} from "./minesweeper.js"

describe("#createBoard", () => {
  test("should create a valid board.", () => {
    const boardSize = 2
    const minePositions = [{ x: 0, y: 1 }]
    const expectedBoard = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ]
    ]
    const board = createBoard(boardSize, minePositions)
    expect(board).toEqual(expectedBoard)
  })
})

describe("#markedTilesCount", () => {
  test("with some tiles marked", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.MARKED, mine: false }
      ]
    ]
    expect(markedTilesCount(board)).toEqual(2)
  })

  test("with no tiles marked", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ]
    ]
    expect(markedTilesCount(board)).toEqual(0)
  })

  test("with all tiles marked", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.MARKED, mine: true }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.MARKED, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.MARKED, mine: false }
      ]
    ]
    expect(markedTilesCount(board)).toEqual(4)
  })
})

describe("#markTile", () => {
  test("with hidden tile it marks it", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ]
    ]
    const expectedBoard = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ]
    ]

    expect(markTile(board, { x: 0, y: 0 })).toEqual(expectedBoard)
  })

  test("with marked tile it unmarks it", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ]
    ]
    const expectedBoard = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ]
    ]

    expect(markTile(board, { x: 0, y: 0 })).toEqual(expectedBoard)
  })

  test("with a mine tile it does nothing", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MINE, mine: true },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ]
    ]

    expect(markTile(board, { x: 0, y: 0 })).toEqual(board)
  })

  test("with a number tile it does nothing", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MINE, mine: true },
        { x: 0, y: 1, status: TILE_STATUSES.NUMBER, mine: false }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ]
    ]

    expect(markTile(board, { x: 0, y: 0 })).toEqual(board)
  })
})

describe("#revealTile", () => {
  describe("with a hidden tile.", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ]
    ]

    test("when the tile is mine it sets its status to mine", () => {
      const expectedBoard = [
        [
          { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 0, y: 1, status: TILE_STATUSES.MINE, mine: true }
        ],
        [
          { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
        ]
      ]

      expect(revealTile(board, { x: 0, y: 1 })).toEqual(expectedBoard)
    })

    describe("when the tile is not a mine", () => {
      test("when the tile is adjacent to a mine it counts the number of nearby mines", () => {
        const expectedBoard = [
          [
            {
              x: 0,
              y: 0,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 1
            },
            { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
          ],
          [
            { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
          ]
        ]

        expect(revealTile(board, { x: 0, y: 0 })).toEqual(expectedBoard)
      })
      test("when the tile is not adjacent to a mine it reveals nearby tiles", () => {
        const board = [
          [
            { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: true },
            { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 0, y: 2, status: TILE_STATUSES.HIDDEN, mine: false }
          ],
          [
            { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 1, y: 2, status: TILE_STATUSES.HIDDEN, mine: false }
          ],
          [
            { x: 2, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 2, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 2, y: 2, status: TILE_STATUSES.HIDDEN, mine: false }
          ]
        ]
        const expectedBoard = [
          [
            {
              x: 0,
              y: 0,
              status: TILE_STATUSES.HIDDEN,
              mine: true
            },
            {
              x: 0,
              y: 1,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 1
            },
            {
              x: 0,
              y: 2,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 0
            }
          ],
          [
            {
              x: 1,
              y: 0,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 1
            },
            {
              x: 1,
              y: 1,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 1
            },
            {
              x: 1,
              y: 2,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 0
            }
          ],
          [
            {
              x: 2,
              y: 0,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 0
            },
            {
              x: 2,
              y: 1,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 0
            },
            {
              x: 2,
              y: 2,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 0
            }
          ]
        ]

        expect(revealTile(board, { x: 2, y: 2 })).toEqual(expectedBoard)
      })
    })
  })

  test("with a marked tile it does nothing", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: true },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ]
    ]

    expect(revealTile(board, { x: 0, y: 0 })).toEqual(board)
  })

  test("with a mine tile it does nothing", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MINE, mine: true },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ]
    ]

    expect(revealTile(board, { x: 0, y: 0 })).toEqual(board)
  })

  test("with a number tile it does nothing", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MINE, mine: true },
        { x: 0, y: 1, status: TILE_STATUSES.NUMBER, mine: false }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ]
    ]

    expect(revealTile(board, { x: 0, y: 0 })).toEqual(board)
  })
})

describe("#checkWin", () => {
  test("should return true with only hidden and marked mine tiles", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: true },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.NUMBER, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.NUMBER, mine: false }
      ]
    ]

    expect(checkWin(board)).toBeTruthy()
  })

  test("should return false with some hidden non-mine tiles", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: true },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.NUMBER, mine: false }
      ]
    ]

    expect(checkWin(board)).toBeFalsy()
  })
})

describe("#checkLose", () => {
  test("with no mines revealed it returns false", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: true },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false }
      ]
    ]

    expect(checkLose(board)).toBeFalsy()
  })

  test("with mines revealed it returns true", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MINE, mine: true },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true }
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.NUMBER, mine: false }
      ]
    ]

    expect(checkLose(board)).toBeTruthy()
  })
})

describe("#positionMatch", () => {
  test("if same position should return true.", () => {
    const posA = { x: 0, y: 0 }
    const posB = { x: 0, y: 0 }
    expect(positionMatch(posA, posB)).toBeTruthy()
  })

  test("if not the same position should return false.", () => {
    const posA = { x: 1, y: 2 }
    const posB = { x: 0, y: 0 }
    expect(positionMatch(posA, posB)).toBeFalsy()
  })
})
