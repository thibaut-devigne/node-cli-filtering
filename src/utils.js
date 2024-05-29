const getAnimalFilterPattern = () => {
  const DEFAULT_FILTER_VALUE = ""
  const args = process?.argv
  if(!Array.isArray(args)) return DEFAULT_FILTER_VALUE

  const filterArg = args.find(arg => arg.includes("--filter="))
  if(!filterArg) return DEFAULT_FILTER_VALUE

  const filterPattern = filterArg.split("--filter=")[1]
  return filterPattern
}

const shouldDisplayCounter = () => {
  const args = process?.argv
  return args.some(argument => argument === "--count")
}

const getNameWithCounter = (previousName, nbOfChild) => {
  return `${previousName} [${nbOfChild}]`
}

const nameOfTheAnimalMatchesFilter = (animalName, filterPattern) => {
  if(!filterPattern || typeof filterPattern !== "string") return true
  const regex = new RegExp(filterPattern)

  return regex.test(animalName)
}

const getFilteredAnimalsByName = (previousAnimals, filterPattern) => {
  return previousAnimals.reduce((acc, animal) => {
    const animalName = animal?.name
    let match = nameOfTheAnimalMatchesFilter(animalName, filterPattern)
    return match ? [...acc, {...animal}] : [...acc]
  }, [])
}

const getFilteredPeopleByCountry = (initialCountryTree, filterPattern, showCounter) => {
  return initialCountryTree.people.reduce((acc, person) => {
    let animals = getFilteredAnimalsByName(person.animals, filterPattern)
    let nbOfAnimals = animals.length
    let shouldAddPeopleToList = Boolean(nbOfAnimals)
    if(!shouldAddPeopleToList) return [...acc]
    let filteredPerson = { 
      ...person,
      ...showCounter && { name: getNameWithCounter(person.name, nbOfAnimals) },
      animals
    }
    return [...acc, filteredPerson]
  }, [])
}

const getFilteredData = (originalDatas, filterPattern, showCounter) => {
  if(!Array.isArray(originalDatas) || originalDatas.length === 0) {
    return []
  }
  if(!showCounter && (!filterPattern || typeof filterPattern !== "string")) {
    return [...originalDatas]
  }

  return originalDatas.reduce((acc, country) => {
    let filteredPeople = getFilteredPeopleByCountry(country, filterPattern, showCounter)
    let nbOfPeople = filteredPeople.length
    let shouldKeepCountryInTree = Boolean(nbOfPeople)
    if(!shouldKeepCountryInTree) return [...acc]
    let filteredCountry = { 
      ...country,
      ...showCounter && { name: getNameWithCounter(country.name, nbOfPeople) },
      people: filteredPeople
    }
    return [...acc, filteredCountry]
  }, [])
}

module.exports = {
  getAnimalFilterPattern,
  getFilteredData,
  nameOfTheAnimalMatchesFilter,
  shouldDisplayCounter
}