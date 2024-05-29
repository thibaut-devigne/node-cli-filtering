# node-cli-filtering
CLI for filtering and counting element inside a data tree. \
The data tree containing Country, people and animals is looking like :
```json
[{
  "name": "Dillauti",
  "people": [{
    "name": "Blanche Viciani",
    "animals": [
      {"name": "Barbet"},
      {"name": "Rhea"}
    ]
  }]
}]
```

## Command
```javascript
npm run test
npm run test:watch
npm run test:coverage 
```

## Usage
```shell
node app.js --filter=ry
node app.js --count
node app.js --filter=ry --count
```

## Hypotheses
I consider that the name of an animal could not be empty (minimum 1 character)
I consider the example data tree is always valid and well formatted.
I perform the filtering without worrying about case.
I consider that if the filter is invalid then we do not filter the data and we return the entire tree.
I consider that the "pattern passed as argument (e.g. `ry`)" is a string pattern and not a regex pattern


## Initial Subject

### Filter

Your job is to write a command-line interface in Node.js. 
This program has to filter a list of elements containing a pattern.

Details:
- In the following file `data.js`, there are `Countries` containing `Peoples` containing `Animals`.
- Only animals containing the pattern passed as argument (e.g. `ry`) are displayed. The order should be kept intact.
- Empty array after filtering are NOT returned.

Sample of running the command, and its output:

```shell script
$ node app.js --filter=ry
[
  {
    name: 'Uzuzozne',
    people: [
      {
        name: 'Lillie Abbott',
        animals: [
          {
            name: 'John Dory'
          }
        ]
      }
    ]
  },
  {
    name: 'Satanwi',
    people: [
      {
        name: 'Anthony Bruno',
        animals: [
          {
            name: 'Oryx'
          }
        ]
      }
    ]
  }
]
```

### Count

The next goal is to print the counts of People and Animals by counting the number of children and appending it in the name, eg. `Satanwi [2]`.

Sample of running the command, and its output:

```shell script
node app.js --count
[ { name: 'Dillauti [5]',
    people:
     [ { name: 'Winifred Graham [6]',
         animals:
          [ { name: 'Anoa' },
            { name: 'Duck' },
            { name: 'Narwhal' },
            { name: 'Badger' },
            { name: 'Cobra' },
            { name: 'Crow' } ] },
       { name: 'Blanche Viciani [8]',
         animals:
          [ { name: 'Barbet' },
            { name: 'Rhea' },
            { name: 'Snakes' },
            { name: 'Antelope' },
            { name: 'Echidna' },
            { name: 'Crow' },
            { name: 'Guinea Fowl' },
            { name: 'Deer Mouse' } ] },
      ...
...
]
```

## Coverage
![coverage-100](assets/coverage.jpg)