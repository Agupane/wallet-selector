import * as actionTypes from './ActionTypes/web3ActionTypes'

/** Sets userAccountData Synchronously **/
export const saveUserAccountData = userData => {
  return {
    type: actionTypes.SET_USER_ACCOUNT_DATA,
    payload: userData
  }
}

export const setWeb3Instance = web3 => {
  return {
    type: actionTypes.SET_WEB3_INSTANCE,
    payload: web3
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
/** Sets userAccountData asynchronously **/
export const setUserAccountData = (userData, callback) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(saveUserAccountData(userData))
      if (callback) {
        callback()
      }
    }, 2000)
  }
}
