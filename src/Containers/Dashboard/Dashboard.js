import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import logdown from 'logdown'
import DelegatesList from '../../Components/DelegatesList/DelegatesList'

const logger = logdown('WalletSelector:Dashboard')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

const dashboardPage = props => {
  const backToHome = () => {
    props.history.push('/')
  }

  return (
    <>
      <h2>Welcome to dashboard Page!</h2>
      <button color="primary" onClick={() => backToHome()}>
        Back to home
      </button>
      <DelegatesList />
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
