const { data: originalDatas } = require("../data.js")
const { 
  getAnimalFilterValue,
  shouldDisplayCounter,
  getFilteredData,
} = require("./utils.js")

function main() {
  const showCounter = shouldDisplayCounter()
  const animalFilterValue = getAnimalFilterValue()
  const filteredData = getFilteredData(originalDatas, animalFilterValue, showCounter)
  return filteredData
}

module.exports = {
  main
}