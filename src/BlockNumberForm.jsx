import React from 'react'
import {Button, Form, FormGroup, Input} from 'reactstrap'

const submitHandler = (cb) => (e) => {
  e.preventDefault()
  const blockNumber = e.target.blockNumber.value

  if (blockNumber) {
    cb(blockNumber)
  }
}

const BlockNumberForm = ({onBlockNumber}) => (
  <Form onSubmit={submitHandler(onBlockNumber)}>
    <FormGroup>
      <Input type='number' name='blockNumber' placeholder='Numero blocco' />
    </FormGroup>
    <Button type='submit' color='primary'>Imposta</Button>
  </Form>
)

export default BlockNumberForm
