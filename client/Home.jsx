import React from 'react'
import createReactClass from 'create-react-class'
import CreatePost from './CreatePost'
import Posts from './Posts'

const Home = createReactClass({
  displayName: 'Home',

  render () {
    return (
      <div>
        <Posts />
        <CreatePost />
      </div>
    )
  }
})

export default Home 
