import * as actionTypes from './ActionTypes/uiActionTypes'

export const showLoadingSpinner = showSpinner => {
  return {
    type: actionTypes.SHOW_LOADING_SPINNER,
    payload: showSpinner
  }
}

export const setSpinnerMessage = spinnerMessage => {
  return {
    type: actionTypes.SET_SPINNER_MESSAGE,
    payload: spinnerMessage
  }
}

export const openWalletSelector = () => {
  return {
    type: actionTypes.WALLET_SELECTOR_OPEN
  }
}

export const closeWalletSelector = () => {
  return {
    type: actionTypes.WALLET_SELECTOR_CLOSE
  }
}
