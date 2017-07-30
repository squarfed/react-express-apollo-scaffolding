import React from 'react'
import ReactDOM from 'react-dom'

import {ApolloClient, createNetworkInterface, ApolloProvider} from 'react-apollo'

import './styles'
import Main from './Main'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:3000/graphql'}),
})

const render = () => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
    , document.getElementById('app'))
}
document.addEventListener('DOMContentLoaded', () => render())
