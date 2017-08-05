import React from 'react'
import createReactClass from 'create-react-class'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { gql, graphql } from 'react-apollo'
import CreatePost from './CreatePost'

  /*
const query = gql`
 query {
 posts {
    name
  }
}`
*/

  /*
const createPost = gql`
mutation {
  createPost(title:"hello", content:"world") {
    _id
    title
    content
  }
}`
*/

const posts = gql`
query {
  posts {
    _id
    title
    content
  }
}`

const Main = createReactClass({
  displayName: 'Main',
  handleClick: () => {
  },
  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    if (this.props.data.error) {
      console.error(this.props.data.error)
      return (
        <div>
          An unexpected error occurred
        </div>
      )
    }
    const {posts} = this.props.data
    return (
      <div>
        <ul>
          {posts.map(post => <li> {post.name} </li>)}
        </ul>
        <CreatePost/>
      </div>
    )
  }
})

export default graphql(posts)(Main)
