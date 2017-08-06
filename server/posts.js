const mongodb = require('mongodb')
const {MongoClient, ObjectId} = mongodb

const postsTypeDefs = `
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

extend type Query {
  post(_id: String): Post
  posts: [Post]
  comment(_id: String): Comment
}

extend type Mutation {
  createPost(title: String, content: String): Post
  createComment(postId: String, content: String): Comment
}
`

const prepare = (o) => {
  o._id = o._id.toString()
  return o
}

const makePostsResolvers = async () => {
  const db = await MongoClient.connect(process.env.MONGO_URL)
  console.log('Connected correctly to server.')

  const Posts = db.collection('posts')
  const Comments = db.collection('comments')
  const postsResolvers = {
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
        return prepare(await Posts.findOne({_id: res.insertedIds[0]}))
      },
      createComment: async (root, args) => {
        const res = await Comments.insert(args)
        return prepare(await Comments.findOne({_id: res.insertedIds[0]}))
      }
    }
  }
  return postsResolvers
}

module.exports = {
  makePostsResolvers,
  postsTypeDefs
}
