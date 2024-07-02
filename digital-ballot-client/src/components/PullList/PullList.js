import React, { Component } from 'react'

export class PullList extends Component {
  constructor(props) {
    super(props)
    this.state = { pageName: '' }
    this.displayPlaceholder = this.displayPlaceholder.bind(this)
  }

  displayPlaceholder() {
    this.setState({
      pageName: 'This page is a placeholder for Pull List Page'
    })
  }

  render(){
    return(
      <div>
        <h1>Pull Lists</h1>

        <p>This is a simple example of a Digital Ballot Platform component</p>
      </div>
    )
  }
}