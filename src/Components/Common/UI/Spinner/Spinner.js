import React from 'react'
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux'
const spinner = props => {
  /** If the spinner must be show **/
  let content = (
    <>
      <h3>{props.spinnerMessage}</h3>
      <Loader type="Oval" color="#00BFFF" height="100" width="100" />
    </>
  )
  /** If we dont have to show the spinner **/
  if (!props.showLoadSpinner) {
    content = props.children
  }
  return content
}
const mapStateToProps = state => {
  const { uiStore } = state
  return {
    showLoadSpinner: uiStore.showLoadingSpinner,
    spinnerMessage: uiStore.spinnerMessage
  }
}
export default connect(mapStateToProps)(spinner)
