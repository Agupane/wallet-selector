export const SET_USER_ACCOUNT_DATA = 'SET_USER_ACCOUNT_DATA'
export const SET_WEB3_INSTANCE = 'SET_WEB3_INSTANCE'

/** Sets userAccountData Synchronously **/
export const saveUserAccountData = userData => {
  return {
    type: SET_USER_ACCOUNT_DATA,
    payload: userData
  }
}

export const setWeb3Instance = web3 => {
  return {
    type: SET_WEB3_INSTANCE,
    payload: web3
  }
}

/** Sets userAccountData asynchronously **/
export const setUserAccountData = userData => {
  return dispatch => {
    setTimeout(() => {
      dispatch(saveUserAccountData(userData))
    }, 2000)
  }
}
