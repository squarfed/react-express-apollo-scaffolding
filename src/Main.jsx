import React from 'react'
import createReactClass from 'create-react-class'
import { gql, graphql } from 'react-apollo'

const query = gql`
 query{
 posts {
    name
  }
}
`

const Main = createReactClass({
  displayName: 'Main',
  handleClick: () => {
  },
  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    if (this.props.data.error) {
      return (<div>An unexpected error occurred</div>)
    }
    const {posts} = this.props.data
    return (<div>
      <ul>
        {posts.map(post => <li> {post.name} </li>)}
      </ul>
      <button onClick={this.handleClick}>aggiungi</button>
    </div>
    )
  }
})

export default graphql(query)(Main)
