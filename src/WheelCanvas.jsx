import React from 'react'
import createReactClass from 'create-react-class'

import Winwheel from './Winwheel'

const colorArray = [
  '#ee1c24',
  '#3cb878',
  '#f6989d',
  '#00aef0',
  '#f26522'
]

export default createReactClass({
  displayName: 'WheelCanvas',

  getInitialState () {
    return {
      theWheel: null
    }
  },

  componentDidMount () {
    const {emails, onStop} = this.props
    const segments = emails.map((e, i) => ({
      fillStyle: colorArray[i % 5],
      text: e
    }))
    const theWheel = new Winwheel({
      // 'outerRadius'     : 400,        // Set outer radius so wheel fits inside the background.
      innerRadius: 50,         // Make wheel hollow so segments don't go all way to center.
      textFontSize: 10,         // Set default font size for the segments.
      textOrientation: 'vertical', // Make text vertial so goes down from the outside of wheel.
      textAlignment: 'outer',    // Align text to outside of wheel.
      numSegments: emails.length,         // Specify number of segments.
      segments: segments,
      animation: {
        type: 'spinToStop',
        duration: 8,     // Duration in seconds.
        spins: 3,     // Default number of complete spins.
        stopAngle: 0,
        callbackFinished: onStop
      }
    })

    this.setState({
      theWheel: theWheel
    })
  },

  componentWillReceiveProps ({emails, nonce, spinning}) {
    if (nonce && spinning) {
      this.state.theWheel.animation.stopAngle = 360 / emails.length * (nonce % emails.length + 0.5)
      this.state.theWheel.startAnimation()
    }
  },

  render () {
    return <canvas id='canvas' width='800' height='800'>
      <p>
        Sorry, your browser doesn't support canvas. Please try another.
      </p>
    </canvas>
  }
})
