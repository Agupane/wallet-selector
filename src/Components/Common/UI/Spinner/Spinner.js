import React from 'react'
import Loader from 'react-loader-spinner'
const spinner = props => {
  const defaultMsg = 'Please wait while loading'
  /** If the spinner must be show **/
  let spinnerMsg = props.spinnerMessage ? props.spinnerMessage : defaultMsg
  let content = (
    <>
      <h3>{spinnerMsg}</h3>
      <Loader type="Oval" color="#00BFFF" height="100" width="100" />
    </>
  )
  /** If we dont have to show the spinner **/
  if (!props.showSpinner) {
    content = props.children
  }
  return content
}

export default spinner
