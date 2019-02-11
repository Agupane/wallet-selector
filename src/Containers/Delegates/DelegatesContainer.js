import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import logdown from 'logdown'
import DelegatesList from '../../Components/DelegatesList/DelegatesList'

const logger = logdown('WalletSelector:Delegates')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

const delegatesContainerPage = props => {
  return (
    <>
      <h2>Welcome to Delegates List Page!</h2>
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
export default connect(mapStateToProps)(withRouter(React.memo(delegatesContainerPage)))
