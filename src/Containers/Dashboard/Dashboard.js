import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import logdown from 'logdown'
const logger = logdown('WalletSelector:Dashboard')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

class DashboardPage extends Component {
  backToHome = () => {
    console.log('getting user data ', this.props.getUserAccountData())
    // this.props.history.push('/')
  }

  componentDidMount() {
    logger.log('[ComponentDidMount] with props: ', this.props)
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
    web3: web3Store.web3
  }
}

/** Which actions are executable in this component **/
const mapDispatchToProps = dispatch => {
  return {
    getUserAccountData: () => dispatch({ type: 'GET_USER_ACCOUNT_DATA' })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DashboardPage))
