import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import logdown from 'logdown'
const logger = logdown('WalletSelector:Dashboard')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

class DashboardPage extends Component {
  backToHome = () => {
    this.props.history.push('/')
  }

  componentDidMount() {
    logger.log('[ComponentDidMount]')
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

/** Which values from the global state should be shown on the props of this component **/
const mapStateToProps = state => {
  const { web3Store } = state
  return {
    web3: web3Store.web3,
    userData: web3Store.userData
  }
}

export default connect(mapStateToProps)(withRouter(DashboardPage))
