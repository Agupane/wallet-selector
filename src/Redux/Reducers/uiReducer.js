import { updateObject } from '../../Utils/reduxUtilitys'
import * as actionTypes from '../Actions/ActionTypes/uiActionTypes'

const INITIAL_STATE = {
  showWalletSelectorModal: false,
  showLoadingSpinner: false,
  spinnerMessage: 'Please wait while loading'
}

const uiReducer = (state = INITIAL_STATE, action) => {
  if (!action) {
    return state
  }
  switch (action.type) {
    case actionTypes.SHOW_LOADING_SPINNER: {
      if (!action.payload) {
        return state
      }
      return updateObject(state, {
        showLoadingSpinner: action.payload
      })
    }
    case actionTypes.SET_SPINNER_MESSAGE: {
      if (!action.payload) {
        return state
      }
      return updateObject(state, {
        spinnerMessage: action.payload
      })
    }
    case actionTypes.WALLET_SELECTOR_OPEN: {
      return updateObject(state, {
        showWalletSelectorModal: true
      })
    }
    case actionTypes.WALLET_SELECTOR_CLOSE: {
      return updateObject(state, {
        showWalletSelectorModal: false
      })
    }
    default: {
      return state
    }
  }
}

export default uiReducer
