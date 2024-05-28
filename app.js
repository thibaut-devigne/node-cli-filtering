const { main } = require("./src/index.js")

const result = main()
console.log(JSON.stringify(result, null, 2))