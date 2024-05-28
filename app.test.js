const { main } = require("./src/index")

afterEach(() => {
  jest.restoreAllMocks()
});

describe("Filtering value", () => {
  //ACCEPTANCE TEST - DOUBLE LOOP
  test("it should filter peoples and coutries as in given exemple", () => {
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

describe("Counting peoples and animals", () => {
  //ACCEPTANCE TEST - DOUBLE LOOP
  test("it should count people and animals as in given exemple", () => {
    //ARRANGE
    jest.replaceProperty(process, 'argv', ['node', 'app.js', '--count'])

    //ACT
    const result = main()

    //ASSERT
    const exempleExpectedResult = [
      {
        name: 'Winifred Graham [6]',
        animals: [ 
          { name: 'Anoa' },
          { name: 'Duck' },
          { name: 'Narwhal' },
          { name: 'Badger' },
          { name: 'Cobra' },
          { name: 'Crow' } 
        ]
      },
      {
        name: 'Blanche Viciani [8]',
        animals: [
          { name: 'Barbet' },
          { name: 'Rhea' },
          { name: 'Snakes' },
          { name: 'Antelope' },
          { name: 'Echidna' },
          { name: 'Crow' },
          { name: 'Guinea Fowl' },
          { name: 'Deer Mouse' }
        ]
      }
    ]
    expect(result[0].name).toBe('Dillauti [5]')
    expect(Array.isArray(result[0].people)).toBe(true)
    expect(result[0].people).toEqual(expect.arrayContaining(exempleExpectedResult))
  })
})

test("it should count peoples and animals and filter by animal name", () => {
  //ARRANGE
  jest.replaceProperty(process, 'argv', ['node', 'app.js', '--filter=ry', '--count'])

  //ACT
  const result = main()

  //ASSERT
  const exempleExpectedResult = [
    {
      name: "Uzuzozne [1]",
      people: [{
        name: "Lillie Abbott [1]",
        animals: [{name: "John Dory"}]
      }]
    },
    {
      name: "Satanwi [1]",
      people: [{
        name: "Anthony Bruno [1]",
        animals: [{ name: "Oryx" }]
      }]
    }
  ]
  expect(Array.isArray(result)).toBe(true)
  expect(result).toEqual(exempleExpectedResult)
})
