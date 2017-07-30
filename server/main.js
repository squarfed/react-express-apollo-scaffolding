const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const bodyParser = require('body-parser')
const config = require('../webpack.config.js')
const graphqlExpress = require('graphql-server-express').graphqlExpress
const graphiqlExpress = require('graphql-server-express').graphiqlExpress
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema

const typeDefs = [`
  type Post {
    name: String
    title: String
    content: String
  }
  type Query {
    posts(keyword: String): [Post]
  }
  type Mutation {
    addPost(name: String, title: String, content: String): Post
  }
  schema {
    query: Query
    mutation: Mutation
  }
  `]

const postsData = [
  { name: 'John', title: 'Hello', content: 'pen pineapple' },
  { name: 'Mike', title: 'Hi', content: 'apple pen' }
]

const resolvers = {
  Query: {
    posts (root, args) {
      return postsData.filter(post =>
        !args.keyword || post.content.indexOf(args.keyword) >= 0)
    }
  },
  Mutation: {
    addPost (root, doc) {
      postsData.push(doc)
      return doc
    }
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express()
const DIST_DIR = path.join(__dirname, '../dist')
const nodeEnv = process.env.NODE_ENV || 'development'
const isProduction = nodeEnv === 'production'
const port = isProduction ? process.env.PORT : 3000
const compiler = webpack(config)

if (!isProduction) {
  app.use(webpackDevMiddleware(compiler, {
    quiet: true,
    publicPath: config.output.publicPath
  }))
  app.use(webpackHotMiddleware(compiler))
} else {
  app.get('/', function (req, res) {
    res.sendFile(path.join(DIST_DIR + '/index.html'))
  })

  app.get('/index.js', function (req, res) {
    res.sendFile(path.join(DIST_DIR + '/index.js'))
  })
}

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

/*
 *
 *
 */
app.listen(port)
