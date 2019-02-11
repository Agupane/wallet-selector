import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logdown from 'logdown'
import * as actions from '../../Redux/Actions/uiActions'
const logger = logdown('WalletSelector:Header')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

const header = props => {
  const { userData } = props
  let myAccountOrConnect =
    userData && userData.authenticated ? (
      <Link to="/myAccount">My Account</Link>
    ) : (
      <button onClick={props.openWalletModal}>Connect</button>
    )
  return (
    <header className="header">
      <div className="container">
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> |{' '}
        <Link to="/delegates">Delegates</Link>| | {myAccountOrConnect}
      </div>
    </header>
  )
}

/** Which values from the global state should be shown on the props of this component **/
const mapStateToProps = state => {
  const { web3Store } = state
  return {
    web3: web3Store.web3,
    userData: web3Store.userData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openWalletModal: () => dispatch(actions.openWalletSelector())
  }
}

/** React memo check if the props did change, in that case the functional component is re rendered **/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(header)
