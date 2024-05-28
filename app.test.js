const { main } = require("./src/index")

describe("Filtering value", () => {
  //ACCEPTANCE TEST - DOUBLE LOOP 
  test("it should filter people and coutries as in given exemple", () => {
    //ARRANGE
    jest.replaceProperty(process, 'argv', ['node', 'app.js', '--filter=ry'])

    //ACT
    const result = main()

    //ASSERT
    const exempleExpectedResult = [
      {
        name: 'Uzuzozne',
        people: [
          {
            name: 'Lillie Abbott',
            animals: [{ name: 'John Dory' }]
          }
        ]
      },
      {
        name: 'Satanwi',
        people: [
          {
            name: 'Anthony Bruno',
            animals: [{ name: 'Oryx' }]
          }
        ]
      }
    ]
    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual(exempleExpectedResult)
  })
})