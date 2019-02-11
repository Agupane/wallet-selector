import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as delegatesActions from '../../Redux/Actions/delegatesActions'
import logdown from 'logdown'
import Spinner from '../Common/UI/Spinner/Spinner'
const logger = logdown('WalletSelector:Delegates')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

const delegatesList = props => {
  useEffect(() => {
    /** Delegates list initialization **/
    props.getDelegatesList(props.token)
  }, [props.token])

  /** Gets called whenever the list of delegates prop change **/
  useEffect(() => {
    console.log('Use effect with props ', props)
  }, [props.delegates])

  /** TODO -- CHECK LIST EXPLODES **/
  let delegatesListJSX = props.delegates ? (
    <>
      {props.delegates.map((delegate, index) => (
        <div key={index}>
          <p>{delegate.address}</p>
        </div>
      ))}
    </>
  ) : null

  return props.loadingDelegates ? <Spinner /> : delegatesListJSX
}

/** Which values from the global state should be shown on the props of this component **/
const mapStateToProps = state => {
  const { delegatesStore } = state
  return {
    delegates: delegatesStore.delegates,
    loadingDelegates: delegatesStore.loadingDelegates,
    token: state.authStore.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDelegatesList: token => dispatch(delegatesActions.fetchDelegates(token))
  }
}

/** React memo check if the props did change, in that case the functional component is re rendered **/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(delegatesList))
