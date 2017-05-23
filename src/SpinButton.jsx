import React from 'react'
import {Button} from 'reactstrap'

const SpinButton = ({disabled, onClick}) => (
  <Button type='button' color='primary' block disabled={disabled} onClick={onClick}>
    Gira la ruota
  </Button>
)

export default SpinButton
