const getAnimalFilterValue = () => {
  const DEFAULT_FILTER_VALUE = ""
  const args = process?.argv
  if(!Array.isArray(args)) return DEFAULT_FILTER_VALUE

  const filterArg = args.find(arg => arg.includes("--filter="))
  if(!filterArg) return DEFAULT_FILTER_VALUE

  const filterValue = filterArg.split("--filter=")[1]
  return filterValue
}

const nameOfTheAnimalMatchesFilter = (animalName, filterValue) => {
  if(!filterValue || typeof filterValue !== "string") return true
  const lowerCasedAnimalName = animalName.toLowerCase()
  const lowerCasedFilter = filterValue.toLowerCase()
  return lowerCasedAnimalName.includes(lowerCasedFilter)
}

const getFilteredAnimalsByName = (previousAnimals, filterValue) => {
  return previousAnimals.reduce((acc, animal) => {
    const animalName = animal?.name
    let match = nameOfTheAnimalMatchesFilter(animalName, filterValue)
    return match ? [...acc, {...animal}] : [...acc]
  }, [])
}

const getFilteredPeopleByCountry = (initialCountryTree, filterValue) => {
  return initialCountryTree.people.reduce((acc, person) => {
    let animals = getFilteredAnimalsByName(person.animals, filterValue)
    let shouldAddPeopleToList = Boolean(animals.length)
    if(!shouldAddPeopleToList) return [...acc]
    let filteredPerson = { ...person, animals }
    return [...acc, filteredPerson]
  }, [])
}

const getFilteredData = (originalDatas, filterValue) => {
  if(!Array.isArray(originalDatas) || originalDatas.length === 0) {
    return []
  }
  if(!filterValue || typeof filterValue !== "string") {
    return [...originalDatas]
  }

  return originalDatas.reduce((acc, initialCountryTree) => {
    let filteredPeople = getFilteredPeopleByCountry(initialCountryTree, filterValue)
    let shouldKeepCountryInTree = Boolean(filteredPeople.length)
    if(!shouldKeepCountryInTree) return [...acc]
    let filteredCountry = { 
      ...initialCountryTree,
      people: filteredPeople
    }
    return [...acc, filteredCountry]
  }, [])
}

module.exports = {
  getAnimalFilterValue,
  getFilteredData,
  nameOfTheAnimalMatchesFilter
}