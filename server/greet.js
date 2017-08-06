const greetTypeDefs = `
extend type Mutation {
  greet(name: String): String
}
`

const greetResolver = {
  Mutation: {
    greet: (root, {name}) => {
      return 'Hello ' + name
    }
  }
}

module.exports = {
  greetTypeDefs,
  greetResolver
}
