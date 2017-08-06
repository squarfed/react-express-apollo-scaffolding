import React from 'react'
import createReactClass from 'create-react-class'
import CreatePost from 'CreatePost'
import Posts from 'Posts'
import Greet from 'Greet'

const Home = createReactClass({
  displayName: 'Home',

  render () {
    return (
      <div>
        <Posts />
        <CreatePost />
        <Greet />
      </div>
    )
  }
})

export default Home
