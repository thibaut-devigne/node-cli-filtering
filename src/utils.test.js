const { 
  getAnimalFilterValue, 
  getFilteredData,
  nameOfTheAnimalMatchesFilter,
  shouldDisplayCounter
} = require("./utils.js")

afterEach(() => {
  jest.restoreAllMocks()
});

describe("Filtering argument", () => {
  test("It should use default filter parameters (no filter) if argument are not well formated", () => {
    jest.replaceProperty(process, 'argv', "dummy process args value")
    const result = getAnimalFilterValue()
    expect(typeof result).toBe("string")
    expect(result).toBe("")
  })

  test("It should extract filter value from script parameters", () => {
    jest.replaceProperty(process, 'argv', ['node', 'app.js', '--filter=ry'])
    const result = getAnimalFilterValue()
    expect(typeof result).toBe("string")
    expect(result).toBe("ry")
  })

  test.each([
    [''],
    ['--filter='],
  ])("It should use empty filter value if no valid value was provided ('%s')", (filterArgument) => {
    jest.replaceProperty(process, 'argv', ['node', 'app.js', filterArgument])
    const result = getAnimalFilterValue()
    expect(typeof result).toBe("string")
    expect(result).toBe("")
  })

  test("It should use empty filter value if no valid value was provided (none)", () => {
    jest.replaceProperty(process, 'argv', ['node', 'app.js'])
    const result = getAnimalFilterValue()
    expect(typeof result).toBe("string")
    expect(result).toBe("")
  })
})

describe("Filtered Data based on filter", () => {
  test("It should keep data empty if original data was empty", () => {
    const originalData = []
    const filterValue = "ry"
    const result = getFilteredData(originalData, filterValue)
    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(0)
  })

  test.each([
    [undefined],
    [""],
    ["dummyValue"],
  ])("It should return 0 element if original data was not array", (originalDatas) => {
    const filterValue = "ry"
    const result = getFilteredData(originalDatas, filterValue)
    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(0)
  })

  test("It should not filter data if filter value is not defined", () => {
    const originalDatas = [{
      name: 'Dillauti',
      people: [{
        name: 'Winifred Graham',
        animals: [
          {name: 'Anoa'},
          {name: 'Duck'}
        ]
      }]
    }]

    const result = getFilteredData(originalDatas)

    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual(originalDatas)
  })

  test("It should not filter data if filter value is empty", () => {
    const originalDatas = [{
      name: 'Dillauti',
      people: [{
        name: 'Winifred Graham',
        animals: [
          {name: 'Anoa'},
          {name: 'Duck'}
        ]
      }]
    }]
    const filterValue = ""
    const result = getFilteredData(originalDatas, filterValue)

    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual(originalDatas)
  })

  test("It should not filter data if filter value is not a string", () => {
    const originalDatas = [{
      name: 'Dillauti',
      people: [{
        name: 'Winifred Graham',
        animals: [
          {name: 'Anoa_12'},
          {name: 'Duck'}
        ]
      }]
    }]
    const filterValue = 12
    const result = getFilteredData(originalDatas, filterValue)

    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual(originalDatas)
  })

  test("It should filter data by only keeping animal with matching name", () => {
    const originalDatas = [{
      name: 'Dillauti',
      people: [{
        name: 'Winifred Graham',
        animals: [
          {name: 'Anoa'},
          {name: 'Duck'}
        ]
      }]
    }]
    const filterValue = "ck"
    const result = getFilteredData(originalDatas, filterValue)

    expect(Array.isArray(result)).toBe(true)
    const expectedResult = [{
      name: 'Dillauti',
      people: [{
        name: 'Winifred Graham',
        animals: [
          {name: 'Duck'}
        ]
      }]
    }]
    expect(result).toEqual(expectedResult)
  })

  test("It should filter data even if filter value contains apostrophe", () => {
    const originalDatas = [{
      name: 'Dillauti',
      people: [{
        name: 'Bobby Ristori',
        animals: [
          {name: 'Aardwolf'},
          {name: 'Przewalski\'s Horse'},
          {name: 'Linne\'s Two-toed Sloth'}
        ]
      }]
    }]
    const filterValue = "ski's"
    const result = getFilteredData(originalDatas, filterValue)

    expect(Array.isArray(result)).toBe(true)
    const expectedResult = [{
      name: 'Dillauti',
      people: [{
        name: 'Bobby Ristori',
        animals: [{name: 'Przewalski\'s Horse'}]
      }]
    }]
    expect(result).toEqual(expectedResult)
  })

  test.each([
    ["Scooby-Doo", undefined, true],
    ["Scooby-Doo", 12, true],
    ["Scooby-Doo", "Do", true],
    ["Scooby-Doo", "Sam", false],
    ["Scooby-Doo", "do", true],
  ])("It should check if animal name pass filter (name: %s --- filter: %s => %s)", 
    (animalName, filterValue, expectedResult) => {
      const isValidName = nameOfTheAnimalMatchesFilter(animalName, filterValue)
      expect(isValidName).toBe(expectedResult)
    }
  )
})

describe("Counting people and animals", () => {
  test.each([
    ['--count', true],
    ['', false],
    ["--filter=ry", false],
  ])("It should extract if counter should be displayed from script parameters ('%s' => %s)", (argument, expected) => {
    jest.replaceProperty(process, 'argv', ['node', 'app.js', argument])
    expect(shouldDisplayCounter()).toBe(expected)
  })

  test("It should display counter of child next to country and people name", () => {
    const originalDatas = [{
      name: 'Dillauti',
      people: [{
        name: 'Winifred Graham',
        animals: [
          {name: 'Anoa'},
          {name: 'Duck'}
        ]
      }]
    }]

    const showCounter = true
    const result = getFilteredData(originalDatas, "", showCounter)

    expect(Array.isArray(result)).toBe(true)
    expect(result).not.toEqual(originalDatas)
    const expectedResult = [{
      name: 'Dillauti [1]',
      people: [{
        name: 'Winifred Graham [2]',
        animals: [
          {name: 'Anoa'},
          {name: 'Duck'}
        ]
      }]
    }]
    expect(result).toEqual(expectedResult)
  })
})