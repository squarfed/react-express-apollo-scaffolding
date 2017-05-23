import React from 'react'
import createReactClass from 'create-react-class'
import {Col, Container, Row} from 'reactstrap'

import emails from './emails'
import BlockNumberForm from './BlockNumberForm'
import ResultForm from './ResultForm'
import SpinButton from './SpinButton'
import WheelCanvas from './WheelCanvas'
import Winner from './Winner'

const blockHashUrl = 'https://blockexplorer.com/api/block-index/'
const blockUrl = 'https://blockexplorer.com/api/block/'

const Main = createReactClass({
  displayName: 'Main',

  getInitialState: () => ({
    fetching: false,
    nonce: undefined,
    showResult: false,
    spinning: false
  }),

  getNonce (blockNumber) {
    this.setState({
      fetching: true
    })
    window.fetch(blockHashUrl + blockNumber)
      .then((response) => response.json())
      .then((obj) => obj.blockHash)
      .then((hash) => window.fetch(blockUrl + hash))
      .then((response) => response.json())
      .then((block) => {
        const nonce = block.nonce
        this.setState({
          fetching: false,
          nonce: nonce
        })
        console.log('Nonce:', nonce)
      })
      .catch((err) => {
        window.alert('Error:', err)
      })
  },

  startSpin () {
    this.setState({
      spinning: true
    })
  },

  stopSpin () {
    this.setState({
      showResult: true,
      spinning: false
    })
  },

  render () {
    return <Container fluid>
      <Row>
        <Col md='12'>
          <Winner winner={this.state.showResult && emails[this.state.nonce % emails.length]} />
        </Col>
      </Row>
      <Row>
        <Col md='9'>
          <WheelCanvas emails={emails} nonce={this.state.nonce} spinning={this.state.spinning} onStop={this.stopSpin} />
        </Col>
        <Col md='3'>
          <BlockNumberForm onBlockNumber={this.getNonce} />
          <br />
          <Row>
            <Col md='12'>
              <SpinButton disabled={!this.state.nonce || this.state.spinning} onClick={this.startSpin} />
            </Col>
          </Row>
          <br />
          <ResultForm nonce={this.state.showResult && this.state.nonce} partecipants={emails.length} />
        </Col>
      </Row>
    </Container>
  }
})

export default Main
