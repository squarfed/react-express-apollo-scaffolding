import React from 'react'
import createReactClass from 'create-react-class'
import {Col, Container, Row} from 'reactstrap'

const Main = createReactClass({
  displayName: 'Main',

  render () {
    return <Container fluid>
      <Row>
        <Col md='12'>
          <h1> Ciao </h1>
        </Col>
      </Row>
    </Container>
  }
})

export default Main
