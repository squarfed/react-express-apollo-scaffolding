import React from 'react'
import {Button, Form, FormGroup, Input} from 'reactstrap'

const submitHandler = (cb) => (e) => {
  e.preventDefault()
  const blockNumber = e.target.blockNumber.value

  if (blockNumber) {
    cb(parseInt(blockNumber))
    e.target.blockNumber.value = ''
  }
}

const BlockNumberForm = ({onBlockNumber, onReset}) => (
  <Form onSubmit={submitHandler(onBlockNumber)}>
    <FormGroup>
      <Input type='number' name='blockNumber' placeholder='Numero blocco' />
    </FormGroup>
    <Button type='submit' color='primary' block>Imposta blocco</Button>
    <Button type='button' color='danger' block onClick={onReset}>Reset</Button>
  </Form>
)

export default BlockNumberForm
