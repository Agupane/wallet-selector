import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import logdown from 'logdown'
import ModalContainer from '../Modal/ModalContainer'

const logger = logdown('WalletSelector:Dashboard')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

const dashboardPage = props => {
  let modalContent = (
    <div>
      This deploy was started with account but the current account is. Please select the original
      account to continue with the deploy. If you don't want to continue with that deploy
    </div>
  )
  return (
    <>
      <h2>Welcome to dashboard Page!</h2>
    </>
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

/** React memo check if the props did change, in that case the functional component is re rendered **/
export default connect(mapStateToProps)(withRouter(React.memo(dashboardPage)))
