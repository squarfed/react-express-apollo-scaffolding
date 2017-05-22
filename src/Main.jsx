import React from 'react'
import {Col, Container, Row} from 'reactstrap'

import emails from './emails'
import BlockNumberForm from './BlockNumberForm'
import WheelCanvas from './WheelCanvas'

const Main = () => (
  <Container fluid>
    <Row>
      <Col md='12'>
        <h1>Il vincitore è <strong id='winner'>...</strong></h1>
      </Col>
    </Row>
    <Row>
      <Col md='9'>
        <WheelCanvas emails={emails} />
      </Col>
      <Col md='3'>
        <BlockNumberForm />
      </Col>
    </Row>
  </Container>
)

export default Main
