import React, { Component } from 'react'

export class Reporting extends Component {
  constructor(props) {
    super(props)
    this.state = { pageName: '' }
    this.displayPlaceholder = this.displayPlaceholder.bind(this)
  }

  displayPlaceholder() {
    this.setState({
      pageName: 'This page is a placeholder for Reports Page'
    })
  }

  render(){
    return(
      <div>
        <h1>Reports</h1>

        <p>This is a simple example of a Digital Ballot Platform component</p>
      </div>
    )
  }
}