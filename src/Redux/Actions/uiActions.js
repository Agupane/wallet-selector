import * as actionTypes from './ActionTypes/uiActionTypes'

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
