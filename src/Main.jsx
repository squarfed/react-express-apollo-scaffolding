import React from 'react'
import createReactClass from 'create-react-class'
import {Col, Container, Row} from 'reactstrap'

import emails from './emails'
import BlockNumberForm from './BlockNumberForm'
import ResultForm from './ResultForm'
import SpinButton from './SpinButton'
import WheelCanvas from './WheelCanvas'
import Winner from './Winner'

const wsUrl = 'wss://ws.blockchain.info/inv'
const blockHashUrl = 'https://blockexplorer.com/api/block-index/'
const blockUrl = 'https://blockexplorer.com/api/block/'

const Main = createReactClass({
  displayName: 'Main',

  getInitialState: () => ({
    blockCount: 0,
    fetching: false,
    nonce: undefined,
    pinger: undefined,
    showResult: false,
    socket: undefined,
    spinning: false
  }),

  waitForBlock (height) {
    const socket = new window.WebSocket(wsUrl)
    const that = this

    this.setState({
      socket: socket
    })

    socket.addEventListener('open', (event) => {
      socket.send('{"op":"blocks_sub"}')
      const pinger = setInterval(() => {
        console.log('Pinging...')
        socket.send('{"op":"ping"}')
      }, 30000)
      that.setState({
        pinger: pinger
      })
    })

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data)
      if (data.op === 'block') {
        const block = data.x
        console.log('New block:', block)
        if (block.height === height) {
          console.log('Nonce:', block.nonce)
          that.setState({
            nonce: block.nonce
          })
        }
      }
    })
  },

  componentWillUnmount () {
    clearInterval(this.state.pinger)
  },

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
      .catch(() => {
        console.log('Waiting for block:', blockNumber)
        this.waitForBlock(blockNumber)
      })
  },

  startSpin () {
    this.setState({
      spinning: true
    })
  },

  stopSpin () {
    this.setState({
      showResult: true
//      spinning: false
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
