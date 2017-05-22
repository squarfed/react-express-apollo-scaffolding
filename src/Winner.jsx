import React from 'react'

const Winner = ({winner}) => winner
  ? <h1>Il vincitore è <strong>{winner}</strong></h1>
  : <h1>Il vincitore è ...</h1>

export default Winner
