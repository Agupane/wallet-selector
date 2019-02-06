import * as actionTypes from '../Actions/web3Actions'

const INITIAL_STATE = {
  web3: {},
  userData: {
    address: '',
    ethBalance: '0',
    currentNetwork: '',
    authenticated: false
  },
  contract: {},
  pendingTransactions: [],
  errorTransaction: '',
  sendingTransactions: false
}

const web3Reducer = (state = INITIAL_STATE, action) => {
  if (!action) {
    return state
  }
  switch (action.type) {
    case actionTypes.SET_USER_ACCOUNT_DATA: {
      if (!action.payload) {
        return state
      }
      return {
        ...state,
        userData: action.payload
      }
    }
    case actionTypes.SET_WEB3_INSTANCE: {
      if (!action.payload) {
        return state
      }
      return {
        ...state,
        web3: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default web3Reducer
