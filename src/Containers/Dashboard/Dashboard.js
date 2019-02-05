import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class DashboardPage extends Component {
  backToHome = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <>
        <h2>Welcome to dashboard Page!</h2>
        <button color="primary" onClick={() => this.backToHome()}>
          Back to home
        </button>
      </>
    )
  }
}

export default withRouter(DashboardPage)
