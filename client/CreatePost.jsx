import React from 'react'
import createReactClass from 'create-react-class'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { gql, graphql } from 'react-apollo'

const createPost = gql`
mutation createPost($title: String!, $content: String!) {
  createPost(title: $title, content:$content) {
    _id
    title
    content
  }
}`

const CreatePost = createReactClass({
  handleSubmit: async function (e) {
    e.preventDefault()
    const title = e.target.title.value
    const content = e.target.content.value
    console.log(title)
    console.log(content)
    if( title === '' || content === '') {
      return
    }
    try {
    const {data} = await this.props.mutate({
      variables: { title, content }
    })
    } catch (e) {
      console.error(e)
      return
    }
  },
  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" placeholder="title" />
        </FormGroup>
        <FormGroup>
          <Label for="content">Content</Label>
          <Input type="text" name="content" id="content" placeholder="content" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    )
  }
})

export default graphql(createPost)(CreatePost)
