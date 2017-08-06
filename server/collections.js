const {makeExecutableSchema} = require('graphql-tools')
const {greetResolver, greetTypeDefs} = require('./greet')
const {makePostsResolvers, postsTypeDefs} = require('./posts')
const _ = require('lodash')

const rootTypeDefs = `
type Query {
dummy: String
}
type Mutation {
dummy: String
}
schema {
  query: Query
  mutation: Mutation
}
`
const makeDefaultSchema = async () => {
  const postsResolvers = await makePostsResolvers()
  const typeDefs = [rootTypeDefs, postsTypeDefs, greetTypeDefs]
  const resolvers = _.merge(postsResolvers, greetResolver)
  const schema = makeExecutableSchema({typeDefs, resolvers})
  return schema
}

module.exports = makeDefaultSchema
