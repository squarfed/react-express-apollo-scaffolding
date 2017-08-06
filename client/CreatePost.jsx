import React from 'react'
import createReactClass from 'create-react-class'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { gql, graphql } from 'react-apollo'
import { posts } from 'Posts'

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
    const form = e.target
    const title = form.title.value
    const content = form.content.value
    if (title === '' || content === '') {
      return
    }
    try {
      const {data} = await this.props.mutate({
        variables: { title, content },
        refetchQueries: [{query: posts}]
      })
    } catch (e) {
      console.error(e)
      form.reset()
      return
    }
    form.reset()
  },
  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for='title'>Title</Label>
          <Input type='text' name='title' id='title' placeholder='title' />
        </FormGroup>
        <FormGroup>
          <Label for='content'>Content</Label>
          <Input type='text' name='content' id='content' placeholder='content' />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    )
  }
})

export default graphql(createPost)(CreatePost)
