const { data: originalDatas } = require("../data.js")
const { getAnimalFilterValue, getFilteredData } = require("./utils.js")

function main() {
  const animalFilterValue = getAnimalFilterValue()
  const filteredData = getFilteredData(originalDatas, animalFilterValue)
  return filteredData
}

module.exports = {
  main
}