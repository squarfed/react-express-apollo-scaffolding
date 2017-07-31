import React from 'react'
import createReactClass from 'create-react-class'
import { Button } from 'reactstrap'
import { gql, graphql } from 'react-apollo'

const query = gql`
 query{
 posts {
    name
  }
}
`
const createPost = gql`
mutation {
  createPost(title:"hello", content:"world") {
    _id
    title
    content
  }
}`

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
      return (<div>An unexpected error occurred</div>)
    }
    const {posts} = this.props.data
    return (<div>
      <ul>
        {posts.map(post => <li> {post.name} </li>)}
      </ul>
      <button onClick={this.handleClick}>aggiungi</button>
    </div>
      <Form onSubmit={this.handleSubmit}>
       <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" placeholder="title" />
        </FormGroup>
         <Button>Submit</Button>
      </Form>
    )
  }
})

export default graphql(query)(Main)
