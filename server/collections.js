const {makeExecutableSchema} = require('graphql-tools')
const {greetResolver, greetTypeDefs} = require('./greet')
const {makePostsResolvers, postsTypeDefs} = require('./posts')
const _ = require('lodash')

const rootTypeDefs = `
schema {
  query: Query
  mutation: Mutation
}
`
const makeDefaultSchema = async () => {
  const postsResolvers = await makePostsResolvers()
  const typeDefs = [rootTypeDefs, postsTypeDefs, greetTypeDefs]
  const resolvers = _.merge(postsResolvers, greetResolver)
  console.log(typeDefs)
  console.log(resolvers)
  const schema = makeExecutableSchema({typeDefs, resolvers})
  return schema
}

module.exports = makeDefaultSchema
