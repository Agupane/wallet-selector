import { updateObject } from '../../Utils/reduxUtilitys'
import * as actionTypes from '../Actions/ActionTypes/uiActionTypes'

const INITIAL_STATE = {
  showWalletSelectorModal: false
}

const uiReducer = (state = INITIAL_STATE, action) => {
  if (!action) {
    return state
  }
  switch (action.type) {
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
