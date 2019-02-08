import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as delegatesActions from '../../Redux/Actions/delegatesActions'
import logdown from 'logdown'
import Spinner from '../Common/UI/Spinner/Spinner'
const logger = logdown('WalletSelector:DelegatesList')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

const delegatesList = props => {
  /** React hook - we SHOULD use side-effects here **/
  useEffect(() => {
    console.log('Use effect called the first time as componentDidMount')
    /** Delegates list initialization **/
    props.getDelegatesList()
    /** Called when the component will unmount **/
    return () => {
      console.log('Component cleanup')
    }
  }, [])

  /** Gets called whenever the list of delegates prop change **/
  useEffect(() => {
    console.log('Use effect with props ', props)
  }, [props.delegates])

  return props.loadingDelegates ? (
    <Spinner />
  ) : (
    <>
      {props.delegates.map((delegate, index) => (
        <div key={index}>
          <p>{delegate.address}</p>
        </div>
      ))}
    </>
  )
}

/** Which values from the global state should be shown on the props of this component **/
const mapStateToProps = state => {
  const { delegatesStore } = state
  return {
    delegates: delegatesStore.delegates,
    loadingDelegates: delegatesStore.loadingDelegates
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDelegatesList: () => dispatch(delegatesActions.fetchDelegates())
  }
}

/** React memo check if the props did change, in that case the functional component is re rendered **/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(delegatesList))
