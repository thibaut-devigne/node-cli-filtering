const { data: originalDatas } = require("../data.js")
const { 
  getAnimalFilterPattern,
  shouldDisplayCounter,
  getFilteredData,
} = require("./utils.js")

function main() {
  const showCounter = shouldDisplayCounter()
  const animalFilterValue = getAnimalFilterPattern()
  const filteredData = getFilteredData(originalDatas, animalFilterValue, showCounter)
  return filteredData
}

module.exports = {
  main
}