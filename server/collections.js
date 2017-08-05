const mongodb = require('mongodb')
const {MongoClient, ObjectId} = mongodb
const {makeExecutableSchema} = require('graphql-tools')

const typeDefs = [`
type Post {
  _id: String
  title: String
  content: String
  comments: [Comment]
}

type Comment {
  _id: String
  postId: String
  content: String
  post: Post
}

type Query {
  post(_id: String): Post
  posts: [Post]
  comment(_id: String): Comment
}

type Mutation {
  createPost(title: String, content: String): Post
  createComment(postId: String, content: String): Comment
}

schema {
  query: Query
  mutation: Mutation
}
`]

const prepare = (o) => {
  o._id = o._id.toString()
  return o
}

const makeDefaultSchema = async () => {
  const db = await MongoClient.connect(process.env.MONGO_URL)
  console.log('Connected correctly to server.')

  const Posts = db.collection('posts')
  const Comments = db.collection('comments')
  const resolvers = {
    Query: {
      post: async (root, {_id}) => {
        return prepare(await Posts.findOne(ObjectId(_id)))
      },
      posts: async () => {
        return (await Posts.find({}).toArray()).map(prepare)
      },
      comment: async (root, {_id}) => {
        return prepare(await Comments.findOne(ObjectId(_id)))
      }
    },
    Mutation: {
      createPost: async (root, args, context, info) => {
        const res = await Posts.insert(args)
        return prepare(await Posts.findOne({_id: res.insertedIds[1]}))
      },
      createComment: async (root, args) => {
        const res = await Comments.insert(args)
        return prepare(await Comments.findOne({_id: res.insertedIds[1]}))
      }
    }
  }
  const schema = makeExecutableSchema({typeDefs, resolvers})
  return schema
}

module.exports = makeDefaultSchema
