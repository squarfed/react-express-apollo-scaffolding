import React from 'react'
import createReactClass from 'create-react-class'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { gql, graphql } from 'react-apollo'

const greet = gql`
mutation greet($name: String) {
  greet(name: $name)
}`

const Greet = createReactClass({
  handleSubmit: async function (e) {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    if (name === '') {
      return
    }
    try {
      const {data: {greet}} = await this.props.mutate({
        variables: {name}
      })
      console.log(greet)
    } catch (e) {
      console.error(e)
      form.reset()
      return
    }
    form.reset()
  },
  render () {
    return (
      <div>
        <h1> Greet the name </h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for='name'>Name</Label>
            <Input type='text' name='name' id='name' placeholder='name' />
          </FormGroup>
          <Button>Greet!</Button>
        </Form>
      </div>
    )
  }
})

export default graphql(greet)(Greet)
