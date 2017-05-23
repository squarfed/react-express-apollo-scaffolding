import React from 'react'
import {Col, Form, FormGroup, Label} from 'reactstrap'

const ResultForm = ({blockNumber, nonce, partecipants}) => (
  <Form>
    <FormGroup row>
      <Label sm='8'>Numero blocco:</Label>
      <Col sm='4'>
        <p className='form-control-static'>{blockNumber}</p>
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label sm='6'>Nonce (n):</Label>
      <Col sm='6'>
        <p className='form-control-static'>{nonce}</p>
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label sm='8'>Numero partecipanti (k):</Label>
      <Col sm='4'>
        <p className='form-control-static'>{partecipants}</p>
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label sm='8'>Numero vincente (n % k):</Label>
      <Col sm='4'>
        <p className='form-control-static'>
          {
            nonce && partecipants
            ? nonce % partecipants
            : undefined
          }
        </p>
      </Col>
    </FormGroup>
  </Form>
)

export default ResultForm
