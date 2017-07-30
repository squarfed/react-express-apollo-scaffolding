import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import './styles'
import Main from './Main'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:3000/graphql'}),
})

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={client}>
        <Main />
      </ApolloProvider>
    </AppContainer>
    , document.getElementById('app'))
}
document.addEventListener('DOMContentLoaded', () => render())

if (module.hot) {
  module.hot.accept('./Main', () => {
    console.log('rendering')
    render()
  })
}
