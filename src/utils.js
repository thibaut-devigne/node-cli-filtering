const getAnimalFilterValue = () => {
  const DEFAULT_FILTER_VALUE = ""
  const args = process?.argv
  if(!Array.isArray(args)) return DEFAULT_FILTER_VALUE

  const filterArg = args.find(arg => arg.includes("--filter="))
  if(!filterArg) return DEFAULT_FILTER_VALUE

  const filterValue = filterArg.split("--filter=")[1]
  return filterValue
}

const shouldDisplayCounter = () => {
  const args = process?.argv
  return args.some(argument => argument === "--count")
}

const getNameWithCounter = (previousName, nbOfChild) => {
  return `${previousName} [${nbOfChild}]`
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

const getFilteredPeopleByCountry = (initialCountryTree, filterValue, showCounter) => {
  return initialCountryTree.people.reduce((acc, person) => {
    let animals = getFilteredAnimalsByName(person.animals, filterValue)
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

const getFilteredData = (originalDatas, filterValue, showCounter) => {
  if(!Array.isArray(originalDatas) || originalDatas.length === 0) {
    return []
  }
  if(!showCounter && (!filterValue || typeof filterValue !== "string")) {
    return [...originalDatas]
  }

  return originalDatas.reduce((acc, country) => {
    let filteredPeople = getFilteredPeopleByCountry(country, filterValue, showCounter)
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
  getAnimalFilterValue,
  getFilteredData,
  nameOfTheAnimalMatchesFilter,
  shouldDisplayCounter
}