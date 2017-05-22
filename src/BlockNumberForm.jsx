import React from 'react'
import {Button, Form, FormGroup, Input} from 'reactstrap'

const BlockNumberForm = () => (
  <Form>
    <FormGroup>
      <Input type='number' name='blockNumber' placeholder='Numero blocco' />
    </FormGroup>
    <Button type='submit'>Imposta</Button>
  </Form>
)

export default BlockNumberForm
