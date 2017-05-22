import React from 'react'
import {Col, Container, Row} from 'reactstrap'

import emails from './emails'
import BlockNumberForm from './BlockNumberForm'
import ResultForm from './ResultForm'
import SpinButton from './SpinButton'
import WheelCanvas from './WheelCanvas'
import Winner from './Winner'

const Main = () => (
  <Container fluid>
    <Row>
      <Col md='12'>
        <Winner />
      </Col>
    </Row>
    <Row>
      <Col md='9'>
        <WheelCanvas emails={emails} />
      </Col>
      <Col md='3'>
        <BlockNumberForm />
        <br />
        <Row>
          <Col md='12'>
            <SpinButton />
          </Col>
        </Row>
        <br />
        <ResultForm />
      </Col>
    </Row>
  </Container>
)

export default Main
